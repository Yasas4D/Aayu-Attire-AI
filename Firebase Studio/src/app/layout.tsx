
import type {Metadata} from 'next';
import { fontSans } from "@/lib/fonts" // Import font from the new file
import './globals.css';
import { cn } from "@/lib/utils"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Aayu Lookbook',
  description: 'Modern clothing for the modern soul by Aayu Attire.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable // Use the imported font variable
          // Add fontSerif.variable here if using a serif font for headings
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
