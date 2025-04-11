import "@/assets/css/styles.css";
import "@/examples/assets/styles/globals.css";
import "@/examples/assets/styles/header.css";
import MainNavigation from "@/examples/components/navbars/MainNavigation";
import MainFooter from "@/examples/components/navbars/MainFooter";
import CursorProviders from "@/examples/components/navbars/CursorProviders";

export const metadata = {
  title: "InstinctHub React UI",
  description: "A modern React UI component library by InstinctHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CursorProviders>
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
        </head>
        <body>
          <MainNavigation />
          {children}
          <MainFooter />
        </body>
      </html>
    </CursorProviders>
  );
}
