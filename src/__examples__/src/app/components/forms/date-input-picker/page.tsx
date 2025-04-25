import CheckboxesFieldExample from "../../../../components/forms/CheckboxesFieldExamples";
import DateInputPickerExample from "../../../../components/forms/DateInputPickerExample";
import DateInputPickerTimeExample from "../../../../components/forms/DateInputPickerTimeExample";
import MainNavigation from "../../../../components/navbars/MainNavigation";
import CodebaseLink from "../../../../components/ui/CodebaseLink";
export default function CheckboxesPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <DateInputPickerExample />
        <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/forms/DateInputPickerExample.tsx" />
        <DateInputPickerTimeExample label="Date Time" />
        <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/forms/DateInputPickerTimeExample.tsx" />
      </main>
    </>
  );
}
