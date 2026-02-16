import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ParallaxBackground from "./ParallaxBackground";
import { type Language } from "@/lib/i18n";

interface LayoutProps {
  children: ReactNode;
  language: Language;
  clientType: 'B2B' | 'B2C';
  onLanguageChange: (language: string) => void;
  onClientTypeChange: (type: 'B2B' | 'B2C') => void;
  onNavigate: (page: string) => void;
}

export default function Layout({ 
  children, 
  language, 
  clientType, 
  onLanguageChange, 
  onClientTypeChange, 
  onNavigate 
}: LayoutProps) {
  return (
    <ParallaxBackground>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          language={language}
          clientType={clientType}
          onLanguageChange={onLanguageChange}
          onClientTypeChange={onClientTypeChange}
          onNavigate={onNavigate}
        />
        <main className="flex-1">
          {children}
        </main>
        <Footer language={language} onNavigate={onNavigate} />
      </div>
    </ParallaxBackground>
  );
}
