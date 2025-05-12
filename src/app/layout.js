import Navbar from "@/components/NavBar";
import ThemeProvider from "../theme/theme-provider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf] min-h-screen transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="container mx-auto px-2 md:px-4 py-4"> {/* 减少container的内边距 */}
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}