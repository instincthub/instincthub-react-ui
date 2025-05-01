import InputAmountExample from "../../../../components/forms/InputAmountExample";
import MainNavigation from "../../../../components/navbars/MainNavigation";
import CodebaseLink from "../../../../components/ui/CodebaseLink";

export default async function InputAmountPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <InputAmountExample />
      </main>
      <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/forms/InputAmountExample.tsx" />
    </>
  );
}
