import MainNavigation from "../../components/navbars/MainNavigation";

export default function CodeDisplayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
return (
    <>
      <MainNavigation />
      {children}
    </>
  );
}
