import "../../../assets/css/styles.css";
import "../assets/styles/globals.css";
import "../assets/styles/header.css";
import MainNavigation from "../components/navbars/MainNavigation";
import MainFooter from "../components/navbars/MainFooter";
import CursorProviders from "../components/navbars/CursorProviders";

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
