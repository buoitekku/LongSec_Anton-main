export type Language = 'pl' | 'en' | 'ua';

export const translations = {
  pl: {
    // Navigation
    'nav.home': 'Strona główna',
    'nav.services': 'Usługi',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontakt',
    
    // Common
    'common.back': 'Wstecz',
    
    // Hero Section
    'hero.badge': 'Certyfikowani eksperci bezpieczeństwa IT',
    'hero.title': 'Cyberbezpieczeństwo na Najwyższym Poziomie',
    'hero.subtitle': 'Profesjonalne usługi IT łączące cyberbezpieczeństwo, tłumaczenia specjalistyczne i szkolenia. Kompleksowe wsparcie dla przedsiębiorstw i klientów indywidualnych.',
    'hero.cta.consultation': 'Bezpłatna Konsultacja',
    'hero.cta.cases': 'Zobacz Case Studies',
    
    // Services
    'services.title': 'Nasze Specjalizacje',
    'services.subtitle': 'Oferujemy kompleksowe rozwiązania IT dostosowane do potrzeb Twojego biznesu',
    'services.cybersecurity.title': 'Cyberbezpieczeństwo',
    'services.cybersecurity.description': 'Audyty bezpieczeństwa, testy penetracyjne, implementacja RODO i monitoring incydentów.',
    'services.translations.title': 'Tłumaczenia Specjalistyczne',
    'services.translations.description': 'Tłumaczenia techniczne IT, dokumentacja specjalistyczna i lokalizacja oprogramowania.',
    'services.training.title': 'Szkolenia Bezpieczeństwa',
    'services.training.description': 'Szkolenia dla zespołów IT, awareness trainings i certyfikacje bezpieczeństwa.',
    'services.osint.title': 'Wywiad OSINT',
    'services.osint.description': 'Analiza zagrożeń, monitoring reputacji online i competitive intelligence.',
    'services.datarecovery.title': 'Odzyskiwanie Danych',
    'services.datarecovery.description': 'Forensics cyfrowa, odzyskiwanie po awariach i analiza incydentów.',
    
    // Contact
    'contact.title': 'Skontaktuj się z Ekspertami',
    'contact.subtitle': 'Rozpocznij współpracę z profesjonalistami IT. Bezpłatna konsultacja w ciągu 24 godzin.',
    'contact.form.title': 'Wyślij Zapytanie',
    'contact.form.name': 'Imię i nazwisko',
    'contact.form.email': 'Email',
    'contact.form.company': 'Firma',
    'contact.form.phone': 'Telefon',
    'contact.form.service': 'Usługa',
    'contact.form.message': 'Wiadomość',
    'contact.form.submit': 'Wyślij Zapytanie',
    
    // Blog
    'blog.title': 'Najnowsze Wpisy',
    'blog.subtitle': 'Eksperci dzielą się wiedzą na temat cyberbezpieczeństwa',
    'blog.readmore': 'Czytaj więcej',
    'blog.notFound': 'Nie znaleziono wpisu',
    'blog.viewall': 'Zobacz wszystkie',
    'blog.search.placeholder': 'Szukaj artykułów...',
    'blog.filter.all': 'Wszystkie',
    'blog.noresults.title': 'Brak artykułów',
    'blog.noresults.subtitle': 'Nie znaleziono artykułów spełniających kryteria wyszukiwania.',
    'blog.category.cybersecurity': 'Cyberbezpieczeństwo',
    'blog.category.translations': 'Tłumaczenia',
    'blog.category.training': 'Szkolenia',
    'blog.category.osint': 'OSINT',
    'blog.category.datarecovery': 'Odzyskiwanie Danych',
    
    // Footer
    'footer.description': 'Kompleksowe usługi IT łączące cyberbezpieczeństwa, tłumaczenia specjalistyczne i szkolenia. Zaufało nam już ponad 500 firm w całej Europie.',
    'footer.services': 'Usługi',
    'footer.company': 'Firma',
    'footer.copyright': '© 2025 LongSec. Wszystkie prawa zastrzeżone.',
    
    // Common buttons and labels
    'common.learnmore': 'Dowiedz się więcej',
    'common.needhelp': 'Potrzebujesz Pomocy?',
    'common.contactexperts': 'Skontaktuj się z naszymi ekspertami, aby otrzymać bezpłatną konsultację dostosowaną do Twoich potrzeb.',
    'common.schedule': 'Umów Konsultację',
    'common.certifications': 'Certyfikacje i Kompetencje',
    'common.certifications.subtitle': 'Nasz zespół posiada międzynarodowe certyfikaty potwierdzające najwyższą jakość usług',
    'common.contactexpert': 'Skontaktuj się z ekspertem',
    'common.readytowork': 'Gotowy na współpracę?',
    'common.contactdiscuss': 'Skontaktuj się z nami, aby omówić Twoje potrzeby i otrzymać spersonalizowaną ofertę.',
    'common.freeconsultation': 'Bezpłatna konsultacja',
    'common.ourprojects': 'Poznaj nasze realizacje',
    
    // Service features
    'features.cybersecurity.0': 'Audyty bezpieczeństwa IT',
    'features.cybersecurity.1': 'Testy penetracyjne',
    'features.cybersecurity.2': 'Implementacja RODO/GDPR',
    'features.cybersecurity.3': 'Monitoring incydentów 24/7',
    'features.translations.0': 'Tłumaczenia techniczne IT',
    'features.translations.1': 'Dokumentacja specjalistyczna',
    'features.translations.2': 'Lokalizacja oprogramowania',
    'features.translations.3': 'Certyfikowane tłumaczenia',
    'features.training.0': 'Szkolenia dla zespołów IT',
    'features.training.1': 'Szkolenia świadomości',
    'features.training.2': 'Certyfikacje bezpieczeństwa',
    'features.training.3': 'Warsztaty praktyczne',
    'features.osint.0': 'Analiza zagrożeń',
    'features.osint.1': 'Monitoring reputacji online',
    'features.osint.2': 'Wywiad konkurencyjny',
    'features.osint.3': 'Wywiad zagrożeń',
    'features.datarecovery.0': 'Kryminalistyka cyfrowa',
    'features.datarecovery.1': 'Odzyskiwanie po awariach',
    'features.datarecovery.2': 'Analiza incydentów',
    'features.datarecovery.3': 'Doradztwo backup & recovery',
    
    // Testimonials
    'testimonials.title': 'Opinie Klientów',
    'testimonials.subtitle': 'Zobacz, co mówią o nas nasi zadowoleni klienci',
    
    // Trust indicators
    'trust.projects': 'Projektów',
    'trust.clients': 'Zadowolonych klientów',
    'trust.experience': 'Lat doświadczenia',
    
    // Certifications
    'cert.cissp': 'Certified Information Systems Security Professional',
    'cert.cism': 'Certified Information Security Manager',
    'cert.ceh': 'Certified Ethical Hacker',
    'cert.iso27001': 'Information Security Management',
    
    // Footer certified by
    'footer.certifiedby': 'Certyfikowane przez:',
    
    // Footer company links
    'footer.aboutus': 'O nas',
    'footer.career': 'Kariera',
    'footer.privacy': 'Polityka prywatności',
    
    // Contact page
    'contact.method.phone': 'Telefon',
    'contact.method.email': 'Email',
    'contact.method.address': 'Adres',
    'contact.method.hours': 'Godziny pracy',
    'contact.hours.description': 'Pon-Pt 8:00-18:00',
    'contact.email.description': 'Odpowiadamy w ciągu 24h',
    'contact.address.description': 'Spotkania po umówieniu',
    'contact.hours.value': 'Poniedziałek - Piątek',
    'contact.hours.time': '8:00 - 18:00 CET',
    'contact.team.title': 'Zespół ekspertów',
    'contact.team.description': 'Certyfikowani specjaliści z wieloletnim doświadczeniem',
    'contact.quality.title': 'Gwarancja jakości',
    'contact.quality.description': 'Międzynarodowe certyfikaty i standardy bezpieczeństwa',
    'contact.speed.title': 'Szybka realizacja',
    'contact.speed.description': 'Elastyczne terminy dostosowane do Twoich potrzeb',
    

    
    // Services page detailed features
    'services.detailed.cybersecurity.feature.0': 'Kompleksowe audyty bezpieczeństwa IT',
    'services.detailed.cybersecurity.feature.1': 'Profesjonalne testy penetracyjne',
    'services.detailed.cybersecurity.feature.2': 'Wdrożenie RODO',
    'services.detailed.cybersecurity.feature.3': 'Monitoring incydentów 24/7',
    'services.detailed.cybersecurity.feature.4': 'Analiza zagrożeń i podatności',
    'services.detailed.cybersecurity.feature.5': 'Konsultacje eksperckie',
    'services.detailed.cybersecurity.benefit.0': 'Zwiększone bezpieczeństwo systemów',
    'services.detailed.cybersecurity.benefit.1': 'Zgodność z przepisami',
    'services.detailed.cybersecurity.benefit.2': 'Minimalizacja ryzyka cyberataków',
    'services.detailed.cybersecurity.benefit.3': 'Profesjonalne wsparcie techniczne',
    
    'services.detailed.translations.feature.0': 'Techniczne tłumaczenia IT',
    'services.detailed.translations.feature.1': 'Specjalistyczna dokumentacja',
    'services.detailed.translations.feature.2': 'Lokalizacja oprogramowania',
    'services.detailed.translations.feature.3': 'Tłumaczenia poświadczone',
    'services.detailed.translations.feature.4': 'Wsparcie wielojęzyczne',
    'services.detailed.translations.feature.5': 'Kontrola jakości',
    'services.detailed.translations.benefit.0': 'Precyzja terminologiczna',
    'services.detailed.translations.benefit.1': 'Szybkie terminy realizacji',
    'services.detailed.translations.benefit.2': 'Certyfikowani tłumacze',
    'services.detailed.translations.benefit.3': 'Gwarancja poufności',
    
    'services.detailed.training.feature.0': 'Szkolenia zespołów IT',
    'services.detailed.training.feature.1': 'Szkolenia uświadamiające',
    'services.detailed.training.feature.2': 'Certyfikacje bezpieczeństwa',
    'services.detailed.training.feature.3': 'Praktyczne warsztaty',
    'services.detailed.training.feature.4': 'Szkolenia zdalne i stacjonarne',
    'services.detailed.training.feature.5': 'Materiały szkoleniowe',
    'services.detailed.training.benefit.0': 'Podniesienie kompetencji zespołu',
    'services.detailed.training.benefit.1': 'Praktyczne podejście',
    'services.detailed.training.benefit.2': 'Certyfikowane programy',
    'services.detailed.training.benefit.3': 'Dostosowanie do potrzeb',
    
    'services.detailed.osint.feature.0': 'Analiza zagrożeń',
    'services.detailed.osint.feature.1': 'Monitoring reputacji online',
    'services.detailed.osint.feature.2': 'Wywiad konkurencyjny',
    'services.detailed.osint.feature.3': 'Analiza zagrożeń wywiadowczych',
    'services.detailed.osint.feature.4': 'Monitoring mediów społecznościowych',
    'services.detailed.osint.feature.5': 'Ocena ryzyka',
    'services.detailed.osint.benefit.0': 'Wczesne wykrywanie zagrożeń',
    'services.detailed.osint.benefit.1': 'Ochrona reputacji',
    'services.detailed.osint.benefit.2': 'Przewaga konkurencyjna',
    'services.detailed.osint.benefit.3': 'Świadome podejmowanie decyzji',
    
    'services.detailed.datarecovery.feature.0': 'Kryminalistyka cyfrowa',
    'services.detailed.datarecovery.feature.1': 'Odzyskiwanie po awariach',
    'services.detailed.datarecovery.feature.2': 'Analiza incydentów',
    'services.detailed.datarecovery.feature.3': 'Doradztwo backup & recovery',
    'services.detailed.datarecovery.feature.4': 'Strategie ochrony danych',
    'services.detailed.datarecovery.feature.5': 'Szybka reakcja awaryjna',
    'services.detailed.datarecovery.benefit.0': 'Szybkie odzyskanie danych',
    'services.detailed.datarecovery.benefit.1': 'Minimalizacja przestojów',
    'services.detailed.datarecovery.benefit.2': 'Ekspercka analiza śledcza',
    'services.detailed.datarecovery.benefit.3': 'Strategie zapobiegania',
    
    'services.detailed.features': 'Funkcje',
    'services.detailed.benefits': 'Korzyści',
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Common
    'common.back': 'Back',
    
    // Hero Section
    'hero.badge': 'Certified IT Security Experts',
    'hero.title': 'Cybersecurity at the Highest Level',
    'hero.subtitle': 'Professional IT services combining cybersecurity, specialized translations and training. Comprehensive support for businesses and individual clients.',
    'hero.cta.consultation': 'Free Consultation',
    'hero.cta.cases': 'View Case Studies',
    
    // Services
    'services.title': 'Our Specializations',
    'services.subtitle': 'We offer comprehensive IT solutions tailored to your business needs',
    'services.cybersecurity.title': 'Cybersecurity',
    'services.cybersecurity.description': 'Security audits, penetration testing, GDPR implementation and incident monitoring.',
    'services.translations.title': 'Specialized Translations',
    'services.translations.description': 'Technical IT translations, specialized documentation and software localization.',
    'services.training.title': 'Security Training',
    'services.training.description': 'IT team training, awareness trainings and security certifications.',
    'services.osint.title': 'OSINT Intelligence',
    'services.osint.description': 'Threat analysis, online reputation monitoring and competitive intelligence.',
    'services.datarecovery.title': 'Data Recovery',
    'services.datarecovery.description': 'Digital forensics, disaster recovery and incident analysis.',
    
    // Contact
    'contact.title': 'Contact Our Experts',
    'contact.subtitle': 'Start working with IT professionals. Free consultation within 24 hours.',
    'contact.form.title': 'Send Inquiry',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Company',
    'contact.form.phone': 'Phone',
    'contact.form.service': 'Service',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Inquiry',
    
    // Blog
    'blog.title': 'Latest Posts',
    'blog.subtitle': 'Experts share knowledge about cybersecurity',
    'blog.readmore': 'Read more',
    'blog.notFound': 'Post not found',
    'blog.viewall': 'View all',
    'blog.search.placeholder': 'Search articles...',
    'blog.filter.all': 'All',
    'blog.noresults.title': 'No articles found',
    'blog.noresults.subtitle': 'No articles found matching the search criteria.',
    'blog.category.cybersecurity': 'Cybersecurity',
    'blog.category.translations': 'Translations',
    'blog.category.training': 'Training',
    'blog.category.osint': 'OSINT',
    'blog.category.datarecovery': 'Data Recovery',
    
    // Footer
    'footer.description': 'Comprehensive IT services combining cybersecurity, specialized translations and training. Trusted by over 500 companies across Europe.',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.copyright': '© 2025 LongSec. All rights reserved.',
    
    // Common buttons and labels
    'common.learnmore': 'Learn more',
    'common.needhelp': 'Need Help?',
    'common.contactexperts': 'Contact our experts to receive a free consultation tailored to your needs.',
    'common.schedule': 'Schedule Consultation',
    'common.certifications': 'Certifications and Competencies',
    'common.certifications.subtitle': 'Our team holds international certificates confirming the highest quality of services',
    'common.contactexpert': 'Contact Expert',
    'common.readytowork': 'Ready to Collaborate?',
    'common.contactdiscuss': 'Contact us to discuss your needs and receive a personalized offer.',
    'common.freeconsultation': 'Free Consultation',
    'common.ourprojects': 'View Our Projects',
    
    // Service features
    'features.cybersecurity.0': 'Threat analysis',
    'features.cybersecurity.1': 'Online reputation monitoring',
    'features.cybersecurity.2': 'Competitive intelligence',
    'features.cybersecurity.3': 'Threat intelligence',
    'features.translations.0': 'Technical IT translations',
    'features.translations.1': 'Specialized documentation',
    'features.translations.2': 'Software localization',
    'features.translations.3': 'Certified translations',
    'features.training.0': 'IT team training',
    'features.training.1': 'Awareness trainings',
    'features.training.2': 'Security certifications',
    'features.training.3': 'Practical workshops',
    'features.osint.0': 'Threat analysis',
    'features.osint.1': 'Online reputation monitoring',
    'features.osint.2': 'Competitive intelligence',
    'features.osint.3': 'Threat intelligence',
    'features.datarecovery.0': 'Digital forensics',
    'features.datarecovery.1': 'Disaster recovery',
    'features.datarecovery.2': 'Incident analysis',
    'features.datarecovery.3': 'Backup & recovery consulting',
    
    // Testimonials
    'testimonials.title': 'Client Reviews',
    'testimonials.subtitle': 'See what our satisfied clients say about us',
    
    // Trust indicators
    'trust.projects': 'Projects',
    'trust.clients': 'Satisfied clients',
    'trust.experience': 'Years of experience',
    
    // Certifications
    'cert.cissp': 'Certified Information Systems Security Professional',
    'cert.cism': 'Certified Information Security Manager',
    'cert.ceh': 'Certified Ethical Hacker',
    'cert.iso27001': 'Information Security Management',
    
    // Footer certified by
    'footer.certifiedby': 'Certified by:',
    
    // Footer company links
    'footer.aboutus': 'About Us',
    'footer.career': 'Career',
    'footer.privacy': 'Privacy Policy',
    
    // Contact page
    'contact.method.phone': 'Phone',
    'contact.method.email': 'Email',
    'contact.method.address': 'Address',
    'contact.method.hours': 'Working Hours',
    'contact.hours.description': 'Mon-Fri 8:00-18:00',
    'contact.email.description': 'We respond within 24h',
    'contact.address.description': 'Meetings by appointment',
    'contact.hours.value': 'Monday - Friday',
    'contact.hours.time': '8:00 - 18:00 CET',
    'contact.team.title': 'Expert Team',
    'contact.team.description': 'Certified specialists with years of experience',
    'contact.quality.title': 'Quality Guarantee',
    'contact.quality.description': 'International certificates and security standards',
    'contact.speed.title': 'Fast Implementation',
    'contact.speed.description': 'Flexible deadlines tailored to your needs',
    

    
    // Services page detailed features
    'services.detailed.cybersecurity.feature.0': 'Comprehensive IT security audits',
    'services.detailed.cybersecurity.feature.1': 'Professional penetration testing',
    'services.detailed.cybersecurity.feature.2': 'GDPR implementation',
    'services.detailed.cybersecurity.feature.3': '24/7 incident monitoring',
    'services.detailed.cybersecurity.feature.4': 'Threat and vulnerability analysis',
    'services.detailed.cybersecurity.feature.5': 'Expert consultations',
    'services.detailed.cybersecurity.benefit.0': 'Enhanced system security',
    'services.detailed.cybersecurity.benefit.1': 'Regulatory compliance',
    'services.detailed.cybersecurity.benefit.2': 'Minimized cyber attack risk',
    'services.detailed.cybersecurity.benefit.3': 'Professional technical support',
    
    'services.detailed.translations.feature.0': 'Technical IT translations',
    'services.detailed.translations.feature.1': 'Specialized documentation',
    'services.detailed.translations.feature.2': 'Software localization',
    'services.detailed.translations.feature.3': 'Certified translations',
    'services.detailed.translations.feature.4': 'Multilingual support',
    'services.detailed.translations.feature.5': 'Quality control',
    'services.detailed.translations.benefit.0': 'Terminological precision',
    'services.detailed.translations.benefit.1': 'Fast delivery times',
    'services.detailed.translations.benefit.2': 'Certified translators',
    'services.detailed.translations.benefit.3': 'Confidentiality guarantee',
    
    'services.detailed.training.feature.0': 'IT team training',
    'services.detailed.training.feature.1': 'Awareness trainings',
    'services.detailed.training.feature.2': 'Security certifications',
    'services.detailed.training.feature.3': 'Practical workshops',
    'services.detailed.training.feature.4': 'Remote and on-site training',
    'services.detailed.training.feature.5': 'Training materials',
    'services.detailed.training.benefit.0': 'Enhanced team competencies',
    'services.detailed.training.benefit.1': 'Practical approach',
    'services.detailed.training.benefit.2': 'Certified programs',
    'services.detailed.training.benefit.3': 'Customized to needs',
    
    'services.detailed.osint.feature.0': 'Threat analysis',
    'services.detailed.osint.feature.1': 'Online reputation monitoring',
    'services.detailed.osint.feature.2': 'Competitive intelligence',
    'services.detailed.osint.feature.3': 'Threat intelligence',
    'services.detailed.osint.feature.4': 'Social media monitoring',
    'services.detailed.osint.feature.5': 'Risk assessment',
    'services.detailed.osint.benefit.0': 'Early threat detection',
    'services.detailed.osint.benefit.1': 'Reputation protection',
    'services.detailed.osint.benefit.2': 'Competitive advantage',
    'services.detailed.osint.benefit.3': 'Informed decision making',
    
    'services.detailed.datarecovery.feature.0': 'Digital forensics',
    'services.detailed.datarecovery.feature.1': 'Disaster recovery',
    'services.detailed.datarecovery.feature.2': 'Incident analysis',
    'services.detailed.datarecovery.feature.3': 'Backup & recovery consulting',
    'services.detailed.datarecovery.feature.4': 'Data protection strategies',
    'services.detailed.datarecovery.feature.5': 'Emergency response',
    'services.detailed.datarecovery.benefit.0': 'Quick data recovery',
    'services.detailed.datarecovery.benefit.1': 'Minimized downtime',
    'services.detailed.datarecovery.benefit.2': 'Expert forensic analysis',
    'services.detailed.datarecovery.benefit.3': 'Prevention strategies',
    
    'services.detailed.features': 'Features',
    'services.detailed.benefits': 'Benefits',
    
    // Calendly booking
    'calendly.title': 'Zarezerwuj Konsultację',
    'calendly.description': 'Wybierz dogodny termin bezpłatnej konsultacji z naszymi ekspertami',
    'calendly.loading': 'Ładowanie kalendarza...',
    
    // Case Studies
    'cases.title': 'Nasze Realizacje',
    'cases.subtitle': 'Przekonaj się jak pomagamy klientom osiągnąć sukces w obszarze bezpieczeństwa IT',
    'cases.challenge': 'Wyzwanie',
    'cases.solution': 'Rozwiązanie',
    'cases.results': 'Rezultaty',
    'cases.cta': 'Skonsultuj podobny projekt',
    'cases.contact': 'Skontaktuj się z nami',
    
    'cases.study1.title': 'Wdrożenie RODO w korporacji',
    'cases.study1.category': 'Cyberbezpieczeństwo',
    'cases.study1.client': 'Międzynarodowa korporacja',
    'cases.study1.description': 'Kompleksowe wdrożenie RODO w 15 krajach dla firmy zatrudniającej 10,000+ osób',
    'cases.study1.challenge': 'Harmonizacja procesów ochrony danych w różnych jurysdykcjach',
    'cases.study1.solution': 'Audit, mapowanie danych, szkolenia i implementacja procedur compliance',
    'cases.study1.result1': '100% zgodność z RODO',
    'cases.study1.result2': 'Uniknięcie kar finansowych',
    'cases.study1.result3': 'Wzrost zaufania klientów o 40%',
    
    'cases.study2.title': 'Lokalizacja platformy fintech',
    'cases.study2.category': 'Tłumaczenia',
    'cases.study2.client': 'Startup fintech',
    'cases.study2.description': 'Tłumaczenie aplikacji mobilnej i dokumentacji prawnej na 8 języków',
    'cases.study2.challenge': 'Precyzyjne tłumaczenie terminologii finansowej i prawnej',
    'cases.study2.solution': 'Zespół specjalistów z doświadczeniem w sektorze finansowym',
    'cases.study2.result1': 'Ekspansja na 8 nowych rynków',
    'cases.study2.result2': 'Wzrost użytkowników o 300%',
    'cases.study2.result3': 'Redukcja kosztów prawnych o 60%',
    
    'cases.study3.title': 'Program awareness cybersecurity',
    'cases.study3.category': 'Szkolenia',
    'cases.study3.client': 'Instytucja finansowa',
    'cases.study3.description': 'Szkolenie 2000+ pracowników z zakresu bezpieczeństwa IT',
    'cases.study3.challenge': 'Podniesienie świadomości bezpieczeństwa w całej organizacji',
    'cases.study3.solution': 'Interaktywne warsztaty, symulacje phishingu i e-learning',
    'cases.study3.result1': 'Redukcja incydentów o 85%',
    'cases.study3.result2': 'Certyfikacja ISO 27001',
    'cases.study3.result3': 'Oszczędności 500,000 PLN rocznie',
    
    // Theme toggle
    'theme.light': 'Tryb jasny',
    'theme.dark': 'Tryb ciemny',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Common
    'common.back': 'Back',
    
    // Hero Section
    'hero.badge': 'Certified IT Security Experts',
    'hero.title': 'Cybersecurity at the Highest Level',
    'hero.subtitle': 'Professional IT services combining cybersecurity, specialized translations and training. Comprehensive support for businesses and individual clients.',
    'hero.cta.consultation': 'Free Consultation',
    'hero.cta.cases': 'View Case Studies',
    
    // Case Studies
    'cases.title': 'Our Case Studies',
    'cases.subtitle': 'See how we help clients achieve success in IT security',
    'cases.challenge': 'Challenge',
    'cases.solution': 'Solution',
    'cases.results': 'Results',
    'cases.cta': 'Consult similar project',
    'cases.contact': 'Contact us',
    
    'cases.study1.title': 'GDPR Implementation in Corporation',
    'cases.study1.category': 'Cybersecurity',
    'cases.study1.client': 'International Corporation',
    'cases.study1.description': 'Comprehensive GDPR implementation across 15 countries for a company with 10,000+ employees',
    'cases.study1.challenge': 'Harmonizing data protection processes across different jurisdictions',
    'cases.study1.solution': 'Audit, data mapping, training and compliance procedures implementation',
    'cases.study1.result1': '100% GDPR compliance',
    'cases.study1.result2': 'Avoided financial penalties',
    'cases.study1.result3': '40% increase in customer trust',
    
    'cases.study2.title': 'Fintech Platform Localization',
    'cases.study2.category': 'Translations',
    'cases.study2.client': 'Fintech Startup',
    'cases.study2.description': 'Mobile app and legal documentation translation into 8 languages',
    'cases.study2.challenge': 'Precise translation of financial and legal terminology',
    'cases.study2.solution': 'Team of specialists with financial sector experience',
    'cases.study2.result1': 'Expansion to 8 new markets',
    'cases.study2.result2': '300% user growth',
    'cases.study2.result3': '60% reduction in legal costs',
    
    'cases.study3.title': 'Cybersecurity Awareness Program',
    'cases.study3.category': 'Training',
    'cases.study3.client': 'Financial Institution',
    'cases.study3.description': 'Training 2000+ employees in IT security',
    'cases.study3.challenge': 'Raising security awareness across the entire organization',
    'cases.study3.solution': 'Interactive workshops, phishing simulations and e-learning',
    'cases.study3.result1': '85% reduction in incidents',
    'cases.study3.result2': 'ISO 27001 certification',
    'cases.study3.result3': '500,000 PLN annual savings',
    
    // Calendly booking
    'calendly.title': 'Schedule a Consultation',
    'calendly.description': 'Choose a convenient time for a free consultation with our experts',
    'calendly.loading': 'Loading calendar...',
    
    // Theme toggle
    'theme.light': 'Light mode',
    'theme.dark': 'Dark mode',
  },
  ua: {
    // Navigation
    'nav.home': 'Головна',
    'nav.services': 'Послуги',
    'nav.blog': 'Блог',
    'nav.contact': 'Контакти',
    
    // Common
    'common.back': 'Назад',
    
    // Hero Section
    'hero.badge': 'Сертифіковані експерти з ІТ-безпеки',
    'hero.title': 'Кібербезпека на найвищому рівні',
    'hero.subtitle': 'Професійні ІТ-послуги, що поєднують кібербезпеку, спеціалізовані переклади та навчання. Комплексна підтримка для бізнесу та індивідуальних клієнтів.',
    'hero.cta.consultation': 'Безкоштовна консультація',
    'hero.cta.cases': 'Переглянути кейси',
    
    // Services
    'services.title': 'Наші спеціалізації',
    'services.subtitle': 'Ми пропонуємо комплексні ІТ-рішення, адаптовані до потреб вашого бізнесу',
    'services.cybersecurity.title': 'Кібербезпека',
    'services.cybersecurity.description': 'Аудити безпеки, тести на проникнення, впровадження GDPR та моніторинг інцидентів.',
    'services.translations.title': 'Спеціалізовані переклади',
    'services.translations.description': 'Технічні ІТ-переклади, спеціалізована документація та локалізація програмного забезпечення.',
    'services.training.title': 'Навчання з безпеки',
    'services.training.description': 'Навчання ІТ-команд, тренінги з підвищення обізнаності та сертифікації з безпеки.',
    'services.osint.title': 'OSINT розвідка',
    'services.osint.description': 'Аналіз загроз, моніторинг онлайн-репутації та конкурентна розвідка.',
    'services.datarecovery.title': 'Відновлення даних',
    'services.datarecovery.description': 'Цифрова криміналістика, відновлення після аварій та аналіз інцидентів.',
    
    // Contact
    'contact.title': 'Зв\'яжіться з експертами',
    'contact.subtitle': 'Почніть співпрацю з ІТ-професіоналами. Безкоштовна консультація протягом 24 годин.',
    'contact.form.title': 'Надіслати запит',
    'contact.form.name': 'Повне ім\'я',
    'contact.form.email': 'Email',
    'contact.form.company': 'Компанія',
    'contact.form.phone': 'Телефон',
    'contact.form.service': 'Послуга',
    'contact.form.message': 'Повідомлення',
    'contact.form.submit': 'Надіслати запит',
    
    // Blog
    'blog.title': 'Останні публікації',
    'blog.subtitle': 'Експерти діляться знаннями про кібербезпеку',
    'blog.readmore': 'Читати далі',
    'blog.notFound': 'Пост не знайдено',
    'blog.viewall': 'Переглянути всі',
    'blog.search.placeholder': 'Пошук статей...',
    'blog.filter.all': 'Всі',
    'blog.noresults.title': 'Статей не знайдено',
    'blog.noresults.subtitle': 'Не знайдено статей за критеріями пошуку.',
    'blog.category.cybersecurity': 'Кібербезпека',
    'blog.category.translations': 'Переклади',
    'blog.category.training': 'Навчання',
    'blog.category.osint': 'OSINT',
    'blog.category.datarecovery': 'Відновлення Даних',
    
    // Footer
    'footer.description': 'Комплексні ІТ-послуги, що поєднують кібербезпеку, спеціалізовані переклади та навчання. Нам довіряють понад 500 компаній по всій Європі.',
    'footer.services': 'Послуги',
    'footer.company': 'Компанія',
    'footer.copyright': '© 2025 LongSec. Всі права захищено.',
    
    // Common buttons and labels
    'common.learnmore': 'Дізнатися більше',
    'common.needhelp': 'Потрібна Допомога?',
    'common.contactexperts': 'Зв\'яжіться з нашими експертами, щоб отримати безкоштовну консультацію, адаптовану до ваших потреб.',
    'common.schedule': 'Запланувати Консультацію',
    'common.certifications': 'Сертифікації та Компетенції',
    'common.certifications.subtitle': 'Наша команда має міжнародні сертифікати, що підтверджують найвищу якість послуг',
    'common.contactexpert': 'Зв\'язатися з експертом',
    'common.readytowork': 'Готові до співпраці?',
    'common.contactdiscuss': 'Зв\'яжіться з нами, щоб обговорити ваші потреби та отримати персоналізовану пропозицію.',
    'common.freeconsultation': 'Безкоштовна консультація',
    'common.ourprojects': 'Переглянути наші проекти',
    
    // Service features
    'features.cybersecurity.0': 'Аналіз загроз',
    'features.cybersecurity.1': 'Моніторинг онлайн-репутації',
    'features.cybersecurity.2': 'Конкурентна розвідка',
    'features.cybersecurity.3': 'Розвідка загроз',
    'features.translations.0': 'Технічні ІТ-переклади',
    'features.translations.1': 'Спеціалізована документація',
    'features.translations.2': 'Локалізація програмного забезпечення',
    'features.translations.3': 'Сертифіковані переклади',
    'features.training.0': 'Навчання ІТ-команд',
    'features.training.1': 'Тренінги з підвищення обізнаності',
    'features.training.2': 'Сертифікації з безпеки',
    'features.training.3': 'Практичні воркшопи',
    'features.osint.0': 'Аналіз загроз',
    'features.osint.1': 'Моніторинг онлайн-репутації',
    'features.osint.2': 'Конкурентна розвідка',
    'features.osint.3': 'Розвідка загроз',
    'features.datarecovery.0': 'Цифрова криміналістика',
    'features.datarecovery.1': 'Відновлення після аварій',
    'features.datarecovery.2': 'Аналіз інцидентів',
    'features.datarecovery.3': 'Консультації з резервного копіювання',
    
    // Testimonials
    'testimonials.title': 'Відгуки Клієнтів',
    'testimonials.subtitle': 'Подивіться, що говорять про нас наші задоволені клієнти',
    
    // Trust indicators
    'trust.projects': 'Проектів',
    'trust.clients': 'Задоволених клієнтів',
    'trust.experience': 'Років досвіду',
    
    // Certifications
    'cert.cissp': 'Сертифікований професіонал з безпеки інформаційних систем',
    'cert.cism': 'Сертифікований менеджер з інформаційної безпеки',
    'cert.ceh': 'Сертифікований етичний хакер',
    'cert.iso27001': 'Управління інформаційною безпекою',
    
    // Footer certified by
    'footer.certifiedby': 'Сертифіковано:',
    
    // Footer company links
    'footer.aboutus': 'Про нас',
    'footer.career': 'Кар\'єра',
    'footer.privacy': 'Політика конфіденційності',
    
    // Contact page
    'contact.method.phone': 'Телефон',
    'contact.method.email': 'Email',
    'contact.method.address': 'Адреса',
    'contact.method.hours': 'Години роботи',
    'contact.hours.description': 'Пн-Пт 8:00-18:00',
    'contact.email.description': 'Відповідаємо протягом 24 год',
    'contact.address.description': 'Зустрічі за домовленістю',
    'contact.hours.value': 'Понеділок - П\'ятниця',
    'contact.hours.time': '8:00 - 18:00 CET',
    'contact.team.title': 'Команда експертів',
    'contact.team.description': 'Сертифіковані спеціалісти з багаторічним досвідом',
    'contact.quality.title': 'Гарантія якості',
    'contact.quality.description': 'Міжнародні сертифікати та стандарти безпеки',
    'contact.speed.title': 'Швидка реалізація',
    'contact.speed.description': 'Гнучкі терміни, адаптовані до ваших потреб',
    

    
    // Services page detailed features
    'services.detailed.cybersecurity.feature.0': 'Комплексні аудити IT безпеки',
    'services.detailed.cybersecurity.feature.1': 'Професійне тестування на проникнення',
    'services.detailed.cybersecurity.feature.2': 'Впровадження GDPR',
    'services.detailed.cybersecurity.feature.3': 'Моніторинг інцидентів 24/7',
    'services.detailed.cybersecurity.feature.4': 'Аналіз загроз та вразливостей',
    'services.detailed.cybersecurity.feature.5': 'Консультації з експертами',
    'services.detailed.cybersecurity.benefit.0': 'Підвищення безпеки систем',
    'services.detailed.cybersecurity.benefit.1': 'Відповідність регуляціям',
    'services.detailed.cybersecurity.benefit.2': 'Мінімізація ризику кібератак',
    'services.detailed.cybersecurity.benefit.3': 'Професійна технічна підтримка',
    
    'services.detailed.translations.feature.0': 'Технічні переклади ІТ',
    'services.detailed.translations.feature.1': 'Спеціалізована документація',
    'services.detailed.translations.feature.2': 'Локалізація програмного забезпечення',
    'services.detailed.translations.feature.3': 'Засвідчені переклади',
    'services.detailed.translations.feature.4': 'Багатомовна підтримка',
    'services.detailed.translations.feature.5': 'Контроль якості',
    'services.detailed.translations.benefit.0': 'Термінологічна точність',
    'services.detailed.translations.benefit.1': 'Швидкі терміни виконання',
    'services.detailed.translations.benefit.2': 'Сертифіковані перекладачі',
    'services.detailed.translations.benefit.3': 'Гарантія конфіденційності',
    
    'services.detailed.training.feature.0': 'Навчання ІТ-команд',
    'services.detailed.training.feature.1': 'Інформаційні тренінги',
    'services.detailed.training.feature.2': 'Сертифікації безпеки',
    'services.detailed.training.feature.3': 'Практичні семінари',
    'services.detailed.training.feature.4': 'Дистанційне та очне навчання',
    'services.detailed.training.feature.5': 'Навчальні матеріали',
    'services.detailed.training.benefit.0': 'Підвищення кваліфікації команди',
    'services.detailed.training.benefit.1': 'Практичний підхід',
    'services.detailed.training.benefit.2': 'Сертифіковані програми',
    'services.detailed.training.benefit.3': 'Адаптація до потреб',
    
    'services.detailed.osint.feature.0': 'Аналіз загроз',
    'services.detailed.osint.feature.1': 'Моніторинг онлайн-репутації',
    'services.detailed.osint.feature.2': 'Конкурентна розвідка',
    'services.detailed.osint.feature.3': 'Аналіз розвідувальних загроз',
    'services.detailed.osint.feature.4': 'Моніторинг соціальних мереж',
    'services.detailed.osint.feature.5': 'Оцінка ризиків',
    'services.detailed.osint.benefit.0': 'Раннє виявлення загроз',
    'services.detailed.osint.benefit.1': 'Захист репутації',
    'services.detailed.osint.benefit.2': 'Конкурентна перевага',
    'services.detailed.osint.benefit.3': 'Свідоме прийняття рішень',
    
    'services.detailed.datarecovery.feature.0': 'Цифрова криміналістика',
    'services.detailed.datarecovery.feature.1': 'Відновлення після аварій',
    'services.detailed.datarecovery.feature.2': 'Аналіз інцидентів',
    'services.detailed.datarecovery.feature.3': 'Консалтинг backup & recovery',
    'services.detailed.datarecovery.feature.4': 'Стратегії захисту даних',
    'services.detailed.datarecovery.feature.5': 'Швидке аварійне реагування',
    'services.detailed.datarecovery.benefit.0': 'Швидке відновлення даних',
    'services.detailed.datarecovery.benefit.1': 'Мінімізація простоїв',
    'services.detailed.datarecovery.benefit.2': 'Експертний слідчий аналіз',
    'services.detailed.datarecovery.benefit.3': 'Стратегії запобігання',
    
    'services.detailed.features': 'Функції',
    'services.detailed.benefits': 'Переваги',
    
    // Calendly booking
    'calendly.title': 'Запланувати консультацію',
    'calendly.description': 'Оберіть зручний час для безкоштовної консультації з нашими експертами',
    'calendly.loading': 'Завантаження календаря...',
    
    // Theme toggle
    'theme.light': 'Світлий режим',
    'theme.dark': 'Темний режим',
  }
};

export function useTranslation(language: Language) {
  return {
    t: (key: string) => {
      try {
        const translation = translations[language]?.[key];
        if (translation) {
          return translation;
        }
        
        console.warn(`Translation key "${key}" not found for language "${language}"`);
        return key;
      } catch (error) {
        console.error('Translation error:', error);
        return key;
      }
    }
  };
}
