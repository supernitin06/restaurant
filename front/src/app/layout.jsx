import "./globals.css";
import Navbar from "@/components/common/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50">
        <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
