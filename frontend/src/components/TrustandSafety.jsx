import React from 'react';
import { useTranslation } from 'react-i18next';

const TrustAndSafety = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-5">
          <span className="text-[#45cfc1]">{t('trustSafety')}</span>
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          {t('description').split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {/* Background Checks */}
          <div className="flex flex-col items-center">
            <div className="w-25 h-25 flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-110">
              <img src="/Background.png" alt={t('backgroundChecks')} className="w-full h-full object-contain" />
            </div>
            <p className="text-gray-700 text-lg">{t('backgroundChecks')}</p>
          </div>

          {/* Document Verification */}
          <div className="flex flex-col items-center">
            <div className="w-25 h-25 flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-110">
              <img src="/Doument.png" alt={t('documentVerification')} className="w-full h-full object-contain" />
            </div>
            <p className="text-gray-700 text-lg">{t('documentVerification')}</p>
          </div>

          {/* Identity Verification */}
          <div className="flex flex-col items-center">
            <div className="w-25 h-25 flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-110">
              <img src="/Identity.png" alt={t('identityVerification')} className="w-full h-full object-contain" />
            </div>
            <p className="text-gray-700 text-lg">{t('identityVerification')}</p>
          </div>

          {/* Thorough Interviews */}
          <div className="flex flex-col items-center">
            <div className="w-25 h-25 flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-110">
              <img src="/Interview.png" alt={t('thoroughInterviews')} className="w-full h-full object-contain" />
            </div>
            <p className="text-gray-700 text-lg">{t('thoroughInterviews')}</p>
          </div>

          {/* HR Team Upload Sorted CV's */}
          <div className="flex flex-col items-center">
            <div className="w-25 h-25 flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-110">
              <img src="/HRTeam.png" alt={t('hrUploadCv')} className="w-full h-full object-contain" />
            </div>
            <p className="text-gray-700 text-lg">{t('hrUploadCv')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};


export default TrustAndSafety;
