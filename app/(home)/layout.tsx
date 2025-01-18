import { MainNavbar } from "@/components/homepage/NavBar";
import "../globals.css";
import { Footer } from "@/components/homepage/Footer";

// import { Footer } from "@/components/footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <MainNavbar />
      {children}
      <Footer />
    </main>
  );
}
