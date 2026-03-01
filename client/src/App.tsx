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
  const [clientType, setClientType] = useState<'B2B' | 'B2G'>('B2B');

  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    setLocation(path);
    // Keep anchor navigation in control of its own scroll behavior.
    if (!page.includes("#")) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as Language);
  };

  const handleClientTypeChange = (type: 'B2B' | 'B2G') => {
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
          <Route path="/">
            <Home {...pageProps} />
          </Route>
          <Route path="/services">
            <Services {...pageProps} />
          </Route>
          <Route path="/blog">
            <Blog language={language} onNavigate={handleNavigate} />
          </Route>
          <Route path="/blog/:slug">
            <BlogPost language={language} onNavigate={handleNavigate} />
          </Route>
          <Route path="/contact">
            <Contact {...pageProps} />
          </Route>
          <Route>
            <NotFound language={language} />
          </Route>
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
