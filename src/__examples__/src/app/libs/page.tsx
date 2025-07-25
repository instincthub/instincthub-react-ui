import { LibraryList } from "@/components/ui";
import MainNavigation from "../../components/navbars/MainNavigation";

export default function Page() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-container ihub-mt-10">
        <LibraryList />
      </main>
    </>
  );
}
