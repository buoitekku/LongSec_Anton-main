import {useQuery} from "@tanstack/react-query";
import {getTranslationMap} from "@/lib/cms";

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
    'common.learnmore': 'Dowiedz się więcej',
    'common.needhelp': 'Potrzebujesz Pomocy?',
    'common.contactexperts': 'Kontakt z ekspertami',
    'common.schedule': 'Umów Konsultację',
    'common.certifications': 'Certyfikacje i Kompetencje',
    'common.certifications.subtitle': 'Nasz zespół posiada międzynarodowe certyfikaty potwierdzające najwyższą jakość usług',
    'common.readytowork': 'Gotowi do&nbsp;współpracy?',
    'common.contactdiscuss': 'Rozpocznij współpracę z&nbsp;profesjonalistami IT. Bezpłatna konsultacja w&nbsp;ciągu 24&nbsp;godzin.',
    'common.ourprojects': 'Nasze projekty',
    'common.contactexpert': 'Skontaktuj się z&nbsp;ekspertem',

    // Hero Section - B2B
    'hero.badge': 'Certyfikowani eksperci bezpieczeństwa IT',
    'hero.title.b2b': 'Zabezpiecz swoją firmę przed cyberatakami',
    'hero.subtitle.b2b': 'Kompleksowe rozwiązania cyberbezpieczeństwa dla przedsiębiorstw. Audyty, testy penetracyjne, compliance RODO i ochrona infrastruktury IT.',
    'hero.cta.consultation': 'Bezpłatna Konsultacja',
    'hero.cta.cases': 'Zobacz Case Studies',
    
    // Hero Section - B2C
    'hero.title.b2c': 'Chroń swoje dane osobowe i urządzenia',
    'hero.subtitle.b2c': 'Profesjonalne usługi bezpieczeństwa IT dla osób prywatnych. Ochrona komputerów, telefonów i danych osobowych przed cyberzagrożeniami.',
    
    // Services - B2B
    'services.title.b2b': 'Rozwiązania dla Twojej Firmy',
    'services.subtitle.b2b': 'Kompleksowe usługi IT zabezpieczające infrastrukturę korporacyjną',
    'services.cybersecurity.title': 'Cyberbezpieczeństwo',
    'services.cybersecurity.description.b2b': 'Audyty bezpieczeństwa infrastruktury, testy penetracyjne systemów, implementacja RODO i&nbsp;monitoring zagrożeń 24/7.',
    'services.translations.title': 'Tłumaczenia Specjalistyczne',
    'services.translations.description.b2b': 'Tłumaczenia dokumentacji technicznej, umów biznesowych i&nbsp;materiałów szkoleniowych dla&nbsp;firm.',
    'services.training.title': 'Szkolenia Bezpieczeństwa',
    'services.training.description.b2b': 'Szkolenia dla zespołów IT, programy awareness dla pracowników i&nbsp;certyfikacje branżowe.',
    'services.osint.title': 'Wywiad OSINT',
    'services.osint.description.b2b': 'Analiza zagrożeń konkurencyjnych, monitoring reputacji firmy i&nbsp;wywiad gospodarczy.',
    'services.datarecovery.title': 'Odzyskiwanie Danych',
    'services.datarecovery.description.b2b': 'Forensics cyfrowa, odzyskiwanie systemów po&nbsp;awariach i&nbsp;analiza incydentów bezpieczeństwa.',
    
    // Services - B2C
    'services.title.b2c': 'Usługi dla Klientów Indywidualnych',
    'services.subtitle.b2c': 'Profesjonalne wsparcie w zakresie bezpieczeństwa IT dla osób prywatnych',
    'services.features.title': 'Cechy',
    'services.cybersecurity.description.b2c': 'Zabezpieczenie komputerów domowych, ochrona przed wirusami i&nbsp;instalacja oprogramowania antywirusowego.',
    'services.translations.description.b2c': 'Tłumaczenia dokumentów osobistych, świadectw, dyplomów i&nbsp;dokumentów urzędowych.',
    'services.training.description.b2c': 'Indywidualne szkolenia z&nbsp;obsługi komputera, bezpiecznego korzystania z&nbsp;internetu i&nbsp;ochrony danych.',
    'services.osint.description.b2c': 'Monitoring reputacji osobistej w&nbsp;internecie, sprawdzanie obecności danych w&nbsp;sieci.',
    'services.datarecovery.description.b2c': 'Odzyskiwanie zdjęć, dokumentów i&nbsp;plików osobistych z&nbsp;uszkodzonych dysków i&nbsp;pamięci.',
    
    // Features
    'features.cybersecurity.0': 'Audyty bezpieczeństwa IT',
    'features.cybersecurity.1': 'Testy penetracyjne',
    'features.cybersecurity.2': 'Implementacja RODO',
    'features.cybersecurity.3': 'Monitoring 24/7',
    
    'features.translations.0': 'Tłumaczenia techniczne',
    'features.translations.1': 'Dokumentacja IT',
    'features.translations.2': 'Lokalizacja software',
    'features.translations.3': 'Terminologia prawna',
    
    'features.training.0': 'Szkolenia zespołów IT',
    'features.training.1': 'Awareness dla pracowników',
    'features.training.2': 'Certyfikacje bezpieczeństwa',
    'features.training.3': 'Symulacje ataków',
    
    'features.osint.0': 'Analiza zagrożeń',
    'features.osint.1': 'Monitoring reputacji',
    'features.osint.2': 'Wywiad konkurencyjny',
    'features.osint.3': 'Analiza mediów społecznościowych',
    
    'features.datarecovery.0': 'Forensics cyfrowa',
    'features.datarecovery.1': 'Odzyskiwanie po awariach',
    'features.datarecovery.2': 'Analiza incydentów',
    'features.datarecovery.3': 'Backup i&nbsp;archiwizacja',
    
    // Contact
    'contact.title': 'Skontaktuj się z Ekspertami',
    'contact.subtitle': 'Rozpocznij współpracę z&nbsp;profesjonalistami IT. Bezpłatna konsultacja w&nbsp;ciągu 24&nbsp;godzin.',
    'contact.form.title': 'Wyślij Zapytanie',
    'contact.form.name': 'Imię i nazwisko',
    'contact.form.email': 'Email',
    'contact.form.company': 'Firma',
    'contact.form.phone': 'Telefon',
    'contact.form.service': 'Usługa',
    'contact.form.message': 'Wiadomość',
    'contact.form.submit': 'Wyślij Zapytanie',
    'contact.method.phone': 'Telefon',
    'contact.method.email': 'Email',
    'contact.method.address': 'Adres',

    // Trust indicators
    'trust.projects': 'Projektów',
    'trust.clients': 'Zadowolonych klientów',
    'trust.experience': 'Lat doświadczenia',

    // Footer
    'footer.description': 'LongSec - Profesjonalne usługi IT i&nbsp;cyberbezpieczeństwa. Kompleksowe rozwiązania dla&nbsp;firm i&nbsp;klientów indywidualnych.',
    'footer.services': 'Usługi',
    'footer.company': 'Firma',
    'footer.aboutus': 'O nas',
    'footer.career': 'Kariera',
    'footer.privacy': 'Polityka prywatności',
    'footer.copyright': '© 2025 LongSec. Wszystkie prawa zastrzeżone.',
    'footer.certifiedby': 'Certyfikowani przez',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Najnowsze artykuły o&nbsp;cyberbezpieczeństwie i&nbsp;technologiach',
    'blog.viewall': 'Zobacz wszystkie',
    'blog.readmore': 'Czytaj więcej',

    // Case Studies
    'cases.title': 'Nasze Projekty',
    'cases.subtitle': 'Przykłady naszych realizacji',
    'cases.challenge': 'Wyzwanie',
    'cases.solution': 'Rozwiązanie',
    'cases.results': 'Rezultaty',
    'cases.cta': 'Potrzebujesz pomocy?',
    'cases.contact': 'Skontaktuj się z nami',

    // Testimonials
    'testimonials.title': 'Opinie Klientów',
    'testimonials.subtitle': 'Co mówią o&nbsp;nas nasi klienci',

    // Certifications
    'cert.cissp': 'CISSP - Certified Information Systems Security Professional',
    'cert.cism': 'CISM - Certified Information Security Manager',
    'cert.ceh': 'CEH - Certified Ethical Hacker',
    'cert.iso27001': 'ISO 27001 Lead Auditor',

    // Case Studies Details
    'cases.study1.title': 'Bezpieczeństwo Banku Regionalnego',
    'cases.study1.category': 'Cyberbezpieczeństwo',
    'cases.study1.client': 'Bank Regionalny SA',
    'cases.study1.description': 'Kompleksowa modernizacja systemów bezpieczeństwa dla&nbsp;instytucji finansowej',
    'cases.study1.challenge': 'Przestarzałe systemy bezpieczeństwa i&nbsp;brak zgodności z&nbsp;nowymi regulacjami',
    'cases.study1.solution': 'Implementacja nowoczesnego SOC, aktualizacja polityk bezpieczeństwa i&nbsp;szkolenia',
    'cases.study1.result1': '99.9% dostępności systemów',
    'cases.study1.result2': '80% redukcja incydentów bezpieczeństwa',
    'cases.study1.result3': 'Pełna zgodność z regulacjami',

    'cases.study2.title': 'Migracja IT dla Firmy Logistycznej',
    'cases.study2.category': 'Migracja IT',
    'cases.study2.client': 'LogiTrans Sp. z o.o.',
    'cases.study2.description': 'Bezpieczna migracja infrastruktury IT do&nbsp;chmury z&nbsp;zachowaniem ciągłości biznesu',
    'cases.study2.challenge': 'Przestarzała infrastruktura i&nbsp;potrzeba szybkiej modernizacji',
    'cases.study2.solution': 'Etapowa migracja do&nbsp;AWS z&nbsp;redundancją i&nbsp;backup',
    'cases.study2.result1': 'Zero przestojów podczas migracji',
    'cases.study2.result2': '50% redukcja kosztów IT',
    'cases.study2.result3': 'Zwiększona skalowalność systemów',

    'cases.study3.title': 'Odzyskiwanie Danych po Ransomware',
    'cases.study3.category': 'Odzyskiwanie Danych',
    'cases.study3.client': 'MedCenter Kliniki',
    'cases.study3.description': 'Szybkie odzyskanie krytycznych danych medycznych po&nbsp;ataku ransomware',
    'cases.study3.challenge': 'Zaszyfrowane dane pacjentów i&nbsp;konieczność szybkiego przywrócenia działania',
    'cases.study3.solution': 'Analiza kryminalistyczna, odzyskanie z&nbsp;kopii zapasowych i&nbsp;wzmocnienie zabezpieczeń',
    'cases.study3.result1': '100% odzyskanych danych',
    'cases.study3.result2': '24h czas przywrócenia działania',
    'cases.study3.result3': 'Nowe protokoły bezpieczeństwa',

    // Blog Categories
    'blog.category.cybersecurity': 'Cyberbezpieczeństwo',
    'blog.category.translations': 'Tłumaczenia',
    'blog.category.training': 'Szkolenia',
    'blog.category.osint': 'OSINT',
    'blog.category.datarecovery': 'Odzyskiwanie Danych',
    'blog.category.Cyberbezpieczeństwo': 'Cyberbezpieczeństwo',
    'blog.category.Tłumaczenia': 'Tłumaczenia',
    'blog.category.Szkolenia': 'Szkolenia',
    'blog.category.OSINT': 'OSINT',
    'blog.category.Data Recovery': 'Odzyskiwanie Danych',
    'blog.category.prefix': 'Kategoria:',
    'blog.search.placeholder': 'Szukaj artykułów...',
    'blog.filter.all': 'Wszystkie',

    // Contact Details
    'contact.methods.title': 'Sposoby kontaktu',
    'contact.methods.subtitle': 'Wybierz najwygodniejszy dla&nbsp;Ciebie sposób kontaktu z&nbsp;naszym zespołem',
    'contact.hours.description': 'Dostępni od&nbsp;poniedziałku do&nbsp;piątku',
    'contact.email.description': 'Odpowiadamy w&nbsp;ciągu 24&nbsp;godzin',
    'contact.address.description': 'Nasze biuro w&nbsp;centrum miasta',
    'contact.method.hours': 'Godziny pracy',
    'contact.hours.value': 'Pon - Pt',
    'contact.hours.time': '9:00 - 17:00',
    'contact.team.title': 'Doświadczony Zespół',
    'contact.team.description': 'Certyfikowani eksperci z&nbsp;wieloletnim doświadczeniem',
    'contact.quality.title': 'Najwyższa Jakość',
    'contact.quality.description': 'Gwarantujemy profesjonalne i&nbsp;terminowe wykonanie',
    'contact.speed.title': 'Szybka Realizacja',
    'contact.speed.description': 'Błyskawiczna reakcja na&nbsp;zgłoszenia i&nbsp;problemy',

    // Calendly
    'calendly.title': 'Umów spotkanie online',
    'calendly.description': 'Wybierz dogodny termin na&nbsp;bezpłatną konsultację',

    // Service Features
    'services.cybersecurity.features.audit': 'Audyty bezpieczeństwa systemów',
    'services.cybersecurity.features.monitoring': 'Monitorowanie zagrożeń 24/7',
    'services.cybersecurity.features.incident': 'Zarządzanie incydentami',
    'services.cybersecurity.features.compliance': 'Zgodność z&nbsp;GDPR i&nbsp;ISO',
    'services.cybersecurity.features.training': 'Szkolenia z&nbsp;bezpieczeństwa',
    'services.cybersecurity.features.consulting': 'Doradztwo w&nbsp;cyberbezpieczeństwie',

    'services.translations.features.technical': 'Dokumentacja techniczna',
    'services.translations.features.legal': 'Umowy i&nbsp;dokumenty prawne',
    'services.translations.features.medical': 'Tłumaczenia medyczne',
    'services.translations.features.business': 'Korespondencja biznesowa',
    'services.translations.features.certified': 'Tłumaczenia poświadczone',
    'services.translations.features.localization': 'Lokalizacja oprogramowania',

    'services.training.features.cybersecurity': 'Szkolenia z&nbsp;cyberbezpieczeństwa',
    'services.training.features.compliance': 'Szkolenia zgodności',
    'services.training.features.awareness': 'Świadomość bezpieczeństwa',
    'services.training.features.technical': 'Szkolenia techniczne',
    'services.training.features.custom': 'Szkolenia niestandardowe',
    'services.training.features.certification': 'Przygotowanie do&nbsp;certyfikacji',

    'services.osint.features.intelligence': 'Wywiad konkurencyjny',
    'services.osint.features.investigation': 'Dochodzenia cyfrowe',
    'services.osint.features.monitoring': 'Monitorowanie reputacji',
    'services.osint.features.analysis': 'Analiza zagrożeń',
    'services.osint.features.reporting': 'Raporty wywiadowcze',
    'services.osint.features.consulting': 'Doradztwo OSINT',

    'services.datarecovery.features.hdd': 'Odzyskiwanie z&nbsp;dysków HDD',
    'services.datarecovery.features.ssd': 'Odzyskiwanie z&nbsp;dysków SSD',
    'services.datarecovery.features.raid': 'Odzyskiwanie z&nbsp;macierzy RAID',
    'services.datarecovery.features.mobile': 'Odzyskiwanie z&nbsp;urządzeń mobilnych',
    'services.datarecovery.features.forensics': 'Kryminalistyka cyfrowa',
    'services.datarecovery.features.emergency': 'Odzyskiwanie awaryjne',

    // Blog
    'blog.loading': 'Ładowanie artykułów...',
    'blog.noresults.title': 'Brak wyników',
    'blog.noresults.subtitle': 'Spróbuj zmienić wyszukiwane hasło lub&nbsp;kategorię'
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Common
    'common.back': 'Back',
    'common.learnmore': 'Learn more',
    'common.needhelp': 'Need Help?',
    'common.contactexperts': 'Contact our experts to get a free consultation tailored to your needs.',
    'common.schedule': 'Schedule Consultation',
    'common.certifications': 'Certifications and Competencies',
    'common.certifications.subtitle': 'Our team holds international certifications ensuring the highest quality of services',
    'common.readytowork': 'Ready to&nbsp;Collaborate?',
    'common.contactdiscuss': 'Contact us to&nbsp;discuss your needs and receive a&nbsp;personalized offer.',
    'common.ourprojects': 'View Our Projects',
    'common.contactexpert': 'Contact Expert',

    // Hero Section - B2B
    'hero.badge': 'Certified IT Security Experts',
    'hero.title.b2b': 'Secure Your Business From Cyber Threats',
    'hero.subtitle.b2b': 'Comprehensive cybersecurity solutions for enterprises. Security audits, penetration testing, GDPR compliance and IT infrastructure protection.',
    'hero.cta.consultation': 'Free Consultation',
    'hero.cta.cases': 'View Case Studies',
    
    // Hero Section - B2C
    'hero.title.b2c': 'Protect Your Personal Data and Devices',
    'hero.subtitle.b2c': 'Professional IT security services for individuals. Computer protection, phone security and personal data protection from cyber threats.',
    
    // Services - B2B
    'services.title.b2b': 'Business Solutions',
    'services.subtitle.b2b': 'Comprehensive IT services securing corporate infrastructure',
    'services.cybersecurity.title': 'Cybersecurity',
    'services.cybersecurity.description.b2b': 'Infrastructure security audits, system penetration testing, GDPR implementation and 24/7 threat monitoring.',
    'services.translations.title': 'Specialized Translations',
    'services.translations.description.b2b': 'Technical documentation translation, business contracts and training materials for companies.',
    'services.training.title': 'Security Training',
    'services.training.description.b2b': 'IT team training, employee awareness programs and industry certifications.',
    'services.osint.title': 'OSINT Intelligence',
    'services.osint.description.b2b': 'Competitive threat analysis, company reputation monitoring and business intelligence.',
    'services.datarecovery.title': 'Data Recovery',
    'services.datarecovery.description.b2b': 'Digital forensics, system recovery after failures and security incident analysis.',
    
    // Services - B2C
    'services.title.b2c': 'Individual Services',
    'services.subtitle.b2c': 'Professional IT security support for private clients',
    'services.features.title': 'Features',
    'services.cybersecurity.description.b2c': 'Home computer security, virus protection and antivirus software installation.',
    'services.translations.description.b2c': 'Personal document translation, certificates, diplomas and official documents.',
    'services.training.description.b2c': 'Individual computer training, safe internet use and data protection.',
    'services.osint.description.b2c': 'Personal reputation monitoring online, checking data presence on the web.',
    'services.datarecovery.description.b2c': 'Recovery of photos, documents and personal files from damaged drives and memory.',
    
    // Features
    'features.cybersecurity.0': 'IT security audits',
    'features.cybersecurity.1': 'Penetration testing',
    'features.cybersecurity.2': 'GDPR implementation',
    'features.cybersecurity.3': '24/7 monitoring',
    
    'features.translations.0': 'Technical translations',
    'features.translations.1': 'IT documentation',
    'features.translations.2': 'Software localization',
    'features.translations.3': 'Legal terminology',
    
    'features.training.0': 'IT team training',
    'features.training.1': 'Employee awareness',
    'features.training.2': 'Security certifications',
    'features.training.3': 'Attack simulations',
    
    'features.osint.0': 'Threat analysis',
    'features.osint.1': 'Reputation monitoring',
    'features.osint.2': 'Competitive intelligence',
    'features.osint.3': 'Social media analysis',
    
    'features.datarecovery.0': 'Digital forensics',
    'features.datarecovery.1': 'Disaster recovery',
    'features.datarecovery.2': 'Incident analysis',
    'features.datarecovery.3': 'Backup and archiving',
    
    // Contact
    'contact.title': 'Contact Experts',
    'contact.subtitle': 'Start working with IT professionals. Free consultation within 24 hours.',
    'contact.form.title': 'Send Inquiry',
    'contact.form.name': 'Full name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Company',
    'contact.form.phone': 'Phone',
    'contact.form.service': 'Service',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Inquiry',
    'contact.method.phone': 'Phone',
    'contact.method.email': 'Email',
    'contact.method.address': 'Address',

    // Trust indicators
    'trust.projects': 'Projects',
    'trust.clients': 'Satisfied clients',
    'trust.experience': 'Years of experience',

    // Footer
    'footer.description': 'LongSec - Professional IT and cybersecurity services. Comprehensive solutions for businesses and individual clients.',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.aboutus': 'About us',
    'footer.career': 'Career',
    'footer.privacy': 'Privacy policy',
    'footer.copyright': '© 2025 LongSec. All rights reserved.',
    'footer.certifiedby': 'Certified by',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Latest articles on cybersecurity and technology',
    'blog.viewall': 'View all',
    'blog.readmore': 'Read more',

    // Case Studies
    'cases.title': 'Our Projects',
    'cases.subtitle': 'Examples of our implementations',
    'cases.challenge': 'Challenge',
    'cases.solution': 'Solution',
    'cases.results': 'Results',
    'cases.cta': 'Need help?',
    'cases.contact': 'Contact us',

    // Testimonials
    'testimonials.title': 'Client Reviews',
    'testimonials.subtitle': 'What our clients say about us',

    // Certifications
    'cert.cissp': 'CISSP - Certified Information Systems Security Professional',
    'cert.cism': 'CISM - Certified Information Security Manager',
    'cert.ceh': 'CEH - Certified Ethical Hacker',
    'cert.iso27001': 'ISO 27001 Lead Auditor',

    // Case Studies Details
    'cases.study1.title': 'Regional Bank Security',
    'cases.study1.category': 'Cybersecurity',
    'cases.study1.client': 'Regional Bank SA',
    'cases.study1.description': 'Comprehensive security systems modernization for financial institution',
    'cases.study1.challenge': 'Outdated security systems and lack of compliance with new regulations',
    'cases.study1.solution': 'Modern SOC implementation, security policy updates and training',
    'cases.study1.result1': '99.9% system availability',
    'cases.study1.result2': '80% reduction in security incidents',
    'cases.study1.result3': 'Full regulatory compliance',

    'cases.study2.title': 'IT Migration for Logistics Company',
    'cases.study2.category': 'IT Migration',
    'cases.study2.client': 'LogiTrans Ltd.',
    'cases.study2.description': 'Secure IT infrastructure migration to cloud while maintaining business continuity',
    'cases.study2.challenge': 'Legacy infrastructure and need for rapid modernization',
    'cases.study2.solution': 'Phased migration to AWS with redundancy and backup',
    'cases.study2.result1': 'Zero downtime during migration',
    'cases.study2.result2': '50% reduction in IT costs',
    'cases.study2.result3': 'Increased system scalability',

    'cases.study3.title': 'Data Recovery after Ransomware',
    'cases.study3.category': 'Data Recovery',
    'cases.study3.client': 'MedCenter Clinics',
    'cases.study3.description': 'Rapid recovery of critical medical data after ransomware attack',
    'cases.study3.challenge': 'Encrypted patient data and need for quick restoration',
    'cases.study3.solution': 'Digital forensics analysis, recovery from secure backups and security enhancement',
    'cases.study3.result1': '100% data recovery',
    'cases.study3.result2': '24h restoration time',
    'cases.study3.result3': 'New security protocols',

    // Blog Categories
    'blog.category.cybersecurity': 'Cybersecurity',
    'blog.category.translations': 'Translations',
    'blog.category.training': 'Training',
    'blog.category.osint': 'OSINT',
    'blog.category.datarecovery': 'Data Recovery',
    'blog.category.Cyberbezpieczeństwo': 'Cybersecurity',
    'blog.category.Tłumaczenia': 'Translations',
    'blog.category.Szkolenia': 'Training',
    'blog.category.OSINT': 'OSINT',
    'blog.category.Data Recovery': 'Data Recovery',
    'blog.category.prefix': 'Category:',
    'blog.search.placeholder': 'Search articles...',
    'blog.filter.all': 'All',

    // Contact Details
    'contact.methods.title': 'Contact Methods',
    'contact.methods.subtitle': 'Choose the most convenient way to contact our team',
    'contact.hours.description': 'Available Monday to Friday',
    'contact.email.description': 'We respond within 24 hours',
    'contact.address.description': 'Our office in the city center',
    'contact.method.hours': 'Business Hours',
    'contact.hours.value': 'Mon - Fri',
    'contact.hours.time': '9:00 AM - 5:00 PM',
    'contact.team.title': 'Experienced Team',
    'contact.team.description': 'Certified experts with years of experience',
    'contact.quality.title': 'Highest Quality',
    'contact.quality.description': 'We guarantee professional and timely execution',
    'contact.speed.title': 'Fast Delivery',
    'contact.speed.description': 'Lightning-fast response to requests and issues',

    // Calendly
    'calendly.title': 'Schedule online meeting',
    'calendly.description': 'Choose a convenient time for a free consultation'
  },
  
  ua: {
    // Navigation
    'nav.home': 'Головна',
    'nav.services': 'Послуги',
    'nav.blog': 'Блог',
    'nav.contact': 'Контакти',
    
    // Common
    'common.back': 'Назад',
    'common.learnmore': 'Дізнатися більше',
    'common.needhelp': 'Потрібна допомога?',
    'common.contactexperts': 'Зв\'яжіться з нашими експертами, щоб отримати безкоштовну консультацію, адаптовану до ваших потреб.',
    'common.schedule': 'Записатися на консультацію',
    'common.certifications': 'Сертифікації та компетенції',
    'common.certifications.subtitle': 'Наша команда має міжнародні сертифікати, що забезпечують найвищу якість послуг',
    'common.readytowork': 'Готові до&nbsp;співпраці?',
    'common.contactdiscuss': 'Зв\'яжіться з нами, щоб обговорити ваші потреби та отримати персоналізовану пропозицію.',
    'common.ourprojects': 'Переглянути наші проекти',
    'common.contactexpert': 'Зв\'язатися з експертом',

    // Hero Section - B2B
    'hero.badge': 'Сертифіковані експерти з ІТ-безпеки',
    'hero.title.b2b': 'Захистіть свій бізнес від кіберзагроз',
    'hero.subtitle.b2b': 'Комплексні рішення кібербезпеки для підприємств. Аудити безпеки, тести на проникнення, відповідність GDPR та захист ІТ-інфраструктури.',
    'hero.cta.consultation': 'Безкоштовна консультація',
    'hero.cta.cases': 'Переглянути кейси',
    
    // Hero Section - B2C
    'hero.title.b2c': 'Захистіть свої особисті дані та пристрої',
    'hero.subtitle.b2c': 'Професійні послуги ІТ-безпеки для фізичних осіб. Захист комп\'ютерів, телефонів та особистих даних від кіберзагроз.',
    
    // Services - B2B
    'services.title.b2b': 'Бізнес-рішення',
    'services.subtitle.b2b': 'Комплексні ІТ-послуги для захисту корпоративної інфраструктури',
    'services.cybersecurity.title': 'Кібербезпека',
    'services.cybersecurity.description.b2b': 'Аудити безпеки інфраструктури, тести на проникнення систем, впровадження GDPR та моніторинг загроз 24/7.',
    'services.translations.title': 'Спеціалізовані переклади',
    'services.translations.description.b2b': 'Переклади технічної документації, бізнес-контрактів та навчальних матеріалів для компаній.',
    'services.training.title': 'Навчання з безпеки',
    'services.training.description.b2b': 'Навчання ІТ-команд, програми обізнаності для співробітників та галузеві сертифікації.',
    'services.osint.title': 'Розвідка OSINT',
    'services.osint.description.b2b': 'Аналіз конкурентних загроз, моніторинг репутації компанії та бізнес-розвідка.',
    'services.datarecovery.title': 'Відновлення даних',
    'services.datarecovery.description.b2b': 'Цифрова криміналістика, відновлення систем після збоїв та аналіз інцидентів безпеки.',
    
    // Services - B2C
    'services.title.b2c': 'Індивідуальні послуги',
    'services.subtitle.b2c': 'Професійна підтримка ІТ-безпеки для приватних клієнтів',
    'services.features.title': 'Особливості',
    'services.cybersecurity.description.b2c': 'Захист домашніх комп\'ютерів, захист від вірусів та встановлення антивірусного програмного забезпечення.',
    'services.translations.description.b2c': 'Переклади особистих документів, сертифікатів, дипломів та офіційних документів.',
    'services.training.description.b2c': 'Індивідуальне навчання роботи з комп\'ютером, безпечне користування інтернетом та захист даних.',
    'services.osint.description.b2c': 'Моніторинг особистої репутації в інтернеті, перевірка наявності даних у мережі.',
    'services.datarecovery.description.b2c': 'Відновлення фотографій, документів та особистих файлів з пошкоджених дисків та пам\'яті.',
    
    // Features
    'features.cybersecurity.0': 'Аудити ІТ-безпеки',
    'features.cybersecurity.1': 'Тести на проникнення',
    'features.cybersecurity.2': 'Впровадження GDPR',
    'features.cybersecurity.3': 'Моніторинг 24/7',
    
    'features.translations.0': 'Технічні переклади',
    'features.translations.1': 'ІТ-документація',
    'features.translations.2': 'Локалізація ПЗ',
    'features.translations.3': 'Правова термінологія',
    
    'features.training.0': 'Навчання ІТ-команд',
    'features.training.1': 'Обізнаність співробітників',
    'features.training.2': 'Сертифікації безпеки',
    'features.training.3': 'Симуляції атак',
    
    'features.osint.0': 'Аналіз загроз',
    'features.osint.1': 'Моніторинг репутації',
    'features.osint.2': 'Конкурентна розвідка',
    'features.osint.3': 'Аналіз соцмереж',
    
    'features.datarecovery.0': 'Цифрова криміналістика',
    'features.datarecovery.1': 'Відновлення після аварій',
    'features.datarecovery.2': 'Аналіз інцидентів',
    'features.datarecovery.3': 'Резервування та архівування',
    
    // Contact
    'contact.title': 'Зв\'яжіться з експертами',
    'contact.subtitle': 'Почніть працювати з ІТ-професіоналами. Безкоштовна консультація протягом 24 годин.',
    'contact.form.title': 'Надіслати запит',
    'contact.form.name': 'Повне ім\'я',
    'contact.form.email': 'Електронна пошта',
    'contact.form.company': 'Компанія',
    'contact.form.phone': 'Телефон',
    'contact.form.service': 'Послуга',
    'contact.form.message': 'Повідомлення',
    'contact.form.submit': 'Надіслати запит',
    'contact.method.phone': 'Телефон',
    'contact.method.email': 'Електронна пошта',
    'contact.method.address': 'Адреса',

    // Trust indicators
    'trust.projects': 'Проектів',
    'trust.clients': 'Задоволених клієнтів',
    'trust.experience': 'Років досвіду',

    // Footer
    'footer.description': 'LongSec - Професійні ІТ-послуги та кібербезпека. Комплексні рішення для бізнесу та приватних клієнтів.',
    'footer.services': 'Послуги',
    'footer.company': 'Компанія',
    'footer.aboutus': 'Про нас',
    'footer.career': 'Кар\'єра',
    'footer.privacy': 'Політика конфіденційності',
    'footer.copyright': '© 2025 LongSec. Усі права захищені.',
    'footer.certifiedby': 'Сертифіковано',

    // Blog
    'blog.title': 'Блог',
    'blog.subtitle': 'Останні статті про кібербезпеку та технології',
    'blog.viewall': 'Переглянути всі',
    'blog.readmore': 'Читати далі',

    // Case Studies
    'cases.title': 'Наші проекти',
    'cases.subtitle': 'Приклади наших реалізацій',
    'cases.challenge': 'Виклик',
    'cases.solution': 'Рішення',
    'cases.results': 'Результати',
    'cases.cta': 'Потрібна допомога?',
    'cases.contact': 'Зв\'яжіться з нами',

    // Testimonials
    'testimonials.title': 'Відгуки клієнтів',
    'testimonials.subtitle': 'Що говорять про нас наші клієнти',

    // Certifications
    'cert.cissp': 'CISSP - Certified Information Systems Security Professional',
    'cert.cism': 'CISM - Certified Information Security Manager',
    'cert.ceh': 'CEH - Certified Ethical Hacker',
    'cert.iso27001': 'ISO 27001 Lead Auditor',

    // Case Studies Details
    'cases.study1.title': 'Безпека регіонального банку',
    'cases.study1.category': 'Кібербезпека',
    'cases.study1.client': 'Регіональний банк SA',
    'cases.study1.description': 'Комплексна модернізація систем безпеки для фінансової установи',
    'cases.study1.challenge': 'Застарілі системи безпеки та відсутність відповідності новим регламентам',
    'cases.study1.solution': 'Впровадження сучасного SOC, оновлення політик безпеки та навчання',
    'cases.study1.result1': '99.9% доступності систем',
    'cases.study1.result2': '80% зниження інцидентів безпеки',
    'cases.study1.result3': 'Повна відповідність регламентам',

    'cases.study2.title': 'ІТ-міграція для логістичної компанії',
    'cases.study2.category': 'ІТ-міграція',
    'cases.study2.client': 'LogiTrans Ltd.',
    'cases.study2.description': 'Безпечна міграція ІТ-інфраструктури в хмару зі збереженням безперервності бізнесу',
    'cases.study2.challenge': 'Застаріла інфраструктура та потреба в швидкій модернізації',
    'cases.study2.solution': 'Етапна міграція в AWS з резервуванням та резервним копіюванням',
    'cases.study2.result1': 'Нулевий простій під час міграції',
    'cases.study2.result2': '50% зниження ІТ-витрат',
    'cases.study2.result3': 'Збільшена масштабованість систем',

    'cases.study3.title': 'Відновлення даних після ransomware',
    'cases.study3.category': 'Відновлення даних',
    'cases.study3.client': 'MedCenter Клініки',
    'cases.study3.description': 'Швидке відновлення критичних медичних даних після атаки ransomware',
    'cases.study3.challenge': 'Зашифровані дані пацієнтів та необхідність швидкого відновлення',
    'cases.study3.solution': 'Аналіз цифрової криміналістики, відновлення з захищених резервних копій та посилення безпеки',
    'cases.study3.result1': '100% відновлених даних',
    'cases.study3.result2': '24г час відновлення',
    'cases.study3.result3': 'Нові протоколи безпеки',

    // Blog Categories
    'blog.category.cybersecurity': 'Кібербезпека',
    'blog.category.translations': 'Переклади',
    'blog.category.training': 'Навчання',
    'blog.category.osint': 'OSINT',
    'blog.category.datarecovery': 'Відновлення даних',
    'blog.category.Cyberbezpieczeństwo': 'Кібербезпека',
    'blog.category.Tłumaczenia': 'Переклади',
    'blog.category.Szkolenia': 'Навчання',
    'blog.category.OSINT': 'OSINT',
    'blog.category.Data Recovery': 'Відновлення даних',
    'blog.category.prefix': 'Категорія:',
    'blog.search.placeholder': 'Пошук статей...',
    'blog.filter.all': 'Усі',

    // Contact Details
    'contact.methods.title': 'Способи зв\'язку',
    'contact.methods.subtitle': 'Оберіть найзручніший для вас спосіб зв\'язку з нашою командою',
    'contact.hours.description': 'Доступні з понеділка по п\'ятницю',
    'contact.email.description': 'Відповідаємо протягом 24 годин',
    'contact.address.description': 'Наш офіс у центрі міста',
    'contact.method.hours': 'Робочі години',
    'contact.hours.value': 'Пн - Пт',
    'contact.hours.time': '9:00 - 17:00',
    'contact.team.title': 'Досвідчена команда',
    'contact.team.description': 'Сертифіковані експерти з багаторічним досвідом',
    'contact.quality.title': 'Найвища якість',
    'contact.quality.description': 'Гарантуємо професійне та своєчасне виконання',
    'contact.speed.title': 'Швидка реалізація',
    'contact.speed.description': 'Блискавична реакція на звернення та проблеми',

    // Calendly
    'calendly.title': 'Записатися на онлайн-зустріч',
    'calendly.description': 'Оберіть зручний час для безкоштовної консультації',

    // Service Features
    'services.cybersecurity.features.audit': 'Аудити безпеки систем',
    'services.cybersecurity.features.monitoring': 'Моніторинг загроз 24/7',
    'services.cybersecurity.features.incident': 'Управління інцидентами',
    'services.cybersecurity.features.compliance': 'Відповідність GDPR та ISO',
    'services.cybersecurity.features.training': 'Навчання з безпеки',
    'services.cybersecurity.features.consulting': 'Консалтинг з кібербезпеки',

    'services.translations.features.technical': 'Технічна документація',
    'services.translations.features.legal': 'Контракти та правові документи',
    'services.translations.features.medical': 'Медичні переклади',
    'services.translations.features.business': 'Бізнес-кореспонденція',
    'services.translations.features.certified': 'Засвідчені переклади',
    'services.translations.features.localization': 'Локалізація програмного забезпечення',

    'services.training.features.cybersecurity': 'Навчання з кібербезпеки',
    'services.training.features.compliance': 'Навчання відповідності',
    'services.training.features.awareness': 'Обізнаність безпеки',
    'services.training.features.technical': 'Технічне навчання',
    'services.training.features.custom': 'Індивідуальне навчання',
    'services.training.features.certification': 'Підготовка до сертифікації',

    'services.osint.features.intelligence': 'Конкурентна розвідка',
    'services.osint.features.investigation': 'Цифрові розслідування',
    'services.osint.features.monitoring': 'Моніторинг репутації',
    'services.osint.features.analysis': 'Аналіз загроз',
    'services.osint.features.reporting': 'Розвідувальні звіти',
    'services.osint.features.consulting': 'OSINT консалтинг',

    'services.datarecovery.features.hdd': 'Відновлення з HDD дисків',
    'services.datarecovery.features.ssd': 'Відновлення з SSD дисків',
    'services.datarecovery.features.raid': 'Відновлення з RAID масивів',
    'services.datarecovery.features.mobile': 'Відновлення з мобільних пристроїв',
    'services.datarecovery.features.forensics': 'Цифрова криміналістика',
    'services.datarecovery.features.emergency': 'Аварійне відновлення',

    // Blog
    'blog.loading': 'Завантаження статей...',
    'blog.noresults.title': 'Немає результатів',
    'blog.noresults.subtitle': 'Спробуйте змінити пошуковий запит або категорію'
  }
};

