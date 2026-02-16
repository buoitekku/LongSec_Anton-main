import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertContactSchema, insertConsultationSchema } from "@shared/schema";
import { z } from "zod";
import { sanityFetch } from "./sanity.js";

interface CmsBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: Array<{
    _type?: string;
    children?: Array<{ _type?: string; text?: string }>;
  }>;
  category: string;
  author: string;
  language: string;
  published: boolean;
  featuredImageUrl?: string;
  imageAlt?: string;
  publishedAt?: string;
  createdAt?: string;
}

interface CmsSiteSettings {
  _id: string;
  language: string;
  siteName: string;
  logoText: string;
  heroImageUrl?: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  calendlyUrl?: string;
  serviceNavItems?: Array<{ serviceKey: string; icon?: string }>;
  socialLinks?: Array<{ label?: string; url?: string; icon?: string }>;
  certifications?: Array<{ short?: string; full?: string }>;
}

interface CmsHomePage {
  _id: string;
  language: string;
  clientType: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
}

export function attachRoutes(app: Express): void {
  // CMS: global site settings
  app.get("/api/cms/site-settings", async (req, res) => {
    try {
      const language = (req.query.lang as string) || "pl";
      let settings = await sanityFetch<CmsSiteSettings | null>(
        `*[_type == "siteSettings" && language == $lang][0]{
          _id,
          language,
          siteName,
          logoText,
          "heroImageUrl": heroImage.asset->url,
          contactPhone,
          contactEmail,
          contactAddress,
          calendlyUrl,
          serviceNavItems,
          socialLinks,
          certifications
        }`,
        { lang: language },
      );

      if (!settings) {
        settings = await sanityFetch<CmsSiteSettings | null>(
          `*[_type == "siteSettings"][0]{
            _id,
            language,
            siteName,
            logoText,
            "heroImageUrl": heroImage.asset->url,
            contactPhone,
            contactEmail,
            contactAddress,
            calendlyUrl,
            serviceNavItems,
            socialLinks,
            certifications
          }`,
        );
      }

      if (!settings) {
        return res.json({
          _id: "legacy-site-settings",
          language,
          siteName: "LongSec",
          logoText: "LongSec",
          contactPhone: "+48 22 123 4567",
          contactEmail: "kontakt@longsec.pl",
          contactAddress: "ul. Krakowskie Przedmiescie 5, 00-068 Warszawa",
          serviceNavItems: [
            { serviceKey: "cybersecurity", icon: "🔐" },
            { serviceKey: "translations", icon: "🌐" },
            { serviceKey: "training", icon: "🎓" },
            { serviceKey: "osint", icon: "🔎" },
            { serviceKey: "datarecovery", icon: "💾" },
          ],
          socialLinks: [],
          certifications: [],
        });
      }

      res.json(settings);
    } catch (error) {
      console.error("Failed to fetch CMS site settings:", error);
      res.status(500).json({ error: "Failed to fetch CMS site settings" });
    }
  });

  // CMS: translation dictionary map for selected language
  app.get("/api/cms/translations", async (req, res) => {
    try {
      const language = (req.query.lang as string) || "pl";
      const rows = await sanityFetch<Array<{ key: string; value: string }>>(
        `*[_type == "i18nString" && language == $lang]{ key, value }`,
        { lang: language },
      );

      const map: Record<string, string> = {};
      for (const row of rows) {
        if (row?.key) {
          map[row.key] = row.value || "";
        }
      }
      res.json(map);
    } catch (error) {
      console.error("Failed to fetch CMS translations:", error);
      res.status(500).json({ error: "Failed to fetch CMS translations" });
    }
  });

  // CMS: home page singleton by language + client type
  app.get("/api/cms/home-page", async (req, res) => {
    try {
      const language = (req.query.lang as string) || "pl";
      const clientType = (req.query.clientType as string) || "B2B";

      let page = await sanityFetch<CmsHomePage | null>(
        `*[_type == "homePage" && language == $lang && clientType == $clientType][0]{
          _id,
          language,
          clientType,
          heroBadge,
          heroTitle,
          heroSubtitle,
          heroPrimaryCta,
          heroSecondaryCta
        }`,
        { lang: language, clientType },
      );

      if (!page) {
        page = await sanityFetch<CmsHomePage | null>(
          `*[_type == "homePage"][0]{
            _id,
            language,
            clientType,
            heroBadge,
            heroTitle,
            heroSubtitle,
            heroPrimaryCta,
            heroSecondaryCta
          }`,
        );
      }

      res.json(page || null);
    } catch (error) {
      console.error("Failed to fetch CMS home page:", error);
      res.status(500).json({ error: "Failed to fetch CMS home page" });
    }
  });

  // CMS: blog list
  app.get("/api/cms/blog", async (req, res) => {
    try {
      const language = (req.query.lang as string) || "pl";
      const posts = await sanityFetch<CmsBlogPost[]>(
        `*[_type == "blogPost" && published == true && language == $lang] | order(coalesce(publishedAt, _createdAt) desc){
          _id,
          title,
          "slug": slug.current,
          excerpt,
          content,
          category,
          author,
          language,
          published,
          "featuredImageUrl": featuredImage.asset->url,
          imageAlt,
          publishedAt,
          "createdAt": _createdAt
        }`,
        { lang: language },
      );
      if (posts.length > 0) {
        return res.json(posts);
      }

      // Fallback to existing project content (database blog posts) if Sanity is empty.
      const legacyPosts = await storage.getBlogPosts(language);
      const mappedLegacyPosts: CmsBlogPost[] = legacyPosts
        .filter((post) => post.published)
        .map((post) => ({
          _id: `legacy-${post.id}`,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: [{ _type: "block", children: [{ _type: "span", text: post.content || "" }] }],
          category: post.category,
          author: post.author,
          language: post.language,
          published: post.published,
          featuredImageUrl: post.featuredImage || undefined,
          imageAlt: post.imageAlt || undefined,
          createdAt: post.createdAt instanceof Date ? post.createdAt.toISOString() : String(post.createdAt),
        }));

      res.json(mappedLegacyPosts);
    } catch (error) {
      console.error("Failed to fetch CMS blog list:", error);
      res.status(500).json({ error: "Failed to fetch CMS blog posts" });
    }
  });

  // CMS: single blog post by slug
  app.get("/api/cms/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const language = (req.query.lang as string) || "pl";

      const query = `*[_type == "blogPost" && slug.current == $slug && published == true && language == $lang][0]{
        _id,
        title,
        "slug": slug.current,
        excerpt,
        content,
        category,
        author,
        language,
        published,
        "featuredImageUrl": featuredImage.asset->url,
        imageAlt,
        publishedAt,
        "createdAt": _createdAt
      }`;

      let post = await sanityFetch<CmsBlogPost | null>(query, { slug, lang: language });

      // Fallback to any language if specific language version does not exist.
      if (!post) {
        post = await sanityFetch<CmsBlogPost | null>(
          `*[_type == "blogPost" && slug.current == $slug && published == true][0]{
            _id,
            title,
            "slug": slug.current,
            excerpt,
            content,
            category,
            author,
            language,
            published,
            "featuredImageUrl": featuredImage.asset->url,
            imageAlt,
            publishedAt,
            "createdAt": _createdAt
          }`,
          { slug },
        );
      }

      if (!post) {
        const legacyPost = await storage.getBlogPost(slug, language);
        if (!legacyPost) {
          return res.status(404).json({ error: "CMS blog post not found" });
        }

        const mappedLegacyPost: CmsBlogPost = {
          _id: `legacy-${legacyPost.id}`,
          title: legacyPost.title,
          slug: legacyPost.slug,
          excerpt: legacyPost.excerpt,
          content: [{ _type: "block", children: [{ _type: "span", text: legacyPost.content || "" }] }],
          category: legacyPost.category,
          author: legacyPost.author,
          language: legacyPost.language,
          published: legacyPost.published,
          featuredImageUrl: legacyPost.featuredImage || undefined,
          imageAlt: legacyPost.imageAlt || undefined,
          createdAt:
            legacyPost.createdAt instanceof Date
              ? legacyPost.createdAt.toISOString()
              : String(legacyPost.createdAt),
        };

        return res.json(mappedLegacyPost);
      }

      res.json(post);
    } catch (error) {
      console.error("Failed to fetch CMS blog post:", error);
      res.status(500).json({ error: "Failed to fetch CMS blog post" });
    }
  });

  // CMS: services
  app.get("/api/cms/services", async (req, res) => {
    try {
      const language = (req.query.lang as string) || "pl";
      const clientType = (req.query.clientType as string) || "B2B";

      const services = await sanityFetch(
        `*[_type == "service" && active == true && language == $lang && clientType == $clientType] | order(order asc){
          _id,
          name,
          serviceKey,
          language,
          clientType,
          description,
          features,
          order,
          active
        }`,
        { lang: language, clientType },
      );

      res.json(services);
    } catch (error) {
      console.error("Failed to fetch CMS services:", error);
      res.status(500).json({ error: "Failed to fetch CMS services" });
    }
  });

  // CMS: case studies
  app.get("/api/cms/case-studies", async (req, res) => {
    try {
      const language = (req.query.lang as string) || "pl";
      const caseStudies = await sanityFetch(
        `*[_type == "caseStudy" && published == true && language == $lang] | order(order asc){
          _id,
          title,
          "slug": slug.current,
          category,
          client,
          language,
          description,
          challenge,
          solution,
          results,
          order,
          published
        }`,
        { lang: language },
      );
      res.json(caseStudies);
    } catch (error) {
      console.error("Failed to fetch CMS case studies:", error);
      res.status(500).json({ error: "Failed to fetch CMS case studies" });
    }
  });

  // CMS: testimonials
  app.get("/api/cms/testimonials", async (req, res) => {
    try {
      const language = (req.query.lang as string) || "pl";
      const testimonials = await sanityFetch(
        `*[_type == "testimonial" && language == $lang] | order(order asc){
          _id,
          quote,
          author,
          position,
          language,
          rating,
          featured,
          order
        }`,
        { lang: language },
      );
      res.json(testimonials);
    } catch (error) {
      console.error("Failed to fetch CMS testimonials:", error);
      res.status(500).json({ error: "Failed to fetch CMS testimonials" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Consultation booking
  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(validatedData);
      res.json({ success: true, consultation });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid consultation data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to book consultation" });
      }
    }
  });

  // Get blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const language = req.query.lang as string;
      const posts = await storage.getBlogPosts(language);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Get single blog post
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const language = req.query.lang as string;
      const post = await storage.getBlogPost(slug, language);
      
      if (!post) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Get contacts (admin)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Get consultations (admin)
  app.get("/api/consultations", async (req, res) => {
    try {
      const consultations = await storage.getConsultations();
      res.json(consultations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch consultations" });
    }
  });

}

export async function registerRoutes(app: Express): Promise<Server> {
  attachRoutes(app);
  const httpServer = createServer(app);
  return httpServer;
}
