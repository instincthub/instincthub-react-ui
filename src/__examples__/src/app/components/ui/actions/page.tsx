import MainNavigation from "../../../../components/navbars/MainNavigation";
import ActionExamples from "../../../../components/ui/ActionExamples";
import CodebaseLink from "../../../../components/ui/CodebaseLink";
export default function BadgesPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <ActionExamples />
      </main>
      <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/ui/ActionExamples.tsx" />
    </>
  );
}
