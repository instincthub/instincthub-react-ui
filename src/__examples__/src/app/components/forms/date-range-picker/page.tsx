import DateRangePickerExample from "../../../../components/forms/DateRangePickerExample";
import MainNavigation from "../../../../components/navbars/MainNavigation";
import CodebaseLink from "../../../../components/ui/CodebaseLink";

export default function DateRangePickerPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <DateRangePickerExample />
        <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/forms/DateRangePickerExample.tsx" />
      </main>
    </>
  );
}
