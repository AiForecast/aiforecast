import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "AiForecast - A Personal NotebookLM and Perplexity-like AI Assistant for Everyone.",
	description:
		"Have your own private NotebookLM and Perplexity with better integrations.",
	openGraph: {
		images: [
			{
				url: "https://surfsense.net/og-image.png",
				width: 1200,
				height: 630,
				alt: "AiForecast - A Personal NotebookLM and Perplexity-like AI Assistant for Everyone.",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "https://aiforecast.io",
		creator: "https://aiforecast.io",
		title: "AiForecast - A Personal NotebookLM and Perplexity-like AI Assistant for Everyone.",
		description:
			"Have your own private NotebookLM and Perplexity with better integrations.",
		images: [
			{
				url: "https://surfsense.net/og-image.png",
				width: 1200,
				height: 630,
				alt: "AiForecast - A Personal NotebookLM and Perplexity-like AI Assistant for Everyone.",
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
      <html lang="en">
        <body
          className={cn(
            inter.className,
            "bg-white dark:bg-black antialiased h-full w-full"
          )}
        >
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
            defaultTheme="light"
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
  );
}
