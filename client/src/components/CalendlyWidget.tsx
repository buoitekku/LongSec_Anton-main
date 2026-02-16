import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface CalendlyWidgetProps {
  language: 'pl' | 'en' | 'ua';
  calendlyUrl?: string;
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: any) => void;
    };
  }
}

export default function CalendlyWidget({ language, calendlyUrl }: CalendlyWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Clear any existing widget first
    if (widgetRef.current) {
      widgetRef.current.innerHTML = '';
    }

    // Load Calendly script if not already loaded
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        initializeCalendly();
      };
      document.head.appendChild(script);
    } else {
      initializeCalendly();
    }

    return () => {
      // Clean up on unmount
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
      }
    };
  }, [language]);

  const initializeCalendly = () => {
    if (window.Calendly && widgetRef.current && !widgetRef.current.hasChildNodes()) {
      // Only initialize if the parent element exists and is empty
      const finalCalendlyUrl = calendlyUrl || import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/your-username/consultation';
      
      window.Calendly.initInlineWidget({
        url: finalCalendlyUrl,
        parentElement: widgetRef.current,
        prefill: {},
        utm: {
          utmCampaign: 'professional-it-services',
          utmSource: 'website',
          utmMedium: 'inline-widget'
        }
      });
    }
  };

  // Check if Calendly URL is configured
  const finalCalendlyUrl = calendlyUrl || import.meta.env.VITE_CALENDLY_URL;
  
  if (!finalCalendlyUrl) {
    return (
      <Card className="max-w-2xl mx-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 dark:bg-blue-600/20 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8 text-primary dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white">
              {language === 'en' ? 'Calendly Integration' : 
               language === 'ua' ? 'Інтеграція Calendly' : 
               'Integracja Calendly'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'To enable appointment booking, please configure VITE_CALENDLY_URL in your environment variables with your Calendly link.' :
               language === 'ua' ? 'Для активації бронювання зустрічей, будь ласка, налаштуйте VITE_CALENDLY_URL у змінних середовища з вашим посиланням Calendly.' :
               'Aby włączyć rezerwację spotkań, skonfiguruj VITE_CALENDLY_URL w zmiennych środowiskowych z Twoim linkiem Calendly.'}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-left">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                VITE_CALENDLY_URL=https://calendly.com/your-username/consultation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div 
        ref={widgetRef}
        style={{ minWidth: '320px', height: '700px' }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      />
    </div>
  );
}
