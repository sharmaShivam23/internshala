import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "InternHub — Find Your Dream Internship",
  description:
    "Browse and discover top internship opportunities from leading companies. Filter by profile, location, duration, and stipend to find the perfect match.",
  keywords: ["internship", "jobs", "career", "students", "internshala"],
  openGraph: {
    title: "InternHub — Find Your Dream Internship",
    description:
      "Browse and discover top internship opportunities from leading companies.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
