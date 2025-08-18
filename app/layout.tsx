import type { Metadata } from 'next';
import { Source_Sans_3 as FontSans } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import { getSiteUrl } from '@/utils/healpers';

const fontSans = FontSans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Sommaire - AI-Powered PDF Summarization',
  description:
    'Save hours of reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with our advanced AI technology.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    images: [
      // можно относительный путь, т.к. есть metadataBase,
      // но абсолютный безопаснее:
      `${SITE_URL}/open-graph-image.png`,
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <div className="relative flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
