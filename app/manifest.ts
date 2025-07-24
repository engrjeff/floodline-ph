import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FloodLine PH',
    short_name: 'FloodLine PH',
    description:
      "Visual representation of PAGASA's water level data for major dams and rivers in the Philippines.",
    start_url: '/',
    scope: '/',
    id: '/',
    display: 'standalone',
    background_color: '#101010',
    theme_color: '#101010',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/icons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  };
}
