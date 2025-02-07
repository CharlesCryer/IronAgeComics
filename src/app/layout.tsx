import { TRPCReactProvider } from "@/trpc/react";
import Footer from "./_components/Layout/Footer";
import Header from "./_components/Layout/Header";
import "@/styles/globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <Header />
          {children}
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
