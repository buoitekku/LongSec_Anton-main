import { Linkedin, Twitter, Facebook, Github } from "lucide-react";
import logoPath from "@assets/LOGO_1752411666711.png";
import { useTranslation, type Language } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/lib/cms";

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
  const { t, th } = useTranslation(language);
  const { data: siteSettings } = useQuery({
    queryKey: ["/api/cms/site-settings", language, "footer"],
    queryFn: () => getSiteSettings(language),
  });

  const socialLinks = siteSettings?.socialLinks || [];
  const certifications = siteSettings?.certifications || [];

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
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md" dangerouslySetInnerHTML={th("footer.description")} />
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
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t("footer.services")}</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">{t("services.cybersecurity.title")}</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">{t("services.translations.title")}</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">{t("services.training.title")}</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">{t("services.osint.title")}</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">{t("services.datarecovery.title")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t("footer.company")}</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors" onClick={() => onNavigate("home")}>{t("footer.aboutus")}</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors" onClick={() => onNavigate("blog")}>{t("nav.blog")}</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">{t("footer.career")}</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors" onClick={() => onNavigate("contact")}>{t("nav.contact")}</a></li>
              <li><a href="#" className="hover:text-accent dark:hover:text-accent transition-colors">{t("footer.privacy")}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 dark:text-gray-400 mb-4 md:mb-0">{t("footer.copyright")}</div>
            <div className="flex items-center space-x-6 text-gray-500">
              <span className="text-sm">{t("footer.certifiedby")}</span>
              {certifications.map((cert, idx) => (
                <div key={`${cert.short || "cert"}-${idx}`} className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <span className="bg-gradient-to-r from-[#d4af37] to-[#264259] bg-clip-text text-transparent text-xs font-black">
                      {cert.short || "C"}
                    </span>
                  </div>
                  <span className="text-sm">{cert.full || cert.short || "-"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

