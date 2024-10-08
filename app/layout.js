import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Shadha Ai Interview Mocker",
  description: "developed by shadhadeepak",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={` antialiased`}>
          <Toaster />
          {children}</body>
      </html>
    </ClerkProvider>
  );
}
