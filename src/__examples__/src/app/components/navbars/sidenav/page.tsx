import { SearchParamsPageProps } from "../../../../../../types";
import ResponsiveNavbarExample from "../../../../components/navbars/ResponsiveNavbarExample";
import SideNavbarExample from "../../../../components/navbars/SideNavbarExample";
import { auth } from "../../../api/auth/[...nextauth]/auth";
import CodebaseLink from "../../../../components/ui/CodebaseLink";

export default async function SideNavbarPage({
  params,
  searchParams,
}: SearchParamsPageProps) {
  const _params = await params;
  const _searchParams = await searchParams;
  const session = await auth();

  return (
    <section>
      <div className="ihub-course-page">
        <ResponsiveNavbarExample
          params={_params}
          searchParams={_searchParams}
          session={session}
        />
        <SideNavbarExample />
      </div>
      <CodebaseLink url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/navbars/SideNavbarExample.tsx" />
    </section>
  );
}