export function useTranslation(language: Language) {
  const {
    data: cmsTranslations,
    isPending: isCmsTranslationsPending,
  } = useQuery<Record<string, string>>({
    queryKey: ["/api/cms/translations", language],
    queryFn: () => getTranslationMap(language),
  });

  const resolveTranslation = (key: string): string | undefined => {
    const cmsValue = cmsTranslations?.[key];
    if (cmsValue !== undefined && cmsValue !== null && cmsValue !== "") {
      return cmsValue;
    }

    // Avoid showing legacy fallback copy before CMS values load to prevent
    // a visible "old text -> new text" flash on refresh.
    if (isCmsTranslationsPending && !cmsTranslations) {
      return undefined;
    }

    return (translations[language] as any)?.[key];
  };

  return {
    t: (key: string) => {
      try {
        const translation = resolveTranslation(key);
        if (translation) {
          return translation;
        }

        if (isCmsTranslationsPending && !cmsTranslations) {
          return "";
        }
        
        console.warn(`Translation key "${key}" not found for language "${language}"`);
        return key;
      } catch (error) {
        console.error('Translation error:', error);
        return key;
      }
    },
    th: (key: string) => {
      try {
        const translation = resolveTranslation(key);
        if (translation) {
          return { __html: translation };
        }

        if (isCmsTranslationsPending && !cmsTranslations) {
          return { __html: "" };
        }
        
        console.warn(`Translation key "${key}" not found for language "${language}"`);
        return { __html: key };
      } catch (error) {
        console.error('Translation error:', error);
        return { __html: key };
      }
    }
  };
}
