import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "components/organisms/Header";
import { TooltipProvider } from "components/ui/tooltip";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "500"
});

export const metadata: Metadata = {
  title: "Vending Machine",
  description: "Vending Machine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <Header />
        <main>
          <TooltipProvider delayDuration={0}>
            {children}
          </TooltipProvider>
        </main>
      </body>
    </html>
  );
}
