import { SearchParamsPageProps } from "../../../../../../types";
import LoginFormExample from "../../../../components/auth/LoginFormExample";

export default async function LoginFormPage({
  params,
  searchParams,
}: SearchParamsPageProps) {
  const _params = await params;
  const _searchParams = await searchParams;
  return (
    <LoginFormExample params={_params} searchParams={_searchParams} />
  );
}
