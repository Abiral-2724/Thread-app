
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title : 'Threadscape' ,
  description : 'A Next.js 14 Meta threads application'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Topbar></Topbar>
    <main className="flex flex-row">
      <LeftSidebar></LeftSidebar>
        <section className="main-container">
        <div className="w-full max-w-4xl">
        <ToastContainer position="top-right" autoClose={5000} />
          {children}
        </div>
        </section>
      <RightSidebar></RightSidebar>
    </main>
        <Bottombar></Bottombar>
       <Footer></Footer>
      </body>
    </html>
    </ClerkProvider>
    
  );
}
