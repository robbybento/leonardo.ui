import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import type { Metadata } from "next";
import "./globals.css";
import ChakraProvider from "../providers/ChakraProvider";
import { UserProvider } from "../providers/UserProvider";

export const metadata: Metadata = {
  title: "Leonardo",
  description: "Leonardo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <UserProvider>{children}</UserProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
