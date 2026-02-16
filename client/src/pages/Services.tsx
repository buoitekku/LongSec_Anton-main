import {motion} from "framer-motion";
import {Shield, Globe, GraduationCap, Search, HardDrive, CheckCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useTranslation, type Language} from "@/lib/i18n";
import ParallaxBackground from "@/components/ParallaxBackground";
import {useQuery} from "@tanstack/react-query";
import {getServices, portableTextToPlainText, type CmsService} from "@/lib/cms";

interface ServicesPageProps {
  language: Language;
  clientType: "B2B" | "B2C";
  onNavigate: (page: string) => void;
}

const iconMap = {
  cybersecurity: Shield,
  translations: Globe,
  training: GraduationCap,
  osint: Search,
  datarecovery: HardDrive,
} as const;

export default function ServicesPage({language, clientType, onNavigate}: ServicesPageProps) {
  const {t} = useTranslation(language);
  const {data: services = []} = useQuery<CmsService[]>({
    queryKey: ["/api/cms/services", language, clientType, "full"],
    queryFn: () => getServices(language, clientType),
  });

  const legacyServices = [
    {
      id: "legacy-cybersecurity",
      serviceKey: "cybersecurity",
      name: t("services.cybersecurity.title"),
      description: t(`services.cybersecurity.description.${clientType.toLowerCase()}`),
      features: [
        t("services.cybersecurity.features.audit"),
        t("services.cybersecurity.features.monitoring"),
        t("services.cybersecurity.features.incident"),
        t("services.cybersecurity.features.compliance"),
        t("services.cybersecurity.features.training"),
        t("services.cybersecurity.features.consulting"),
      ],
    },
    {
      id: "legacy-translations",
      serviceKey: "translations",
      name: t("services.translations.title"),
      description: t(`services.translations.description.${clientType.toLowerCase()}`),
      features: [
        t("services.translations.features.technical"),
        t("services.translations.features.legal"),
        t("services.translations.features.medical"),
        t("services.translations.features.business"),
        t("services.translations.features.certified"),
        t("services.translations.features.localization"),
      ],
    },
    {
      id: "legacy-training",
      serviceKey: "training",
      name: t("services.training.title"),
      description: t(`services.training.description.${clientType.toLowerCase()}`),
      features: [
        t("services.training.features.cybersecurity"),
        t("services.training.features.compliance"),
        t("services.training.features.awareness"),
        t("services.training.features.technical"),
        t("services.training.features.custom"),
        t("services.training.features.certification"),
      ],
    },
    {
      id: "legacy-osint",
      serviceKey: "osint",
      name: t("services.osint.title"),
      description: t(`services.osint.description.${clientType.toLowerCase()}`),
      features: [
        t("services.osint.features.intelligence"),
        t("services.osint.features.investigation"),
        t("services.osint.features.monitoring"),
        t("services.osint.features.analysis"),
        t("services.osint.features.reporting"),
        t("services.osint.features.consulting"),
      ],
    },
    {
      id: "legacy-datarecovery",
      serviceKey: "datarecovery",
      name: t("services.datarecovery.title"),
      description: t(`services.datarecovery.description.${clientType.toLowerCase()}`),
      features: [
        t("services.datarecovery.features.hdd"),
        t("services.datarecovery.features.ssd"),
        t("services.datarecovery.features.raid"),
        t("services.datarecovery.features.mobile"),
        t("services.datarecovery.features.forensics"),
        t("services.datarecovery.features.emergency"),
      ],
    },
  ];

  const serviceItems =
    services.length > 0
      ? services.map((service) => ({
          id: service._id,
          serviceKey: service.serviceKey,
          name: service.name,
          description: portableTextToPlainText(service.description),
          features: service.features,
        }))
      : legacyServices;

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <ParallaxBackground>
          <div />
        </ParallaxBackground>
      </div>

      <div className="relative z-10 pt-16">
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: 0.2}}
              className="text-4xl lg:text-6xl font-bold mb-6 text-white dark:text-white"
            >
              {clientType === "B2B" ? t("services.title.b2b") : t("services.title.b2c")}
            </motion.h1>
            <motion.p
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: 0.4}}
              className="text-xl text-white/90 dark:text-white/90 max-w-3xl mx-auto"
            >
              {clientType === "B2B" ? t("services.subtitle.b2b") : t("services.subtitle.b2c")}
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {serviceItems.map((service, index) => {
                const Icon = iconMap[service.serviceKey as keyof typeof iconMap] || Shield;
                return (
                  <motion.div
                    key={service.id}
                    id={`service-${service.serviceKey}`}
                    className="backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 dark:border-white/20 overflow-hidden"
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.6 + index * 0.15}}
                  >
                    <div className="relative bg-white/30 dark:bg-transparent backdrop-blur-2xl border-b border-white/50 dark:border-white/30 p-8 lg:p-10 text-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-blue-500/12 to-blue-700/15 dark:from-blue-400/20 dark:via-blue-500/15 dark:to-blue-600/20" />
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/8 to-primary/12 dark:from-transparent dark:via-blue-400/10 dark:to-blue-400/15" />
                      <div className="relative z-10">
                        <div className="w-20 h-20 bg-white/50 dark:bg-transparent backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/60 dark:border-white/40 shadow-2xl">
                          <Icon className="text-3xl w-10 h-10 text-primary dark:text-blue-300" />
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white drop-shadow-lg">
                          {service.name}
                        </h2>
                        <p className="text-xl text-gray-800 dark:text-gray-100 leading-relaxed drop-shadow-md">
                          {portableTextToPlainText(service.description)}
                        </p>
                      </div>
                    </div>

                    <div className="p-8 lg:p-10 backdrop-blur-sm">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center drop-shadow-md">
                        {t("services.features.title")}
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {service.features.map((feature, i) => (
                          <div
                            key={`${service.id}-feature-${i}`}
                            className="flex items-start p-4 bg-white/40 dark:bg-white/10 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-white/30 shadow-lg"
                          >
                            <div className="w-10 h-10 bg-white/60 dark:bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mr-4 flex-shrink-0 border border-white/70 dark:border-white/40 shadow-xl">
                              <CheckCircle className="text-green-600 dark:text-green-400 w-6 h-6" />
                            </div>
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 drop-shadow-sm self-center">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="text-center">
                        <Button
                          size="lg"
                          onClick={() => onNavigate("contact")}
                          className="bg-primary dark:bg-blue-600 text-white hover:bg-white hover:text-primary border-2 border-primary dark:hover:bg-white dark:hover:text-blue-600 transition-colors duration-300 px-10 py-4"
                        >
                          {t("common.contactexperts")}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 dark:border-gray-700/30 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary dark:text-white mb-6">
                {t("common.readytowork")}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t("common.contactdiscuss")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => onNavigate("contact")}
                  className="bg-primary dark:bg-blue-600 text-white hover:bg-white hover:text-primary border-2 border-primary dark:hover:bg-white dark:hover:text-blue-600 transition-colors duration-300 px-8 py-4 text-lg font-semibold"
                >
                  {t("common.contactexpert")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    onNavigate("home");
                    setTimeout(() => {
                      const element = document.getElementById("case-studies");
                      if (element) {
                        element.scrollIntoView({behavior: "smooth", block: "start"});
                      }
                    }, 100);
                  }}
                  className="border-2 border-primary text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:bg-blue-600 dark:hover:text-white px-8 py-4 text-lg font-semibold"
                >
                  {t("common.ourprojects")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
