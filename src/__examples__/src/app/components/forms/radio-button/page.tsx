import RadioButtonExample from "../../../../components/forms/RadioButtonExample";
import MainNavigation from "../../../../components/navbars/MainNavigation";
import CodebaseLink from "../../../../components/ui/CodebaseLink";
export default function ChipsInputPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <RadioButtonExample />
        <CodebaseLink label="RadioButton Codebase" url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/forms/RadioButtonExample.tsx" />
      </main>
    </>
  );
}
