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
                    unknownService: "Unknown Service",
                    nepal: "Nepal",
                    noTitle: "No Title",
                    noDescriptio: "No description available.",
                    positions: "Positions",
                    unknownType: "Unknown Type",
                    filterJobs: "Filter Jobs",
                    jobType: "Job Type",
                    salary: "Salary",
                    babySitterService: "Baby Sitter Service",
                    nurseMidwife: "Nurse Midwife",
                    officeMaidServic: "Office Maid Service",
                    mentalHealthNurse: "Mental Health Nurse",
                    oncologyNurse: "Oncology Nurse",
                    houseMaid: "House Maid",
                    caretaker: "Caretaker",
                    "0-10k": "0-10k",
                    "10-25k": "10-25k",
                    "25-40k": "25-40k",
                    "40-75k": "40-75k",
                    "75-1lakh": "75k-1 Lakh",
                    forgotPasswordTitle: "Forgot Password?",
                    home: "Home",
                    companies: "Companies",
                    jobs: "Jobs",
                    enterYourEmail: "Enter your Email",
                    send: "Send",
                    newPassword: "New Password",
                    enterNewPassword: "Enter New Password",
                    confirmPassword: "Confirm Password",
                    updatePassword: "Update Password",
                    browse: "Browse",
                    login: "Login",
                    dashboard: "Dashboard",
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
                    alreadyHaveAccount: "Already have an account?",
                    elevateProfessionalJourney: "Elevate your professional journey",
                    ultimateSolution: "Ultimate solution for finding nurses and maid",
                    getAFullTime: "Get a Full-time",
                    maid: "Maid",
                    orProfessional: "or Professional",
                    nurse: "Nurse",
                    onlineIn5: "Online in 5 minutes. Cancel anytime",
                    findTheMaidOrNurses: "Find the maid or nurses",
                    whyChooseUs: "Why Choose Us?",
                    trustSafety: "Trust and Safety",
                    description: "How our HR team verifies Maids and Nurses at Sarathi. Our dedicated team works behind the scenes every day,\nuploading only genuine applicants to ensure the highest standards of \n Trust and Safety.",
                    backgroundChecks: "Background Checks",
                    documentVerification: "Document Verification",
                    identityVerification: "Identity Verification",
                    thoroughInterviews: "Thorough Interviews",
                    hrUploadCv: "HR team upload sorted CVs",
                    aboutUs: "About Us",
                    faq: "FAQ",
                    professionalStaff: "Professional Staff",
                    nursesAndMaids: "Nurses and Maids",
                    age: "Age",
                    job: "Job",
                    title: "Online Maid Service",
                    saveTime: "Save Time: Let us handle the chores while you focus on what matters most.",
                    professionalCleaning: "Professional Cleaning: Enjoy a spotless home with expert housekeeping.",
                    convenientBooking: "Convenient Booking: Book your trusted maid in just a few clicks.",
                    stressFreeLiving: "Stress-Free Living: Say goodbye to cleaning worries and relax.",
                    dailySupport: "Daily Support: Reliable and efficient help for your everyday needs.",
                    cta: "Book Now",
                    latest: "Latest",
                    Jobs: "Jobs",
                    noJobsAvailable: "No Job Available",
                    "questions": {
                        "tadbeer": "What is Sarathi?",
                        "appUse": "What services does Sarathi provide?",
                        "advantages": "What are the benefits of using Sarathi services?",
                        "sponsorship": "Can I hire a nurse or domestic worker permanently?",
                        "areasServed": "Which areas does Sarathi serve?",
                        "documents": "What documents are required to use Sarathi services?",
                        "emergency": "Does Sarathi provide emergency nursing services?",
                        "cost": "What are the charges for Sarathi services?",
                        "payment": "How can I make payments?",
                        "quality": "How does Sarathi ensure the quality of its services?",
                        "dissatisfaction": "What happens if I’m not satisfied with the service?",
                        "employeeSelection": "How does Sarathi select nurses and domestic workers?"
                    },
                    "answers": {
                        tadbeer: "Sarathi is a professional system that provides nurses and domestic workers for various needs.",
                        appUse: "Sarathi provides nursing services (e.g., elderly care, child care) and domestic worker services (e.g., cooking, cleaning).",
                        advantages: "Sarathi ensures reliable, skilled, and quality services tailored to your needs.",
                        sponsorship: "Yes, Sarathi offers both permanent and temporary hiring options based on your requirements.",
                        areasServed: "Sarathi primarily serves major cities in Nepal, including Kathmandu, Lalitpur, Bhaktapur, and nearby regions.",
                        documents: "You need identification documents (e.g., citizenship card, passport) and relevant medical or service-specific details.",
                        emergency: "Yes, Sarathi provides emergency nursing services for urgent needs, subject to availability.",
                        cost: "The charges depend on the type of service, duration, and location. You can get a detailed quote during registration.",
                        payment: "Payments can be made online via digital wallets, bank transfers, or in cash, depending on your convenience.",
                        quality: "Sarathi ensures quality through rigorous staff selection, training, and regular performance monitoring.",
                        dissatisfaction: "If dissatisfied, Sarathi offers support to address concerns, including replacements or refunds based on the policy.",
                        employeeSelection: "Sarathi selects employees through background checks, skill assessments, and experience evaluations."
                    },

                    categories: {
                        clinicalNurseSpecialist: "Clinical Nurse Specialist",
                        cardiacNurse: "Cardiac Nurse",
                        babySitterService: "Baby Sitter Service",
                        nurseMidwife: "Nurse Midwife",
                        officeMaidService: "Office Maid Service",
                        mentalHealthNurse: "Mental Health Nurse",
                        oncologyNurse: "Oncology Nurse",
                        houseMaid: "House Maid",
                        caretaker: "Caretaker"
                    },
                    latestJobs: {
                        "latest": "Latest",
                        "jobs": "Jobs",
                        "noJobsAvailable": "No Job Available"
                    },
                    footer: {
                        exploreAndLearn: "Explore, learn, and challenge yourself with our interactive exams. Expand your knowledge and track your progress effortlessly.",
                        quizu: "Quizu",
                        allRightsReserved: "All rights reserved.",
                        about: "About",
                        company: "Company",
                        contactUs: "Contact Us",
                        address: "Kathmandu, Nepal",
                        home: "Home",
                        jobs: "Jobs",
                        browse: "Browse",
                        SARATHI: "SARATHI",
                        aboutUs: "About Us",
                        terms: "Terms and Conditions",
                        blog: "Blog",
                    },
                },
            },
            ne: {
                translation: {
                    filterJobs: "रोजगारहरू फिल्टर गर्नुहोस्",
                    jobType: "कामको प्रकार",
                    salary: "तलब",
                    babySitterService: "शिशु स्याहार सेवा",
                    nurseMidwife: "नर्स मिडवाइफ",
                    officeMaidService: "अफिस मेड सेवा",
                    mentalHealthNurse: "मानसिक स्वास्थ्य नर्स",
                    oncologyNurse: "अन्कोलोजी नर्स",
                    houseMaid: "गृह सहायिका",
                    caretaker: "हेर्ने व्यक्ति",
                    "0-10k": "0-10k",
                    "10-25k": "10-25k",
                    "25-40k": "25-40k",
                    "40-75k": "40-75k",
                    "75-1lakh": "75k-1 लाख",
                    forgotPasswordTitle: "पासवर्ड बिर्सनुभयो?",
                    enterYourEmail: "तपाईंको ईमेल प्रविष्ट गर्नुहोस्",
                    send: "पठाउनुहोस्",
                    newPassword: "नयाँ पासवर्ड",
                    enterNewPassword: "नयाँ पासवर्ड प्रविष्ट गर्नुहोस्",
                    confirmPassword: "पासवर्ड पुष्टि गर्नुहोस्",
                    updatePassword: "पासवर्ड अद्यावधिक गर्नुहोस्",
                    home: "गृहपृष्ठ",
                    companies: "कम्पनीहरू",
                    jobs: "काम",
                    browse: "ब्राउज गर्नुहोस्",
                    login: "लगइन",
                    signup: "साइन अप गर्नुहोस्",
                    dashboard: "ड्यासबोर्ड",
                    viewProfile: "प्रोफाइल हेर्नुहोस्",
                    logout: "लग आउट गर्नुहोस्",
                    loginTitle: "लगइन",
                    email: "इमेल",
                    password: "पासवर्ड",
                    latest: "नवीनतम",
                    Jobs: "कामहरू",
                    noJobsAvailable: "कुनै काम उपलब्ध छैन",
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
                    alreadyHaveAccount: "पहिल्यै खाता छ?",
                    elevateyourprofessionaljourney: "आफ्नो व्यावसायिक यात्रालाई उचाइमा पुर्याउनुहोस्",
                    ultimateSolution: "नर्स र कामदार खोज्नको लागि उत्कृष्ट समाधान",
                    getAFullTime: "पूर्ण समयको लागि प्राप्त गर्नुहोस्",
                    maid: "कामदार",
                    orProfessional: "वा व्यावसायिक",
                    nurse: "नर्स",
                    onlineIn5: "५ मिनेटमा अनलाइन। कुनै पनि समय रद्द गर्नुहोस्",
                    findTheMaidOrNurses: "कामदार वा नर्स खोज्नुहोस्",
                    whyChooseUs: "किन हामीलाई रोज्ने?",
                    trustSafety: "विश्वास र सुरक्षा",
                    description: "हाम्रो HR टोलीले सरथीमा सहयोगीहरू र नर्सहरूको जाँच कसरी गर्छ। हाम्रो समर्पित टोलीले दैनिक रूपमा पर्दा पछाडि काम गर्दै,\n केवल वास्तविक आवेदनहरू अपलोड गर्छ, जसले विश्वास र सुरक्षाको उच्चतम स्तर \nसुनिश्चित गर्दछ।",
                    backgroundChecks: "पृष्ठभूमि जाँच",
                    documentVerification: "कागजात प्रमाणीकरण",
                    identityVerification: "पहिचान प्रमाणीकरण",
                    thoroughInterviews: "विस्तृत अन्तरवार्ता",
                    hrUploadCv: "HR टोलीले क्रमबद्ध CV अपलोड गर्छ",
                    aboutUs: "हाम्रोबारे",
                    faq: "प्रश्नोत्तर",
                    title: "अनलाइन नौकरानी सेवा",
                    saveTime: "समय बचत गर्नुहोस्: तपाईंलाई मुख्य कुरा गर्न समय दिन्छौं, काम हामी गर्छौं।",
                    professionalCleaning: "पेशेवर सफाई: विशेषज्ञ सफाई सेवासँग चम्किलो घरको आनन्द लिनुहोस्।",
                    convenientBooking: "सुविधाजनक बुकिंग: केही क्लिकमै तपाईंको भरपर्दो नौकरानी बुक गर्नुहोस्।",
                    stressFreeLiving: "तनाव-मुक्त जीवन: सफाई चिन्तालाई बिदा दिनुहोस् र आराम गर्नुहोस्।",
                    dailySupport: "दैनिक सहयोग: तपाईंको दैनिक आवश्यकताका लागि भरपर्दो सहयोग।",
                    cta: "अहिले बुक गर्नुहोस्",
                    "questions": {
                        tadbeer: "सारथी के हो?",
                        appUse: "सारथीले के-के सेवा प्रदान गर्छ?",
                        advantages: "सारथी सेवाहरू प्रयोग गर्दा के फाइदा छ?",
                        sponsorship: "के म नर्स वा घरेलु कामदार स्थायी रूपमा राख्न सक्छु?",
                        areasServed: "सारथी कुन-कुन स्थानहरूमा सेवा दिन्छ?",
                        documents: "सारथी सेवाहरू प्रयोग गर्न कस्ता कागजातहरू आवश्यक छन्?",
                        emergency: "के सारथीले आपतकालीन अवस्थामा नर्सिङ सेवा दिन्छ?",
                        cost: "सारथी सेवाहरूको शुल्क कति छ?",
                        payment: "मैले कसरी भुक्तानी गर्न सक्छु?",
                        quality: "सारथी सेवाहरूको गुणस्तर कसरी सुनिश्चित गर्छ?",
                        dissatisfaction: "यदि म सेवाबाट सन्तुष्ट छैन भने के हुन्छ?",
                        employeeSelection: "सारथीले नर्स र घरेलु कामदार कसरी छनोट गर्छ?"
                    },
                    "answers": {
                        tadbeer: "सारथी एक व्यावसायिक प्रणाली हो जसले विभिन्न आवश्यकताका लागि नर्स र घरेलु कामदार उपलब्ध गराउँछ।",
                        appUse: "सारथीले नर्सिङ सेवाहरू (जस्तै, वृद्ध हेरचाह, बच्चा स्याहार) र घरेलु कामदार सेवाहरू (जस्तै, पकाउने, सफा गर्ने) प्रदान गर्छ।",
                        advantages: "सारथीले भरपर्दो, सीपयुक्त, र गुणस्तरीय सेवाहरू तपाईंको आवश्यकताअनुसार प्रदान गर्छ।",
                        sponsorship: "हो, सारथीले स्थायी र अस्थायी दुवै प्रकारका कर्मचारी उपलब्ध गराउँछ।",
                        areasServed: "सारथीले मुख्यतया काठमाडौँ, ललितपुर, भक्तपुर र छेउछाउका क्षेत्रमा सेवा दिन्छ।",
                        documents: "तपाईंलाई नागरिकता कार्ड, पासपोर्टजस्ता कागजातहरू र सेवासँग सम्बन्धित जानकारी चाहिन्छ।",
                        emergency: "हो, सारथीले आपतकालीन आवश्यकता अनुसार नर्सिङ सेवा दिन्छ।",
                        cost: "शुल्क सेवाको प्रकार, अवधि, र स्थानअनुसार फरक हुन्छ। दर्ता गर्दा विस्तृत जानकारी प्राप्त गर्न सकिन्छ।",
                        payment: "तपाईं डिजिटल वालेट, बैंक ट्रान्सफर वा नगदमार्फत भुक्तानी गर्न सक्नुहुन्छ।",
                        quality: "सारथीले कर्मचारीको छनोट, प्रशिक्षण, र नियमित प्रदर्शन मूल्यांकनबाट सेवाको गुणस्तर सुनिश्चित गर्छ।",
                        dissatisfaction: "यदि तपाईं सन्तुष्ट हुनुहुन्न भने, सारथीले नीति अनुसार सहयोग, प्रतिस्थापन वा फिर्ता प्रदान गर्दछ।",
                        employeeSelection: "सारथीले पृष्ठभूमि जाँच, सीप परीक्षण, र अनुभव मूल्यांकन गरेर कर्मचारी छनोट गर्छ।"
                    },
                    categories: {
                        clinicalNurseSpecialist: "क्लिनिकल नर्स विशेषज्ञ",
                        cardiacNurse: "हृदय नर्स",
                        babySitterService: "शिशु हेरचाह सेवा",
                        nurseMidwife: "नर्स मिडवाइफ",
                        officeMaidService: "अफिस कामदार सेवा",
                        mentalHealthNurse: "मानसिक स्वास्थ्य नर्स",
                        oncologyNurse: "अन्कोलोजी नर्स",
                        houseMaid: "गृह कामदार",
                        caretaker: "हेरचाहकर्ता"
                    },
                    footer: {
                        exploreAndLearn: "हाम्रो अन्तरक्रियात्मक परीक्षासँग अन्वेषण, अध्ययन, र चुनौती दिनुहोस्। आफ्नो ज्ञानलाई बढाउनुहोस् र सजिलैसँग आफ्नो प्रगति ट्र्याक गर्नुहोस्।",
                        quizu: "क्विजू",
                        allRightsReserved: "सबै अधिकार सुरक्षित।",
                        about: "हाम्रो बारेमा",
                        company: "कम्पनी",
                        contactUs: "हामीलाई सम्पर्क गर्नुहोस्",
                        address: "काठमांडू, नेपाल",
                        home: "गृहपृष्ठ",
                        jobs: "काम",
                        browse: "ब्राउज गर्नुहोस्",
                        SARATHI: "सारथी",
                        aboutUs: "हाम्रो बारेमा",
                        terms: "नियम र शर्तहरू",
                        blog: "ब्लग"
                    },
                },
            },
            hi: {
                translation: {
                    filterJobs: "नौकरियां फ़िल्टर करें",
                    jobType: "नौकरी का प्रकार",
                    salary: "वेतन",
                    babySitterService: "बेबी सिटर सेवा",
                    nurseMidwife: "नर्स मिडवाइफ",
                    officeMaidService: "ऑफिस मेड सेवा",
                    mentalHealthNurse: "मानसिक स्वास्थ्य नर्स",
                    oncologyNurse: "ऑन्कोलॉजी नर्स",
                    houseMaid: "घरेलू नौकरानी",
                    caretaker: "देखभाल करने वाला",
                    "0-10k": "0-10 हजार",
                    "10-25k": "10-25 हजार",
                    "25-40k": "25-40 हजार",
                    "40-75k": "40-75 हजार",
                    "75-1lakh": "75 हजार - 1 लाख",
                    forgotPasswordTitle: "पासवर्ड भूल गए?",
                    "enterYourEmail": "अपना ईमेल दर्ज करें",
                    send: "भेजें",
                    newPassword: "नया पासवर्ड",
                    enterNewPassword: "नया पासवर्ड दर्ज करें",
                    confirmPassword: "पासवर्ड की पुष्टि करें",
                    updatePassword: "पासवर्ड अपडेट करें",
                    home: "होम",
                    jobs: "नौकरियां",
                    companies: "कंपनियां",
                    dashboard: "डैशबोर्ड",
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
                    alreadyHaveAccount: "क्या आपके पास पहले से खाता है?",
                    elevateProfessionalJourney: "अपने व्यावसायिक सफर को ऊंचाई पर ले जाएं",
                    ultimateSolution: "नर्स और नौकरानी खोजने का सर्वोत्तम समाधान",
                    getAFullTime: "पूर्णकालिक प्राप्त करें",
                    maid: "नौकरानी",
                    latest: "नवीनतम",
                    Jobs: "नौकरियां",
                    noJobsAvailable: "कोई नौकरी उपलब्ध नहीं है",
                    orProfessional: "या पेशेवर",
                    nurse: "नर्स",
                    onlineIn5: "5 मिनट में ऑनलाइन। कभी भी रद्द करें",
                    findTheMaidOrNurses: "नौकरानी या नर्स खोजें",
                    whyChooseUs: "क्यों हमें चुनें?",
                    trustSafety: "विश्वास और सुरक्षा",
                    description: "हमारी HR टीम सरथी में नौकरानियों और नर्सों की जांच कैसे करती है। हमारी समर्पित टीम हर दिन पर्दे के पीछे काम करती है,\n केवल वास्तविक आवेदनों को अपलोड करती है ताकि विश्वास और सुरक्षा के उच्चतम मानकों को \nसुनिश्चित किया जा सके।",
                    backgroundChecks: "पृष्ठभूमि जांच",
                    documentVerification: "दस्तावेज़ सत्यापन",
                    identityVerification: "पहचान सत्यापन",
                    thoroughInterviews: "संपूर्ण साक्षात्कार",
                    hrUploadCv: "HR टीम क्रमबद्ध CV अपलोड करती है",
                    aboutUs: "हमारे बारे में",
                    faq: "सामान्य प्रश्न",
                    title: "ऑनलाइन नौकरानी सेवा",
                    saveTime: "समय बचाएं: आप जो सबसे महत्वपूर्ण है उस पर ध्यान केंद्रित करें, बाकी हम संभाल लेंगे।",
                    professionalCleaning: "पेशेवर सफाई: विशेषज्ञ हाउसकीपिंग के साथ एक साफ-सुथरा घर पाएं।",
                    convenientBooking: "सुविधाजनक बुकिंग: अपनी विश्वसनीय नौकरानी को सिर्फ कुछ क्लिक में बुक करें।",
                    stressFreeLiving: "तनाव मुक्त जीवन: सफाई की चिंताओं को अलविदा कहें और आराम करें।",
                    dailySupport: "दैनिक समर्थन: आपके रोजमर्रा के कामों के लिए भरोसेमंद और कुशल सहायता।",
                    cta: "अभी बुक करें",
                    "questions": {
                        tadbeer: "सारथी क्या है?",
                        appUse: "सारथी कौन-कौन सी सेवाएँ प्रदान करता है?",
                        advantages: "सारथी की सेवाओं का उपयोग करने के क्या लाभ हैं?",
                        sponsorship: "क्या मैं नर्स या घरेलू कामगार को स्थायी रूप से रख सकता हूँ?",
                        areasServed: "सारथी किन क्षेत्रों में सेवा प्रदान करता है?",
                        documents: "सारथी की सेवाओं का उपयोग करने के लिए कौन-कौन से दस्तावेज़ चाहिए?",
                        emergency: "क्या सारथी आपातकालीन स्थिति में नर्सिंग सेवा प्रदान करता है?",
                        cost: "सारथी की सेवाओं की लागत कितनी है?",
                        payment: "मैं भुगतान कैसे कर सकता हूँ?",
                        quality: "सारथी सेवाओं की गुणवत्ता कैसे सुनिश्चित करता है?",
                        dissatisfaction: "यदि मैं सेवा से संतुष्ट नहीं हूँ तो क्या होगा?",
                        employeeSelection: "सारथी नर्स और घरेलू कामगारों का चयन कैसे करता है?"
                    },
                    "answers": {
                        tadbeer: "सारथी एक पेशेवर प्रणाली है जो विभिन्न आवश्यकताओं के लिए नर्स और घरेलू कामगार प्रदान करता है।",
                        appUse: "सारथी नर्सिंग सेवाएँ (जैसे बुजुर्ग देखभाल, बच्चों की देखभाल) और घरेलू कामगार सेवाएँ (जैसे सफाई, खाना बनाना) प्रदान करता है।",
                        advantages: "सारथी विश्वसनीय, कुशल और गुणवत्तापूर्ण सेवाएँ आपकी आवश्यकताओं के अनुसार प्रदान करता है।",
                        sponsorship: "हाँ, सारथी स्थायी और अस्थायी दोनों प्रकार के कर्मचारी उपलब्ध कराता है।",
                        areasServed: "सारथी मुख्य रूप से काठमांडू, ललितपुर, भक्तपुर और आसपास के क्षेत्रों में सेवा प्रदान करता है।",
                        documents: "आपको नागरिकता प्रमाण, पासपोर्ट जैसे दस्तावेज़ और सेवा से संबंधित विवरण चाहिए।",
                        emergency: "हाँ, सारथी आपातकालीन स्थिति के अनुसार नर्सिंग सेवा प्रदान करता है।",
                        cost: "सेवा के प्रकार, अवधि और स्थान के अनुसार शुल्क अलग-अलग होता है। पंजीकरण के समय विस्तृत जानकारी मिलती है।",
                        payment: "आप डिजिटल वॉलेट, बैंक ट्रांसफर या नकद के माध्यम से भुगतान कर सकते हैं।",
                        quality: "सारथी कर्मचारी चयन, प्रशिक्षण और नियमित प्रदर्शन मूल्यांकन के माध्यम से गुणवत्ता सुनिश्चित करता है।",
                        dissatisfaction: "यदि आप संतुष्ट नहीं हैं, तो सारथी नीतियों के अनुसार प्रतिस्थापन या धनवापसी की सुविधा प्रदान करता है।",
                        employeeSelection: "सारथी पृष्ठभूमि जाँच, कौशल परीक्षण और अनुभव मूल्यांकन के आधार पर कर्मचारियों का चयन करता है।"
                    },
                    categories: {
                        clinicalNurseSpecialist: "क्लिनिकल नर्स विशेषज्ञ",
                        cardiacNurse: "हृदय रोग नर्स",
                        babySitterService: "बच्चों की देखभाल सेवा",
                        nurseMidwife: "नर्स मिडवाइफ",
                        officeMaidService: "ऑफिस नौकरानी सेवा",
                        mentalHealthNurse: "मानसिक स्वास्थ्य नर्स",
                        oncologyNurse: "ऑन्कोलॉजी नर्स",
                        houseMaid: "घरेलू नौकरानी",
                        caretaker: "देखभाल करने वाला",
                    },
                    footer: {
                        exploreAndLearn: "हमारी इंटरएक्टिव परीक्षा के साथ अन्वेषण करें, सीखें और चुनौती दें। अपने ज्ञान का विस्तार करें और अपनी प्रगति को आसानी से ट्रैक करें।",
                        quizu: "क्विज़ु",
                        allRightsReserved: "सर्वाधिकार सुरक्षित।",
                        about: "हमारे बारे में",
                        company: "कंपनी",
                        contactUs: "संपर्क करें",
                        address: "काठमांडू, नेपाल",
                        home: "गृहपृष्ठ",
                        jobs: "काम",
                        browse: "ब्राउज गर्नुहोस्",
                        SARATHI: "सारथी",
                        aboutUs: "हमारे बारे में",
                        terms: "नियम और शर्तें",
                        blog: "ब्लॉग"
                    },
                },
            }
        }
    });

export default i18next;