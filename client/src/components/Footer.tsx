import { Linkedin, Twitter, Facebook, Github } from "lucide-react";
import logoPath from "@assets/LOGO_1752411666711.png";
import { type Language } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import { getPageContent, getSection, getServices, getSiteSettings } from "@/lib/cms";

interface FooterProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const socialIconMap = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  github: Github,
} as const;

export default function Footer({ language, onNavigate }: FooterProps) {
  const { data: layoutContent } = useQuery({
    queryKey: ["/api/cms/page-content", "layout", language],
    queryFn: () => getPageContent("layout", language),
  });
  const { data: siteSettings } = useQuery({
    queryKey: ["/api/cms/site-settings", language, "footer"],
    queryFn: () => getSiteSettings(language),
  });
  const { data: servicesB2B = [] } = useQuery({
    queryKey: ["/api/cms/services", language, "B2B", "footer"],
    queryFn: () => getServices(language, "B2B"),
  });
  const { data: servicesB2G = [] } = useQuery({
    queryKey: ["/api/cms/services", language, "B2G", "footer"],
    queryFn: () => getServices(language, "B2G"),
  });

  const socialLinks = siteSettings?.socialLinks || [];
  const footerSection = getSection(layoutContent?.sections, "footerSection");
  const navbarSection = getSection(layoutContent?.sections, "navbarSection");
  const footerServices = [...servicesB2B, ...servicesB2G];

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-16 pb-8 border-t border-gray-200 dark:border-gray-700 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src={logoPath} alt="LongSec Logo" className="w-10 h-10 object-contain logo-image" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {siteSettings?.logoText || "LongSec"}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              {String(footerSection?.description || "")}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => {
                const iconKey = (link.icon || "").toLowerCase() as keyof typeof socialIconMap;
                const Icon = socialIconMap[iconKey] || Linkedin;
                return (
                  <a
                    key={`${link.url || "social"}-${index}`}
                    href={link.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label || "social"}
                    className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors text-primary dark:text-primary"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{String(footerSection?.servicesTitle || "")}</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              {footerServices.map((service) => (
                <li key={service._id}><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">{service.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{String(footerSection?.companyTitle || "")}</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors" onClick={() => onNavigate("home")}>{String(footerSection?.aboutLabel || "")}</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors" onClick={() => onNavigate("blog")}>{String(navbarSection?.blogLabel || "")}</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">{String(footerSection?.careerLabel || "")}</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors" onClick={() => onNavigate("contact")}>{String(navbarSection?.contactLabel || "")}</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">{String(footerSection?.privacyLabel || "")}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 dark:text-gray-400 mb-4 md:mb-0">{String(footerSection?.copyrightLabel || "")}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

