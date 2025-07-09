import { SearchParamsPageProps } from "../../../../../../types";
import ResponsiveNavbarExample from "../../../../components/navbars/ResponsiveNavbarExample";
import { auth } from "../../../api/auth/[...nextauth]/auth";
import CodebaseLink from "../../../../components/ui/CodebaseLink";
export default async function ResponsiveNavbarPage({
  params,
  searchParams,
}: SearchParamsPageProps) {
  const _params = await params;
  const _searchParams = await searchParams;
  const session = await auth();

  return (
    <section className="ihub-container ihub-mt-10">
      <div className="ihub-course-page">
        <ResponsiveNavbarExample
          params={_params}
          searchParams={_searchParams}
          session={session}
        />
      </div>
      <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/navbars/ResponsiveNavbarExample.tsx" />
    </section>
  );
}
