import MainNavigation from "../../../../components/navbars/MainNavigation";
import TableServerExamplesPage from "../../../../components/ui/TableServerExamples";

export default function IHubTableServerExamplesPage() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <TableServerExamplesPage />
      </main>
    </>
  );
}
