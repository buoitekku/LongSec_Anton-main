import logoPath from "@assets/LOGO_1752411666711.png";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

export default function ParallaxBackground({ children }: ParallaxBackgroundProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Static Background with Logo */}
      <div className="fixed inset-0 z-0">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700" />
        
        {/* Single centered blurred logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-8 dark:opacity-12">
          <img 
            src={logoPath}
            alt="AD Background Logo"
            className="w-[600px] h-[600px] object-contain logo-background"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}