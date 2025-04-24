import MainNavigation from "../../../../components/navbars/MainNavigation";
import BadgeExamples from "../../../../components/ui/BadgeExamples";
import CodebaseLink from "../../../../components/ui/CodebaseLink";
export default function BadgesPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <BadgeExamples />
      </main>
      <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/ui/BadgeExamples.tsx" />
    </>
  );
}
