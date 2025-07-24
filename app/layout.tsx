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
  title: 'FloodLine PH',
  description:
    "Visual representation of PAGASA's water level data for major dams and rivers in the Philippines.",
  openGraph: {
    title: 'FloodLine PH',
    images: [
      {
        url: 'https://res.cloudinary.com/abide-in-the-vine/image/upload/v1753334395/floodline-ph-og_e2z38c.png',
        alt: 'FloodLine PH',
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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
