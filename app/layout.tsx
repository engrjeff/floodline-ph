import { Attribution } from '@/components/attribution';
import { FAQ } from '@/components/faq';
import { Header } from '@/components/header';
import { ScrollToTopButton } from '@/components/scroll-to-top';
import { site } from '@/config/site';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    images: [
      {
        url: site.ogImageUrl,
        alt: site.title,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <footer className="border-t">
          <div className="container mx-auto max-w-xl px-4 py-8 text-muted-foreground text-sm">
            <FAQ />
            <Attribution />
          </div>
        </footer>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
