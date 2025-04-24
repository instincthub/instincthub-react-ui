import MainNavigation from "../../../../components/navbars/MainNavigation";
import CodebaseLink from "../../../../components/ui/CodebaseLink";
import DialogExample from "../../../../components/ui/DialogExample";
export default function DailogPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <DialogExample />
      </main>
      <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/ui/CardExamples.tsx" />
    </>
  );
}
