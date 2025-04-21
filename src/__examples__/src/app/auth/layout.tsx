import MainNavigation from "../../components/navbars/MainNavigation";

export default function AuthLayout({
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
