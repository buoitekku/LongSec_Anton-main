import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/LOGO_1752411666711.png";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import ClientTypeSwitcher from "./ClientTypeSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslation, type Language } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/lib/cms";

interface NavbarProps {
  language: Language;
  clientType: "B2B" | "B2C";
  onLanguageChange: (language: string) => void;
  onClientTypeChange: (type: "B2B" | "B2C") => void;
  onNavigate: (page: string) => void;
}

export default function Navbar({
  language,
  clientType,
  onLanguageChange,
  onClientTypeChange,
  onNavigate,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { t } = useTranslation(language);
  const { data: siteSettings, isFetched: isSiteSettingsFetched } = useQuery({
    queryKey: ["/api/cms/site-settings", language, "navbar"],
    queryFn: () => getSiteSettings(language),
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fallbackServices = [
    { key: "cybersecurity", icon: "S1" },
    { key: "translations", icon: "S2" },
    { key: "training", icon: "S3" },
    { key: "osint", icon: "S4" },
    { key: "datarecovery", icon: "S5" },
  ];

  const services = siteSettings?.serviceNavItems?.length
    ? siteSettings.serviceNavItems.map((item) => ({
        key: item.serviceKey,
        icon: item.icon || "S",
      }))
    : isSiteSettingsFetched
      ? fallbackServices
      : [];

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 300);
  };

  const handleServiceClick = (serviceKey: string) => {
    setIsServicesOpen(false);
    onNavigate("services");
    setTimeout(() => {
      const element = document.getElementById(`service-${serviceKey}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="fixed w-full top-0 z-50 glass-effect border-b border-white/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate("home")}>
            <img src={logoPath} alt="LongSec Logo" className="w-10 h-10 object-contain logo-image" />
            <span className="text-xl font-bold text-primary dark:text-white">
              {siteSettings?.logoText || (isSiteSettingsFetched ? "LongSec" : "")}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" onClick={() => onNavigate("home")} className="text-gray-700 dark:text-gray-200 hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff]">
              {t("nav.home")}
            </Button>

            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                className="flex items-center text-gray-700 dark:text-gray-200 hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  onNavigate("services");
                  setIsServicesOpen(false);
                }}
              >
                {t("nav.services")}
                <span className={`ml-1 text-xs transition-transform ${isServicesOpen ? "rotate-180" : ""}`}>v</span>
              </Button>

              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="p-4 space-y-2">
                    {services.map((service) => (
                      <button
                        key={service.key}
                        className="w-full flex items-center justify-start text-left px-3 py-2 rounded hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff] text-gray-700 dark:text-gray-200 transition-colors"
                        onClick={() => handleServiceClick(service.key)}
                      >
                        <span className="mr-3">{service.icon}</span>
                        <span>{t(`services.${service.key}.title`)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button variant="ghost" onClick={() => onNavigate("blog")} className="text-gray-700 dark:text-gray-200 hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff]">
              {t("nav.blog")}
            </Button>
            <Button variant="ghost" onClick={() => onNavigate("contact")} className="text-gray-700 dark:text-gray-200 hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff]">
              {t("nav.contact")}
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSwitcher currentLanguage={language} onLanguageChange={onLanguageChange} />
            <ClientTypeSwitcher clientType={clientType} onClientTypeChange={onClientTypeChange} />

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff]"
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigate("home");
                }}
              >
                {t("nav.home")}
              </Button>

              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff]"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onNavigate("services");
                  }}
                >
                  {t("nav.services")}
                </Button>
                <div className="pl-4 space-y-1">
                  {services.map((service) => (
                    <button
                      key={service.key}
                      className="w-full flex items-center justify-start text-left px-3 py-2 rounded text-sm text-gray-600 dark:text-gray-400 hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff] transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleServiceClick(service.key);
                      }}
                    >
                      <span className="mr-2">{service.icon}</span>
                      <span>{t(`services.${service.key}.title`)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff]"
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigate("blog");
                }}
              >
                {t("nav.blog")}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff]"
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigate("contact");
                }}
              >
                {t("nav.contact")}
              </Button>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                <div className="flex items-center justify-center">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

