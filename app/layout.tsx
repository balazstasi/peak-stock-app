import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { TopNavigator } from "@/components/top-navigator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peak Stock",
  description: "Peak Stock App - Take Home Assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <body className={inter.className}>
          <TopNavigator />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
