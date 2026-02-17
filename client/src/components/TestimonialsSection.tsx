import {Star} from "lucide-react";
import {useTranslation, type Language} from "@/lib/i18n";
import {useQuery} from "@tanstack/react-query";
import {getTestimonials, type CmsTestimonial} from "@/lib/cms";

interface TestimonialsSectionProps {
  language: Language;
}

function initialsFor(author: string): string {
  return author
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialsSection({language}: TestimonialsSectionProps) {
  const {t} = useTranslation(language);
  const {data: testimonials = [], isFetched: isTestimonialsFetched} = useQuery<CmsTestimonial[]>({
    queryKey: ["/api/cms/testimonials", language],
    queryFn: () => getTestimonials(language),
  });

  const legacyTestimonials = [
    {
      _id: "legacy-testimonial-1",
      quote:
        "Profesjonalny audit bezpieczenstwa pomogl nam zidentyfikowac krytyczne luki w systemie.",
      author: "Marek Wisniewski",
      position: "CTO, TechCorp Solutions",
      rating: 5,
    },
    {
      _id: "legacy-testimonial-2",
      quote: "Tlumaczenia dokumentacji technicznej byly wykonane na najwyzszym poziomie.",
      author: "Anna Kowalska",
      position: "PM, Software House Krakow",
      rating: 5,
    },
    {
      _id: "legacy-testimonial-3",
      quote: "Szkolenia z cyberbezpieczenstwa byly bardzo praktyczne i przystepnie poprowadzone.",
      author: "Piotr Nowak",
      position: "IT Manager, Bank Regional",
      rating: 5,
    },
  ];

  const testimonialItems =
    testimonials.length > 0 ? testimonials : isTestimonialsFetched ? legacyTestimonials : [];

  return (
    <>
      <div className="mb-16">
        <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-white/30 dark:border-gray-600/30 shadow-lg text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {testimonialItems.map((testimonial) => (
          <div
            key={testimonial._id}
            className="bg-white/15 dark:bg-gray-700/30 backdrop-blur-md rounded-2xl p-8 border border-white/40 dark:border-gray-600/40 shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col h-full"
          >
            <div className="flex items-center mb-6">
              <div className="flex text-[#d4af37]">
                {[...Array(Math.max(1, Math.min(5, testimonial.rating || 5)))].map((_, i) => (
                  <Star key={`${testimonial._id}-star-${i}`} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-base flex-grow">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center mt-auto">
              <div className="w-12 h-12 bg-gradient-to-r from-[#d4af37] to-[#264259] rounded-full flex items-center justify-center text-white font-bold mr-4">
                {initialsFor(testimonial.author)}
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-base">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {testimonial.position}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
