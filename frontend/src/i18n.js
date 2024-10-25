import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: "en",
        fallbackLng: "en", // Use English as fallback language
        resources: {
            en: {
                translation: {
                    home: "Home",
                    jobs: "Jobs",
                    browse: "Browse",
                    login: "Login",
                    signup: "Signup",
                    viewProfile: "View Profile",
                    logout: "Logout",
                    loginTitle: "Login",
                    email: "Email",
                    password: "Password",
                    worker: "Worker",
                    recruiter: "Recruiter",
                    pleaseWait: "Please Wait",
                    signupPrompt: "Don't have an account?",
                    signupTitle: "Sign Up",
                    fullname: "Full Name",
                    fullnamePlaceholder: "Your Name",
                    emailPlaceholder: "example@gmail.com",
                    phoneNumber: "Phone Number",
                    phonePlaceholder: "+977-00000000",
                    passwordPlaceholder: "******",
                    profile: "Profile",
                    alreadyHaveAccount: "Already have an account?"
                }
            },
            ne: {
                translation: {
                    home: "गृहपृष्ठ",
                    jobs: "काम",
                    browse: "ब्राउज गर्नुहोस्",
                    login: "लगइन",
                    signup: "साइन अप गर्नुहोस्",
                    viewProfile: "प्रोफाइल हेर्नुहोस्",
                    logout: "लग आउट गर्नुहोस्",
                    loginTitle: "लगइन",
                    email: "इमेल",
                    password: "पासवर्ड",
                    worker: "कामदार",
                    recruiter: "भर्तीकर्ता",
                    pleaseWait: "कृपया पर्खनुहोस्",
                    signupPrompt: "खाता छैन?",
                    signupTitle: "साइन अप",
                    fullname: "पूर्ण नाम",
                    fullnamePlaceholder: "तिम्रो नाम",
                    phoneNumber: "फोन नम्बर",
                    phonePlaceholder: "+977-00000000",
                    passwordPlaceholder: "******",
                    profile: "प्रोफाइल",
                    alreadyHaveAccount: "पहिल्यै खाता छ?"
                }
            },
            hi: {
                translation: {
                    home: "होम",
                    jobs: "नौकरियां",
                    browse: "ब्राउज़ करें",
                    login: "लॉगिन",
                    signup: "साइन अप करें",
                    viewProfile: "प्रोफाइल देखें",
                    logout: "लॉगआउट",
                    loginTitle: "लॉगिन",
                    email: "ईमेल",
                    password: "पासवर्ड",
                    worker: "कर्मी",
                    recruiter: "भर्ती करने वाला",
                    pleaseWait: "कृपया प्रतीक्षा करें",
                    signupPrompt: "खाता नहीं है?",
                    signupTitle: "साइन अप",
                    fullname: "पूरा नाम",
                    fullnamePlaceholder: "आपका नाम",
                    phoneNumber: "फोन नंबर",
                    phonePlaceholder: "+977-00000000",
                    passwordPlaceholder: "******",
                    profile: "प्रोफाइल",
                    alreadyHaveAccount: "क्या आपके पास पहले से खाता है?"
                }
            }
        }
    });

export default i18next;
