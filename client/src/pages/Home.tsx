import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import BlogPreview from "@/components/BlogPreview";
import ContactForm from "@/components/ContactForm";
import ParallaxBackground from "@/components/ParallaxBackground";
import { type Language } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import { getPageContent, getSection, sortSections, type ClientType } from "@/lib/cms";

interface HomeProps {
  language: Language;
  clientType: ClientType;
  onNavigate: (page: string) => void;
}

export default function Home({ language, clientType, onNavigate }: HomeProps) {
  const { data: pageContent } = useQuery({
    queryKey: ["/api/cms/page-content", "home", language, clientType],
    queryFn: () => getPageContent("home", language, clientType),
  });
  const sections = sortSections(pageContent?.sections || []);
  const heroSection = getSection(sections, "heroSection");
  const trustSection = getSection(sections, "trustStatsSection");
  const showServices = sections.some((section) => section._type === "servicesIntroSection");
  const showBlog = sections.some((section) => section._type === "blogPreviewSection");
  const showContactForm = sections.some((section) => section._type === "contactFormSection");
  const trustItems = Array.isArray(trustSection?.items)
    ? (trustSection?.items as Array<{value?: string; label?: string}>)
    : [];

  return (
    <div className="min-h-screen relative">
      {/* Parallax Background for entire page */}
      <div className="fixed inset-0 z-0">
        <ParallaxBackground>
          <div></div>
        </ParallaxBackground>
      </div>

      <div className="relative z-10">
        <HeroSection 
          language={language} 
          clientType={clientType} 
          onNavigate={onNavigate} 
          content={heroSection}
        />
        
        {trustSection && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20 dark:divide-gray-600/20">
                {trustItems.map((item, index) => (
                  <div key={`trust-${index}`} className="text-center py-4 md:py-0 px-4">
                    <div className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">{item.value || ""}</div>
                    <div className="text-base font-medium text-gray-700 dark:text-gray-300">{item.label || ""}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        )}
        
        {/* Services Section with glass morphism container */}
        {showServices && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <ServicesGrid 
                language={language} 
                clientType={clientType} 
                onNavigate={onNavigate} 
              />
            </div>
          </div>
        </section>
        )}
        
        {/* Blog Preview Section with glass morphism container */}
        {showBlog && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <BlogPreview language={language} clientType={clientType} onNavigate={onNavigate} />
            </div>
          </div>
        </section>
        )}

        {/* Contact Form Section with glass morphism container */}
        {showContactForm && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <ContactForm language={language} clientType={clientType} />
            </div>
          </div>
        </section>
        )}
      </div>
    </div>
  );
}
