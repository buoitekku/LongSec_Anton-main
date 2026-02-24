import {useEffect} from "react";
import {motion} from "framer-motion";
import {Shield, Search, GraduationCap, Scale, HardDrive, Globe, CheckCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {type Language} from "@/lib/i18n";
import ParallaxBackground from "@/components/ParallaxBackground";
import {useQuery} from "@tanstack/react-query";
import {getPageContent, getSection, getServices, portableTextToPlainText, type ClientType, type CmsService} from "@/lib/cms";

interface ServicesPageProps {
  language: Language;
  clientType: ClientType;
  onNavigate: (page: string) => void;
}

const iconMap = {
  physicalsecurity: Shield,
  phishing: Search,
  cyberawareness: GraduationCap,
  osint: Search,
  forensics: Scale,
  datarecovery: HardDrive,
  translations: Globe,
} as const;

export default function ServicesPage({language, clientType, onNavigate}: ServicesPageProps) {
  const {data: services = []} = useQuery<CmsService[]>({
    queryKey: ["/api/cms/services", language, clientType, "full"],
    queryFn: () => getServices(language, clientType),
  });
  const {data: pageContent} = useQuery({
    queryKey: ["/api/cms/page-content", "services", language, clientType],
    queryFn: () => getPageContent("services", language, clientType),
  });

  const intro = getSection(pageContent?.sections, "servicesIntroSection");
  const listSection = getSection(pageContent?.sections, "servicesListSection");
  const ctaBand = getSection(pageContent?.sections, "ctaBandSection");

  const serviceItems = services.map((service) => ({
    id: service._id,
    serviceKey: service.serviceKey,
    icon: service.icon,
    name: service.name,
    description: portableTextToPlainText(service.description),
    features: service.features,
  }));

  useEffect(() => {
    const scrollElementToCenter = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const targetTop = absoluteTop - window.innerHeight / 2 + rect.height / 2;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth",
      });
    };

    const scrollToHashTarget = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash.startsWith("service-")) {
        return;
      }

      let attempts = 0;
      const maxAttempts = 30;
      const tryFindAndScroll = () => {
        const element = document.getElementById(hash);
        if (element) {
          scrollElementToCenter(element);
          return;
        }

        attempts += 1;
        if (attempts < maxAttempts) {
          window.setTimeout(tryFindAndScroll, 100);
        }
      };

      window.setTimeout(tryFindAndScroll, 80);
    };

    scrollToHashTarget();
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, [serviceItems.length]);

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
              {String(intro?.title || "")}
            </motion.h1>
            <motion.p
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: 0.4}}
              className="text-xl text-white/90 dark:text-white/90 max-w-3xl mx-auto"
            >
              {String(intro?.subtitle || "")}
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {serviceItems.map((service, index) => {
                const Icon = iconMap[service.serviceKey as keyof typeof iconMap] || Shield;
                const customIcon = service.icon?.trim();
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
                          {customIcon ? (
                            <span className="text-4xl leading-none">{customIcon}</span>
                          ) : (
                            <Icon className="text-3xl w-10 h-10 text-primary dark:text-blue-300" />
                          )}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white drop-shadow-lg">
                          {service.name}
                        </h2>
                        <p className="text-xl text-gray-800 dark:text-gray-100 leading-relaxed drop-shadow-md">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-8 lg:p-10 backdrop-blur-sm">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center drop-shadow-md">
                        {String(intro?.featuresTitle || "")}
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
                          {String(listSection?.contactExpertsLabel || "")}
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
                {String(ctaBand?.title || "")}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {String(ctaBand?.subtitle || "")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => onNavigate("contact")}
                  className="bg-primary dark:bg-blue-600 text-white hover:bg-white hover:text-primary border-2 border-primary dark:hover:bg-white dark:hover:text-blue-600 transition-colors duration-300 px-8 py-4 text-lg font-semibold"
                >
                  {String(ctaBand?.primaryLabel || "")}
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
                  {String(ctaBand?.secondaryLabel || "")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
