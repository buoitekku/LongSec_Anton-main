import {Button} from "@/components/ui/button";
import {Shield, Globe, GraduationCap, Search, Database, Phone} from "lucide-react";
import {useTranslation, type Language} from "@/lib/i18n";
import AnimatedCard from "./AnimatedCard";
import FadeInSection from "./FadeInSection";
import {useQuery} from "@tanstack/react-query";
import {getServices, portableTextToPlainText, type CmsService} from "@/lib/cms";

interface ServicesGridProps {
  language: Language;
  clientType: "B2B" | "B2C";
  onNavigate: (page: string) => void;
}

const iconMap = {
  cybersecurity: Shield,
  translations: Globe,
  training: GraduationCap,
  osint: Search,
  datarecovery: Database,
} as const;

export default function ServicesGrid({language, clientType, onNavigate}: ServicesGridProps) {
  const {t} = useTranslation(language);

  const {data: services = []} = useQuery<CmsService[]>({
    queryKey: ["/api/cms/services", language, clientType],
    queryFn: () => getServices(language, clientType),
  });

  const legacyServices = [
    {
      serviceKey: "cybersecurity",
      name: t("services.cybersecurity.title"),
      description: t(`services.cybersecurity.description.${clientType.toLowerCase()}`),
      features: [t("features.cybersecurity.0"), t("features.cybersecurity.1"), t("features.cybersecurity.2"), t("features.cybersecurity.3")],
    },
    {
      serviceKey: "translations",
      name: t("services.translations.title"),
      description: t(`services.translations.description.${clientType.toLowerCase()}`),
      features: [t("features.translations.0"), t("features.translations.1"), t("features.translations.2"), t("features.translations.3")],
    },
    {
      serviceKey: "training",
      name: t("services.training.title"),
      description: t(`services.training.description.${clientType.toLowerCase()}`),
      features: [t("features.training.0"), t("features.training.1"), t("features.training.2"), t("features.training.3")],
    },
    {
      serviceKey: "osint",
      name: t("services.osint.title"),
      description: t(`services.osint.description.${clientType.toLowerCase()}`),
      features: [t("features.osint.0"), t("features.osint.1"), t("features.osint.2"), t("features.osint.3")],
    },
    {
      serviceKey: "datarecovery",
      name: t("services.datarecovery.title"),
      description: t(`services.datarecovery.description.${clientType.toLowerCase()}`),
      features: [t("features.datarecovery.0"), t("features.datarecovery.1"), t("features.datarecovery.2"), t("features.datarecovery.3")],
    },
  ];

  const serviceItems =
    services.length > 0
      ? services.map((service) => ({
          _id: service._id,
          serviceKey: service.serviceKey,
          name: service.name,
          description: portableTextToPlainText(service.description),
          features: service.features,
        }))
      : legacyServices.map((service, index) => ({
          _id: `legacy-service-${index}`,
          serviceKey: service.serviceKey,
          name: service.name,
          description: service.description,
          features: service.features,
        }));

  return (
    <>
      <FadeInSection className="mb-16">
        <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-white/30 dark:border-gray-600/30 shadow-lg text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t(clientType === "B2B" ? "services.title.b2b" : "services.title.b2c")}
          </h2>
          <p className="text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
            {t(clientType === "B2B" ? "services.subtitle.b2b" : "services.subtitle.b2c")}
          </p>
        </div>
      </FadeInSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceItems.map((service, index) => {
          const Icon = iconMap[service.serviceKey as keyof typeof iconMap] || Shield;

          return (
            <AnimatedCard key={service._id} delay={index * 0.1}>
              <div className="h-full bg-white/15 dark:bg-gray-700/30 backdrop-blur-md rounded-2xl p-8 border border-white/40 dark:border-gray-600/40 shadow-lg hover:shadow-xl transition-all duration-200 group hover:bg-white/25 dark:hover:bg-gray-700/40 flex flex-col">
                <div className="w-16 h-16 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-xl mb-6 border border-white/30 dark:border-white/20 flex items-center justify-center">
                  <Icon className="text-2xl text-gray-700 dark:text-gray-300 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-6 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <li key={`${service._id}-feature-${featureIndex}`}>
                      <span className="text-green-600 dark:text-green-400 mr-2">-</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="bg-[#264259] hover:bg-[#bd9775] text-white border-0 rounded-xl backdrop-blur-sm transition-colors duration-200 mt-auto"
                  onClick={() => onNavigate("services")}
                >
                  {t("common.learnmore")}
                </Button>
              </div>
            </AnimatedCard>
          );
        })}

        <AnimatedCard delay={services.length * 0.1}>
          <div className="bg-gradient-to-br from-[#264259] to-[#bd9775] text-white h-full backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg flex flex-col">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/30">
              <Phone className="text-2xl w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">{t("common.needhelp")}</h3>
            <p className="mb-6 opacity-90 flex-grow">{t("common.contactexperts")}</p>
            <Button
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-[#264259] border border-white/30 transition-colors duration-300 w-full rounded-xl mt-auto"
              onClick={() => onNavigate("contact")}
            >
              <Phone className="mr-2 h-4 w-4" />
              {t("common.schedule")}
            </Button>
          </div>
        </AnimatedCard>
      </div>
    </>
  );
}
