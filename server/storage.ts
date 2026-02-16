import { 
  users, 
  admins,
  contacts, 
  blogPosts, 
  consultations,
  type User, 
  type InsertUser,
  type Admin,
  type InsertAdmin,
  type Contact,
  type InsertContact,
  type BlogPost,
  type InsertBlogPost,
  type Consultation,
  type InsertConsultation
} from "../shared/schema.js";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  getBlogPosts(language?: string): Promise<BlogPost[]>;
  getBlogPost(slug: string, language?: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getConsultations(): Promise<Consultation[]>;
  
  // Admin operations
  getAdmin(id: number): Promise<Admin | undefined>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { db } = await import("./db.js");
    const { users } = await import('../shared/schema.js');
    const { eq } = await import('drizzle-orm');
    
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { db } = await import("./db.js");
    const { users } = await import('../shared/schema.js');
    const { eq } = await import('drizzle-orm');
    
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { db } = await import("./db.js");
    const { users } = await import('../shared/schema.js');
    
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const { db } = await import("./db.js");
    const { contacts } = await import('../shared/schema.js');
    
    const [contact] = await db
      .insert(contacts)
      .values({
        ...insertContact,
        language: insertContact.language || 'pl',
        company: insertContact.company || null,
        phone: insertContact.phone || null,
      })
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    const { db } = await import("./db.js");
    const { contacts } = await import('../shared/schema.js');
    
    return await db.select().from(contacts);
  }

  async getBlogPosts(language?: string): Promise<BlogPost[]> {
    const { db } = await import("./db.js");
    const { blogPosts } = await import('../shared/schema.js');
    const { eq, and } = await import('drizzle-orm');
    
    if (language) {
      return await db.select().from(blogPosts).where(and(
        eq(blogPosts.language, language),
        eq(blogPosts.published, true)
      ));
    }
    
    return await db.select().from(blogPosts);
  }

  async getBlogPost(slug: string, language?: string): Promise<BlogPost | undefined> {
    const { db } = await import("./db.js");
    const { blogPosts } = await import('../shared/schema.js');
    const { eq, and } = await import('drizzle-orm');
    
    if (language) {
      const [post] = await db.select().from(blogPosts).where(and(
        eq(blogPosts.slug, slug),
        eq(blogPosts.language, language)
      ));
      return post || undefined;
    }
    
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const { db } = await import("./db.js");
    const { blogPosts } = await import('../shared/schema.js');
    
    const [post] = await db
      .insert(blogPosts)
      .values({
        ...insertPost,
        language: insertPost.language || 'pl',
        published: insertPost.published || false,
      })
      .returning();
    return post;
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const { db } = await import("./db.js");
    const { consultations } = await import('../shared/schema.js');
    
    const [consultation] = await db
      .insert(consultations)
      .values({
        ...insertConsultation,
        language: insertConsultation.language || 'pl',
        status: insertConsultation.status || 'pending',
        company: insertConsultation.company || null,
        message: insertConsultation.message || null,
      })
      .returning();
    return consultation;
  }

  async getConsultations(): Promise<Consultation[]> {
    const { db } = await import("./db.js");
    const { consultations } = await import('../shared/schema.js');
    
    return await db.select().from(consultations);
  }

  async updateBlogPost(id: number, insertPost: Partial<InsertBlogPost>): Promise<BlogPost> {
    const { db } = await import('./db');
    const { blogPosts } = await import('../shared/schema.js');
    const { eq } = await import('drizzle-orm');
    
    // Filter out undefined values to avoid "No values to set" error
    const updateData = Object.fromEntries(
      Object.entries(insertPost).filter(([_, value]) => value !== undefined)
    );
    
    if (Object.keys(updateData).length === 0) {
      throw new Error('No valid data to update');
    }

    const [post] = await db
      .update(blogPosts)
      .set(updateData as any)
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlogPost(id: number): Promise<void> {
    const { db } = await import('./db');
    const { blogPosts } = await import('../shared/schema.js');
    const { eq } = await import('drizzle-orm');
    
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Admin operations
  async getAdmin(id: number): Promise<Admin | undefined> {
    const { db } = await import('./db');
    const { admins } = await import('../shared/schema.js');
    const { eq } = await import('drizzle-orm');
    
    const [admin] = await db.select().from(admins).where(eq(admins.id, id));
    return admin || undefined;
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const { db } = await import('./db');
    const { admins } = await import('../shared/schema.js');
    const { eq } = await import('drizzle-orm');
    
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin || undefined;
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const { db } = await import('./db');
    const { admins } = await import('../shared/schema.js');
    
    const [admin] = await db.insert(admins).values(insertAdmin).returning();
    return admin;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private admins: Map<number, Admin>;
  private contacts: Map<number, Contact>;
  private blogPosts: Map<number, BlogPost>;
  private consultations: Map<number, Consultation>;
  private currentUserId: number;
  private currentContactId: number;
  private currentBlogPostId: number;
  private currentConsultationId: number;

  constructor() {
    this.users = new Map();
    this.admins = new Map();
    this.contacts = new Map();
    this.blogPosts = new Map();
    this.consultations = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentBlogPostId = 1;
    this.currentConsultationId = 1;
    
    // Initialize with some sample blog posts
    this.initializeBlogPosts();
  }

  private initializeBlogPosts() {
    const samplePosts = [
      {
        title: "Top 10 Zagrożeń Cyberbezpieczeństwa w 2025 roku",
        slug: "top-10-zagrozen-cyberbezpieczenstwa-2025",
        excerpt: "Poznaj najnowsze trendy w cyberbezpieczeństwie i dowiedz się, jak chronić swoją firmę przed evolving threats...",
        content: "Cyberbezpieczeństwo staje się coraz większym wyzwaniem dla przedsiębiorstw na całym świecie...",
        category: "Cyberbezpieczeństwo",
        author: "Jan Sikora",
        language: "pl",
        published: true,
        createdAt: new Date()
      },
      {
        title: "Jak wybrać najlepsze usługi tłumaczenia IT?",
        slug: "jak-wybrac-najlepsze-uslugi-tlumaczenia-it",
        excerpt: "Przewodnik po specjalistycznych tłumaczeniach technicznych. Poznaj kluczowe kryteria wyboru partnera...",
        content: "Wybór odpowiedniego partnera do tłumaczeń specjalistycznych to kluczowa decyzja...",
        category: "Tłumaczenia",
        author: "Maria Zielińska", 
        language: "pl",
        published: true,
        createdAt: new Date()
      },
      {
        title: "Wprowadzenie do Awareness Trainings",
        slug: "wprowadzenie-do-awareness-trainings",
        excerpt: "Skuteczne metody podnoszenia świadomości bezpieczeństwa w organizacji. Praktyczne podejście do szkoleń...",
        content: "Szkolenia awareness to fundament bezpiecznej organizacji...",
        category: "Szkolenia",
        author: "Paweł Krawczyk",
        language: "pl", 
        published: true,
        createdAt: new Date()
      },
      {
        title: "Top 10 Cybersecurity Threats in 2025",
        slug: "top-10-cybersecurity-threats-2025",
        excerpt: "Discover the latest cybersecurity trends and learn how to protect your company from evolving threats...",
        content: "Cybersecurity is becoming an increasingly critical challenge for businesses worldwide...",
        category: "Cyberbezpieczeństwo",
        author: "John Smith",
        language: "en",
        published: true,
        createdAt: new Date()
      },
      {
        title: "How to Choose the Best IT Translation Services",
        slug: "how-to-choose-best-it-translation-services",
        excerpt: "A comprehensive guide to specialized technical translations. Learn the key criteria for selecting the right partner...",
        content: "Choosing the right partner for specialized translations is a crucial decision...",
        category: "Tłumaczenia",
        author: "Maria Johnson",
        language: "en",
        published: true,
        createdAt: new Date()
      },
      {
        title: "Топ 10 загроз кібербезпеки у 2025 році",
        slug: "top-10-zahroz-kiberbezpeky-2025",
        excerpt: "Дізнайтеся про найновіші тенденції в кібербезпеці та дізнайтеся, як захистити свою компанію від еволюціонуючих загроз...",
        content: "Кібербезпека стає все більш важливим викликом для підприємств по всьому світу...",
        category: "Cyberbezpieczeństwo",
        author: "Іван Петренко",
        language: "ua",
        published: true,
        createdAt: new Date()
      },
      {
        title: "Як вибрати найкращі послуги ІТ-перекладу",
        slug: "yak-vybraty-najkrashchi-posluhy-it-perekladu",
        excerpt: "Комплексний посібник із спеціалізованих технічних перекладів. Дізнайтеся ключові критерії вибору правильного партнера...",
        content: "Вибір правильного партнера для спеціалізованих перекладів є вирішальним рішенням...",
        category: "Tłumaczenia", 
        author: "Марія Коваленко",
        language: "ua",
        published: true,
        createdAt: new Date()
      }
    ];

    samplePosts.forEach(post => {
      const blogPost: BlogPost = {
        id: this.currentBlogPostId++,
        ...post,
        featuredImage: null,
        imageAlt: null
      };
      this.blogPosts.set(blogPost.id, blogPost);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id,
      language: insertContact.language || 'pl',
      company: insertContact.company || null,
      phone: insertContact.phone || null,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getBlogPosts(language?: string): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values()).filter(post => post.published);
    if (language) {
      return posts.filter(post => post.language === language);
    }
    return posts;
  }

  async getBlogPost(slug: string, language?: string): Promise<BlogPost | undefined> {
    const posts = Array.from(this.blogPosts.values());
    let post = posts.find(p => p.slug === slug);
    if (language && post) {
      post = posts.find(p => p.slug === slug && p.language === language);
    }
    return post;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const post: BlogPost = {
      ...insertPost,
      id,
      language: insertPost.language || 'pl',
      published: insertPost.published || false,
      featuredImage: insertPost.featuredImage || null,
      imageAlt: insertPost.imageAlt || null,
      createdAt: new Date()
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: number, insertPost: Partial<InsertBlogPost>): Promise<BlogPost> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) {
      throw new Error('Blog post not found');
    }
    
    const updatedPost: BlogPost = {
      ...existingPost,
      ...insertPost,
      featuredImage: insertPost.featuredImage !== undefined ? insertPost.featuredImage : existingPost.featuredImage,
      imageAlt: insertPost.imageAlt !== undefined ? insertPost.imageAlt : existingPost.imageAlt,
    };
    
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<void> {
    this.blogPosts.delete(id);
  }

  async getAdmin(id: number): Promise<Admin | undefined> {
    return this.admins.get(id);
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(admin => admin.username === username);
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = this.admins.size + 1;
    const admin: Admin = {
      ...insertAdmin,
      id,
      role: insertAdmin.role || 'admin',
      createdAt: new Date()
    };
    this.admins.set(id, admin);
    return admin;
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = this.currentConsultationId++;
    const consultation: Consultation = {
      ...insertConsultation,
      id,
      language: insertConsultation.language || 'pl',
      status: insertConsultation.status || 'pending',
      company: insertConsultation.company || null,
      message: insertConsultation.message || null,
      createdAt: new Date()
    };
    this.consultations.set(id, consultation);
    return consultation;
  }

  async getConsultations(): Promise<Consultation[]> {
    return Array.from(this.consultations.values());
  }
}

export const storage = new MemStorage();
