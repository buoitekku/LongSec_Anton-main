import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogPreview from "@/components/BlogPreview";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ContactForm from "@/components/ContactForm";
import ParallaxBackground from "@/components/ParallaxBackground";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation, type Language } from "@/lib/i18n";

interface HomeProps {
  language: Language;
  clientType: 'B2B' | 'B2C';
  onNavigate: (page: string) => void;
}

export default function Home({ language, clientType, onNavigate }: HomeProps) {
  const { t } = useTranslation(language);

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
        />
        
        {/* Trust Statistics Section */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20 dark:divide-gray-600/20">
                <div className="text-center py-4 md:py-0 px-4">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">500+</div>
                  <div className="text-base font-medium text-gray-700 dark:text-gray-300">{t('trust.projects')}</div>
                </div>
                <div className="text-center py-4 md:py-0 px-4">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">98%</div>
                  <div className="text-base font-medium text-gray-700 dark:text-gray-300">{t('trust.clients')}</div>
                </div>
                <div className="text-center py-4 md:py-0 px-4">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">15+</div>
                  <div className="text-base font-medium text-gray-700 dark:text-gray-300">{t('trust.experience')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section with glass morphism container */}
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
        
        {/* Case Studies Section with glass morphism container */}
        <section id="case-studies" className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <CaseStudiesSection language={language} onNavigate={onNavigate} />
            </div>
          </div>
        </section>
        
        {/* Certifications Section with glass morphism container */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <div className="mb-12">
                <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-white/30 dark:border-gray-600/30 shadow-lg text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('common.certifications')}
                  </h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
                    {t('common.certifications.subtitle')}
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'CISSP', desc: t('cert.cissp'), shortName: 'CISSP' },
                  { name: 'CISM', desc: t('cert.cism'), shortName: 'CISM' },
                  { name: 'CEH', desc: t('cert.ceh'), shortName: 'CEH' },
                  { name: 'ISO 27001', desc: t('cert.iso27001'), shortName: 'ISO' }
                ].map((cert, index) => (
                  <div key={index} className="text-center bg-white/15 dark:bg-gray-700/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 dark:border-gray-600/40 shadow-lg">
                    <div className="w-20 h-20 rounded-xl mx-auto mb-4 bg-gradient-to-br from-[#d4af37] to-[#264259] backdrop-blur-md border border-white/30 dark:border-white/20 flex items-center justify-center shadow-lg">
                      <span className="text-white font-black text-lg tracking-wider">
                        {cert.shortName}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section with glass morphism container */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <TestimonialsSection language={language} />
            </div>
          </div>
        </section>

        {/* Blog Preview Section with glass morphism container */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <BlogPreview language={language} onNavigate={onNavigate} />
            </div>
          </div>
        </section>

        {/* Contact Form Section with glass morphism container */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 shadow-xl border border-white/30 dark:border-gray-700/30">
              <ContactForm language={language} clientType={clientType} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
