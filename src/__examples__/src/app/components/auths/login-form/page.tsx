import { SearchParamsPageProps } from "../../../../../../types";
import LoginExample from "../../../../components/auths/LoginExample";

export default async function LoginFormPage({
  params,
  searchParams,
}: SearchParamsPageProps) {
  const _params = await params;
  const _searchParams = await searchParams;
  return <LoginExample params={_params} searchParams={_searchParams} />;
}
