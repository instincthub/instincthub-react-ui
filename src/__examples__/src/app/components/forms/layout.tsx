import MainNavigation from "../../../components/navbars/MainNavigation";
import { Breadcrumb } from "../../../../../index";
export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNavigation />
      <Breadcrumb
        pathMapping={{
          components: "Components",
        }}
      />
      {children}
    </>
  );
}
