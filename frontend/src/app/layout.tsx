import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import AppShell from "./components/AppShell";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GoalGuess - ทายผลบอล",
  description: "แพลตฟอร์มทายผลบอลพรีเมียมสุดล้ำ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={kanit.variable}>
      <body style={{ fontFamily: "var(--font-kanit), 'Kanit', system-ui, sans-serif", background: '#060912' }}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
