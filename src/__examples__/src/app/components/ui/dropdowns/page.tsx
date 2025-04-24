import MainNavigation from "../../../../components/navbars/MainNavigation";
import CodebaseLink from "../../../../components/ui/CodebaseLink";
import DropdownExamples from "../../../../components/ui/DropdownExamples";
export default function DropdownPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <DropdownExamples />
      </main>
      <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/ui/DropdownExamples.tsx" />
    </>
  );
}
