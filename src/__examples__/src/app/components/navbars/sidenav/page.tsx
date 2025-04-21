import { SearchParamsType } from "../../../../../../types";
import ResponsiveNavbarExample from "../../../../components/navbars/ResponsiveNavbarExample";
import SideNavbarExample from "../../../../components/navbars/SideNavbarExample";
import { auth } from "../../../api/auth/[...nextauth]/auth";

export default async function SideNavbarPage({
  params,
  searchParams,
}: SearchParamsType) {
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
    </section>
  );
}
