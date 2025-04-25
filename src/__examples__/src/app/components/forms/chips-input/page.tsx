import ChipsInputExample from "../../../../components/forms/ChipsInputExample";
import MainNavigation from "../../../../components/navbars/MainNavigation";
import CodebaseLink from "../../../../components/ui/CodebaseLink";
export default function ChipsInputPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <ChipsInputExample />
        <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/forms/ChipsInputExample.tsx" />
      </main>
    </>
  );
}
