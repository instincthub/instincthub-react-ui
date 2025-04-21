import "../../../assets/css/styles.css";
import "../assets/styles/globals.css";
import "../assets/styles/header.css";
import MainFooter from "../components/navbars/MainFooter";
import CursorProviders from "../components/navbars/CursorProviders";
import ReactClientProviders from "../components/auths/ReactClientProviders";
export const metadata = {
  title: "InstinctHub React UI",
  description: "A modern React UI component library by InstinctHub",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
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
          <ReactClientProviders session={session}>
            {children}
            <MainFooter />
          </ReactClientProviders>
        </body>
      </html>
    </CursorProviders>
  );
}
