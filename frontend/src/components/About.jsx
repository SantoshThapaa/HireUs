import { useState } from "react";
import { useTranslation } from "react-i18next";

const FAQ = () => {
    const { t } = useTranslation();

    const faqs = [
        {
            question: t("questions.tadbeer"),
            answer: t("answers.tadbeer", "No, we are not Tadbeer."),
        },
        {
            question: t("questions.appUse"),
            answer: t("answers.appUse", "The app helps you manage and book services easily."),
        },
        {
            question: t("questions.advantages"),
            answer: t(
                "answers.advantages",
                "You get convenient, reliable, and professional services at your fingertips."
            ),
        },
        {
            question: t("questions.sponsorship"),
            answer: t(
                "answers.sponsorship",
                "Yes, we can sponsor your driver, nanny, or other household staff."
            ),
        },
        {
            question: t("questions.areasServed"),
            answer: t("answers.areasServed", "We serve all major cities in your country."),
        },
        {
            question: t("questions.documents"),
            answer: t(
                "answers.documents",
                "You need your ID, proof of residence, and payment information."
            ),
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="">
            <h1 className="text-4xl font-bold ml-10">
                <span className="text-[#45cfc1]">{t('aboutUs').split(' ')[0]}</span> {t('aboutUs').split(' ')[1]}
            </h1>
            <div className="bg-[#daedeb] py-10 px-6">
                <div className="max-w-4xl mx-auto ">
                    <h3 className="text-2xl text-center font-semibold text-gray-700 mb-4">{t("faq")}</h3>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white border rounded-lg shadow-md cursor-pointer"
                            >
                                {/* Question Section */}
                                <div
                                    className="flex justify-between items-center p-4"
                                    onClick={() => handleToggle(index)}
                                >
                                    <p className="text-gray-800 font-medium">{faq.question}</p>
                                    <button
                                        className="text-gray-500 hover:text-gray-700 transform"
                                        aria-label="Toggle Answer"
                                    >
                                        {openIndex === index ? (
                                            <span>&#9650; {/* Up Arrow */}</span>
                                        ) : (
                                            <span>&#9660; {/* Down Arrow */}</span>
                                        )}
                                    </button>
                                </div>

                                
                                {openIndex === index && (
                                    <div className="p-4 bg-[#daeae4] border-t">
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
