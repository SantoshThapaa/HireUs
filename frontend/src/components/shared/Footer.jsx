import { useTranslation } from 'react-i18next';
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#45cfc1]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* First Column */}
          <Card className="w-full md:w-[379px] h-auto md:h-[259px] flex flex-col justify-between border-none shadow-none bg-transparent">
            <CardContent className="space-y-4 flex flex-col gap-8">
              <p className="text-md text-white">
                {t('footer.exploreAndLearn')}
              </p>
              <div className="flex space-x-6 justify-center items-left">
                {[
                  { href: '#', icon: <FaFacebookSquare />, label: 'Facebook' },
                  { href: '#', icon: <FaYoutube />, label: 'YouTube' },
                  { href: '#', icon: <FaLinkedin />, label: 'LinkedIn' },
                  { href: '#', icon: <FaInstagram />, label: 'Instagram' },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-[#4273a1] hover:text-[#363535] text-2xl transform transition-all duration-300 ease-in-out hover:scale-110"
                  >
                    {item.icon}
                    <span className="sr-only">{item.label}</span>
                  </a>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-md text-white">© 2024 {t('footer.SARATHI')}. {t('footer.allRightsReserved')}</p>
            </CardFooter>
          </Card>

          {/* Second Column */}
          <Card className="bg-transparent border-none w-40 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-white font-bold">{t('footer.about')}</CardTitle>
            </CardHeader>
            <CardContent>
              <nav>
                <ul className="space-y-1 text-white text-sm">
                  {['home', 'about', 'jobs', 'browse'].map((key) => (
                    <li key={key}>
                      <a href="#" className="hover:underline">{t(`footer.${key}`)}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardContent>
          </Card>

          {/* Third Column */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Company Section */}
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-white font-bold">{t('footer.company')}</CardTitle>
              </CardHeader>
              <CardContent>
                <nav>
                  <ul className="space-y-1 text-white text-sm">
                    {['aboutUs', 'terms', 'blog'].map((key) => (
                      <li key={key}>
                        <a href="#" className="hover:underline">{t(`footer.${key}`)}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-white font-bold">{t('footer.contactUs')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-white text-sm">
                <p>{t('footer.address')}</p>
                <p>+977 0000000000</p>
                <p>support@Sarathi.com.np</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-8 text-center shadow-lg shadow-blue-500/50">
        <h1 className="text-6xl text-[#95FFE1] font-bold tracking-[0.3em] sm:text-8xl md:text-9xl lg:text-[10rem]">
          {t('SARATHI')}
        </h1>
      </div>

    </footer>
  );
}

export default Footer;
