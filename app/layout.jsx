import { Geist, Geist_Mono } from "next/font/google";
import "./../styles/globals.css";
import ClientAuthWrapper from "../components/user/ClientAuthWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Sarcastic Geeks Trybe — The Most Collaborative Tech Community in West Africa",
  description: "Localizing LinkedIn: Join Sarcastic Geeks Trybe — a developer community where you build, play, learn, and earn. From AI to Web3, games to code. Forget boring — let's geek out.",
  url: "https://sarcasticgeeks.com/",
  image: "https://sarcasticgeeks.com/images/the-trybe.jpg",
  keywords: "tech community, West African Tech Community, tech jobs, tech courses, developer networking, developers, gamers, AI, Web3, LinkedIn, learn, earn, connect, developer community, learn coding, web3 devs, AI projects, browser games, earn with code, sarcastic geeks, tech tribe, fun coding platform, hack and play, a normal life is boring, gee brain, gozkybrain",
  author: "Gee Brain",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sarcastic Geeks Trybe",
    url: metadata.url,
    logo: metadata.image,
    sameAs: [
      "https://twitter.com/sarcasticgeek4u",
    ],
    description: metadata.description,
    founder: { "@type": "Person", name: "Gee Brain" },
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000c19" />
        <title>{metadata.title}</title>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={metadata.url} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientAuthWrapper>{children}</ClientAuthWrapper>
      </body>
    </html>
  );
}
