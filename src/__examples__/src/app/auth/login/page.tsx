import { SearchParamsPageProps } from "../../../../../types";
import LoginExample from "../../../components/auths/LoginExample";

export default async function LoginFormPage({
  params,
  searchParams,
}: SearchParamsPageProps) {
  const _params = await params;
  const _searchParams = await searchParams;
  return (
    <section className="ihub-container ihub-mt-10 ihub-pb-10">
      <LoginExample params={_params} searchParams={_searchParams} />;
    </section>
  );
}
