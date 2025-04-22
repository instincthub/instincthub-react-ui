import MainNavigation from "../../../components/navbars/MainNavigation";
import ChartExamples from "../../../components/ui/ChartExamples";
import CodebaseLink from "../../../components/ui/CodebaseLink";
export default function ChartsPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <ChartExamples />
      </main>
      <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/ui/ChartExamples.tsx" />
    </>
  );
}
