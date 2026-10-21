import './globals.css';
import { site } from '../lib/site';
import { BagProvider } from '../components/BagProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BagDrawer from '../components/BagDrawer';

export const metadata = {
  title: { default: 'DIMENSN — Fashion in Full Dimension', template: '%s — DIMENSN' },
  description: 'Futuristic streetwear you can turn in 3D and try on in AR.'
};

export const viewport = { themeColor: '#0A0A0B', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Syne:wght@600;800&display=swap" />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <BagProvider>
          <Header announce={site.announce} />
          <main id="main">{children}</main>
          <Footer />
          <BagDrawer />
        </BagProvider>
      </body>
    </html>
  );
}
