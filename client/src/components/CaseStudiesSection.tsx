import {Button} from "@/components/ui/button";
import {CheckCircle, ArrowRight, Shield, Globe, Users, Database} from "lucide-react";
import {useTranslation, type Language} from "@/lib/i18n";
import {useQuery} from "@tanstack/react-query";
import {getCaseStudies, portableTextToPlainText, type CmsCaseStudy} from "@/lib/cms";

interface CaseStudiesSectionProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const iconMap = {
  cybersecurity: Shield,
  translations: Globe,
  training: Users,
  osint: Database,
  datarecovery: Database,
} as const;

export default function CaseStudiesSection({language, onNavigate}: CaseStudiesSectionProps) {
  const {t} = useTranslation(language);
  const {data: caseStudies = []} = useQuery<CmsCaseStudy[]>({
    queryKey: ["/api/cms/case-studies", language],
    queryFn: () => getCaseStudies(language),
  });
  const caseStudiesSafe = Array.isArray(caseStudies) ? caseStudies : [];

  const legacyCaseStudies = [
    {
      _id: "legacy-case-1",
      title: t("cases.study1.title"),
      category: t("cases.study1.category"),
      client: t("cases.study1.client"),
      description: t("cases.study1.description"),
      challenge: t("cases.study1.challenge"),
      solution: t("cases.study1.solution"),
      results: [t("cases.study1.result1"), t("cases.study1.result2"), t("cases.study1.result3")],
    },
    {
      _id: "legacy-case-2",
      title: t("cases.study2.title"),
      category: t("cases.study2.category"),
      client: t("cases.study2.client"),
      description: t("cases.study2.description"),
      challenge: t("cases.study2.challenge"),
      solution: t("cases.study2.solution"),
      results: [t("cases.study2.result1"), t("cases.study2.result2"), t("cases.study2.result3")],
    },
    {
      _id: "legacy-case-3",
      title: t("cases.study3.title"),
      category: t("cases.study3.category"),
      client: t("cases.study3.client"),
      description: t("cases.study3.description"),
      challenge: t("cases.study3.challenge"),
      solution: t("cases.study3.solution"),
      results: [t("cases.study3.result1"), t("cases.study3.result2"), t("cases.study3.result3")],
    },
  ];

  const caseStudyItems =
    caseStudiesSafe.length > 0
      ? caseStudiesSafe.map((study) => ({
          _id: study._id,
          title: study.title,
          category: study.category,
          client: study.client,
          description: portableTextToPlainText(study.description),
          challenge: study.challenge,
          solution: study.solution,
          results: study.results,
        }))
      : legacyCaseStudies;

  return (
    <>
      <div className="mb-16">
        <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-white/30 dark:border-gray-600/30 shadow-lg text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("cases.title")}
          </h2>
          <p className="text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
            {t("cases.subtitle")}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {caseStudyItems.map((study, index) => {
          const IconComponent = iconMap[study.category as keyof typeof iconMap] || Shield;
          return (
            <div
              key={study._id}
              className="bg-white/15 dark:bg-gray-700/30 backdrop-blur-md rounded-2xl border border-white/40 dark:border-gray-600/40 overflow-hidden hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#264259] text-white backdrop-blur-sm">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="mb-1 px-3 py-1 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-700 dark:text-gray-300 inline-block border border-white/30 dark:border-white/20">
                    {study.category}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{study.client}</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{study.title}</h3>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {study.description}
              </p>

              <div className="space-y-3 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t("cases.challenge")}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{study.challenge}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t("cases.solution")}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{study.solution}</p>
                </div>
              </div>

              <div className="mb-6 flex-grow">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {t("cases.results")}
                </h4>
                <ul className="space-y-2">
                  {study.results.map((result, resultIndex) => (
                    <li key={`${study._id}-result-${resultIndex}`} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className="w-full bg-[#264259] hover:bg-[#bd9775] text-white border-0 rounded-xl backdrop-blur-sm transition-colors duration-200 group mt-auto"
                onClick={() => onNavigate("contact")}
              >
                Potrzebujesz pomocy?
              </Button>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <Button
          size="lg"
          onClick={() => onNavigate("contact")}
          className="bg-gradient-to-r from-[#264259] to-[#bd9775] hover:from-[#bd9775] hover:to-[#264259] text-white px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
        >
          {t("cases.contact")}
          <ArrowRight className="w-6 h-6 ml-2" />
        </Button>
      </div>
    </>
  );
}
