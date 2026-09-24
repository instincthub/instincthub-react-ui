import "../../../assets/css/styles.css";
import "../assets/styles/globals.css";
import "../assets/styles/header.css";
import MainFooter from "../components/navbars/MainFooter";
import CursorProviders from "../components/navbars/CursorProviders";
import { Suspense } from "react";
import { ReactClientProviders } from "../../../index";
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
          <link rel="icon" href="/instincthub-thumbnail.png" />
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
          <ReactClientProviders session={null}>
            {/* Several demos use useSearchParams(); Next.js needs a Suspense boundary to pre-render them. */}
            <Suspense fallback={null}>{children}</Suspense>
            <MainFooter />
          </ReactClientProviders>
        </body>
      </html>
    </CursorProviders>
  );
}
