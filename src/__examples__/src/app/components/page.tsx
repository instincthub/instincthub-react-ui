import ComponentListing from "../../components/ComponentListing";
import MainNavigation from "../../components/navbars/MainNavigation";

export default function Page() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-container ihub-mt-10">
        <ComponentListing />
      </main>
    </>
  );
}
