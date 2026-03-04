import SearchableDropdownExample from "../../../../components/forms/SearchableDropdownExample";
import MainNavigation from "../../../../components/navbars/MainNavigation";
import CodebaseLink from "../../../../components/ui/CodebaseLink";

export default function SearchableDropdownPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <SearchableDropdownExample />
        <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/forms/SearchableDropdownExample.tsx" />
      </main>
    </>
  );
}
