import { TRPCReactProvider } from "@/trpc/react";
import Footer from "./_components/Layout/Footer";
import Header from "./_components/Layout/Header";
import "@/styles/globals.css";
import { Button } from "@/lib/shadcn/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/lib/shadcn/components/ui/sheet";
import { Label } from "@/lib/shadcn/components/ui/label";
import { Input } from "@/lib/shadcn/components/ui/input";
import Sidebar from "./_components/Layout/Sidebar";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <Sheet>
            <Header />
            <main>{children}</main>
            <Footer />
            <Sidebar />
          </Sheet>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
