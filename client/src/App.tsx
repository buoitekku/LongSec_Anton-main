import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/Layout";
import PageTransition from "@/components/PageTransition";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import { type Language } from "@/lib/i18n";

function Router() {
  const [location, setLocation] = useLocation();
  const [language, setLanguage] = useState<Language>('pl');
  const [clientType, setClientType] = useState<'B2B' | 'B2C'>('B2B');

  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    setLocation(path);
    // Smooth scroll with slight delay for animation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as Language);
  };

  const handleClientTypeChange = (type: 'B2B' | 'B2C') => {
    setClientType(type);
  };

  const pageProps = {
    language,
    clientType,
    onNavigate: handleNavigate
  };

  return (
    <Layout
      language={language}
      clientType={clientType}
      onLanguageChange={handleLanguageChange}
      onClientTypeChange={handleClientTypeChange}
      onNavigate={handleNavigate}
    >
      <PageTransition location={location}>
        <Switch>
          <Route path="/" component={() => <Home {...pageProps} />} />
          <Route path="/services" component={() => <Services {...pageProps} />} />
          <Route path="/blog" component={() => <Blog language={language} onNavigate={handleNavigate} />} />
          <Route path="/blog/:slug" component={() => <BlogPost language={language} onNavigate={handleNavigate} />} />
          <Route path="/contact" component={() => <Contact {...pageProps} />} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
