import MainNavigation from "../../../../components/navbars/MainNavigation";
import CardExamples from "../../../../components/ui/CardExamples";
import CodebaseLink from "../../../../components/ui/CodebaseLink";
export default function CardsPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <CardExamples />
      </main>
      <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/ui/CardExamples.tsx" />
    </>
  );
}
