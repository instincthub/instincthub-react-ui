import { SearchParamsType } from "../../../../../../types";
import ResponsiveNavbarExample from "../../../../components/navbars/ResponsiveNavbarExample";
import { auth } from "../../../api/auth/[...nextauth]/auth";

export default async function ResponsiveNavbarPage({
  params,
  searchParams,
}: SearchParamsType) {
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
    </section>
  );
}
