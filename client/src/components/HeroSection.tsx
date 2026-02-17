import { Button } from "@/components/ui/button";
import { Calendar, Play } from "lucide-react";
import { useTranslation, type Language } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getHomePage, getSiteSettings } from "@/lib/cms";

interface HeroSectionProps {
  language: Language;
  clientType: "B2B" | "B2C";
  onNavigate: (page: string) => void;
}

const fallbackHeroImage =
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";

export default function HeroSection({ language, clientType, onNavigate }: HeroSectionProps) {
  const { t } = useTranslation(language);
  const {
    data: homePage,
    isFetched: isHomePageFetched,
  } = useQuery({
    queryKey: ["/api/cms/home-page", language, clientType],
    queryFn: () => getHomePage(language, clientType),
  });
  const {
    data: siteSettings,
    isFetched: isSiteSettingsFetched,
  } = useQuery({
    queryKey: ["/api/cms/site-settings", language, "hero"],
    queryFn: () => getSiteSettings(language),
  });

  const useLegacyHomeContent = isHomePageFetched && !homePage;
  const badge = homePage?.heroBadge || (useLegacyHomeContent ? t("hero.badge") : "");
  const title =
    homePage?.heroTitle ||
    (useLegacyHomeContent ? t(clientType === "B2B" ? "hero.title.b2b" : "hero.title.b2c") : "");
  const subtitle =
    homePage?.heroSubtitle ||
    (useLegacyHomeContent ? t(clientType === "B2B" ? "hero.subtitle.b2b" : "hero.subtitle.b2c") : "");
  const primaryCta = homePage?.heroPrimaryCta || (useLegacyHomeContent ? t("hero.cta.consultation") : "");
  const secondaryCta = homePage?.heroSecondaryCta || (useLegacyHomeContent ? t("hero.cta.cases") : "");
  const heroImageFromCms =
    typeof siteSettings?.heroImageUrl === "string"
      ? siteSettings.heroImageUrl.trim()
      : "";
  const heroImage =
    heroImageFromCms || (isSiteSettingsFetched ? fallbackHeroImage : undefined);

  return (
    <section className="pt-16 relative overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="parallax-element"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full text-sm font-medium mb-6 text-[#bd9775]"
            >
              <span className="mr-2">S</span>
              {badge}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-4xl lg:text-6xl font-bold text-white dark:text-white mb-6 leading-tight"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-xl text-white/90 dark:text-white/90 mb-8 leading-relaxed"
            >
              {subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col gap-4 items-start"
            >
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-white hover:text-primary border-2 border-primary transition-colors duration-300 px-8 py-4 text-lg font-semibold w-64"
                onClick={() => onNavigate("contact")}
              >
                <Calendar className="mr-2 h-5 w-5" />
                {primaryCta}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/60 bg-white/10 text-white hover:bg-white hover:text-gray-900 transition-colors duration-300 px-8 py-4 text-lg font-semibold backdrop-blur-sm w-64"
                onClick={() => {
                  const element = document.getElementById("case-studies");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onNavigate("services");
                  }
                }}
              >
                <Play className="mr-2 h-4 w-4" />
                {secondaryCta}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="parallax-element"
          >
            {heroImage ? (
              <img src={heroImage} alt="Hero" className="rounded-2xl shadow-2xl w-full" />
            ) : (
              <div className="rounded-2xl shadow-2xl w-full aspect-[4/3] bg-white/10 dark:bg-white/5 animate-pulse" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

