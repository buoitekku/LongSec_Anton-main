import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const languages = [
    { code: 'pl', label: 'PL' },
    { code: 'en', label: 'EN' },
    { code: 'ua', label: 'UA' }
  ];

  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? "default" : "ghost"}
          size="sm"
          onClick={() => onLanguageChange(lang.code)}
          className={`px-2 py-1 text-xs font-medium rounded ${
            currentLanguage === lang.code
              ? 'bg-primary text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff]'
          }`}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
}
