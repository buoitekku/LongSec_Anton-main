import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Users, Award } from "lucide-react";
import { type Language, useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import ParallaxBackground from "@/components/ParallaxBackground";
import { useQuery } from "@tanstack/react-query";
import { getPageContent, getSection, getSiteSettings, type ClientType } from "@/lib/cms";

interface ContactProps {
  language: Language;
  clientType: ClientType;
  onNavigate: (page: string) => void;
}

const iconMap = { users: Users, award: Award, clock: Clock } as const;

export default function Contact({ language, clientType }: ContactProps) {
  const { t } = useTranslation(language);
  const { data: siteSettings } = useQuery({
    queryKey: ["/api/cms/site-settings", language, "contact-page"],
    queryFn: () => getSiteSettings(language),
  });
  const { data: pageContent } = useQuery({
    queryKey: ["/api/cms/page-content", "contact", language],
    queryFn: () => getPageContent("contact", language),
  });

  const header = getSection(pageContent?.sections, "contactHeaderSection");
  const methodsSection = getSection(pageContent?.sections, "contactMethodsSection");
  const featuresSection = getSection(pageContent?.sections, "contactFeaturesSection");

  const contactMethods = [
    {
      icon: Phone,
      title: String(methodsSection?.phoneLabel || t("contact.method.phone")),
      value: siteSettings?.contactPhone || "",
      description: String(methodsSection?.hoursDescription || t("contact.hours.description")),
    },
    {
      icon: Mail,
      title: String(methodsSection?.emailLabel || t("contact.method.email")),
      value: siteSettings?.contactEmail || "",
      description: String(methodsSection?.emailDescription || t("contact.email.description")),
    },
    {
      icon: MapPin,
      title: String(methodsSection?.addressLabel || t("contact.method.address")),
      value: siteSettings?.contactAddress || "",
      description: String(methodsSection?.addressDescription || t("contact.address.description")),
    },
    {
      icon: Clock,
      title: String(methodsSection?.hoursLabel || t("contact.method.hours")),
      value: String(methodsSection?.hoursValue || t("contact.hours.value")),
      description: String(methodsSection?.hoursTime || t("contact.hours.time")),
    },
  ];

  const features = Array.isArray(featuresSection?.items)
    ? (featuresSection.items as Array<{icon?: string; title?: string; description?: string}>)
    : [];

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <ParallaxBackground>
          <div />
        </ParallaxBackground>
      </div>

      <div className="relative z-10 pt-16">
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
              >
                {String(header?.title || t("contact.title"))}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto"
              >
                {String(header?.subtitle || t("contact.subtitle"))}
              </motion.p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">{String(methodsSection?.title || t("contact.methods.title"))}</h2>
                  <p className="text-xl text-gray-800 dark:text-gray-200">{String(methodsSection?.subtitle || t("contact.methods.subtitle"))}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 + index * 0.1 }}>
                        <Card className="text-center bg-white/15 dark:bg-gray-700/30 backdrop-blur-md border-white/40 dark:border-gray-600/40 h-full card-hover rounded-2xl">
                          <CardContent className="p-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#264259] rounded-xl mx-auto mb-4 flex items-center justify-center">
                              <Icon className="text-white w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{method.title}</h3>
                            <p className="text-gray-800 dark:text-gray-100 font-semibold mb-1 text-base">{method.value}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{method.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => {
                    const key = String(feature.icon || "clock") as keyof typeof iconMap;
                    const Icon = iconMap[key] || Clock;
                    return (
                      <motion.div key={index} className="text-center" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.4 + index * 0.15 }}>
                        <div className="w-20 h-20 bg-gradient-to-br from-[#d4af37] to-[#264259] rounded-xl mx-auto mb-4 flex items-center justify-center">
                          <Icon className="text-white w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{String(feature.title || "")}</h3>
                        <p className="text-gray-800 dark:text-gray-200 text-lg">{String(feature.description || "")}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.8 }}>
                <ContactForm language={language} clientType={clientType} />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
