import CheckBoxesFieldExample from "../../../../components/forms/CheckboxesFieldExamples";
import MainNavigation from "../../../../components/navbars/MainNavigation";
import CodebaseLink from "../../../../components/ui/CodebaseLink";
export default function CheckboxesPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <CheckBoxesFieldExample />
      </main>
      <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/forms/CheckboxesFieldExamples.tsx" />
    </>
  );
}
