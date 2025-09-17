import React, { createContext, useContext, useState } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations = {
  en: {
    'site.title': 'TravelExplorer',
    'nav.home': 'Home',
    'nav.destinations': 'Destinations',
    'nav.hotels': 'Hotels',
    'nav.packages': 'Packages',
    'nav.wishlist': 'Wishlist',
    'nav.profile': 'Profile',
    'search.destination': 'Where do you want to go?',
    'search.checkin': 'Check-in',
    'search.checkout': 'Check-out',
    'search.guests': 'Guests',
    'search.button': 'Search',
    'hero.title': 'Discover Your Next Adventure',
    'hero.subtitle': 'Explore amazing destinations, book hotels, and create unforgettable memories',
    'filters.budget': 'Budget',
    'filters.rating': 'Rating',
    'filters.amenities': 'Amenities',
    'wishlist.add': 'Add to Wishlist',
    'wishlist.remove': 'Remove from Wishlist',
    'book.now': 'Book Now',
    'view.details': 'View Details',
  },
  hi: {
    'site.title': 'ट्रेवलएक्सप्लोरर',
    'nav.home': 'होम',
    'nav.destinations': 'गंतव्य',
    'nav.hotels': 'होटल',
    'nav.packages': 'पैकेज',
    'nav.wishlist': 'इच्छा सूची',
    'nav.profile': 'प्रोफाइल',
    'search.destination': 'आप कहाँ जाना चाहते हैं?',
    'search.checkin': 'चेक-इन',
    'search.checkout': 'चेक-आउट',
    'search.guests': 'मेहमान',
    'search.button': 'खोजें',
    'hero.title': 'अपने अगले एडवेंचर की खोज करें',
    'hero.subtitle': 'अद्भुत गंतव्यों का अन्वेषण करें, होटल बुक करें, और अविस्मरणीय यादें बनाएं',
    'filters.budget': 'बजट',
    'filters.rating': 'रेटिंग',
    'filters.amenities': 'सुविधाएं',
    'wishlist.add': 'इच्छा सूची में जोड़ें',
    'wishlist.remove': 'इच्छा सूची से हटाएं',
    'book.now': 'अभी बुक करें',
    'view.details': 'विवरण देखें',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}