import { useOAuthRedirect } from "@/hooks/use-oauth-redirect";
import { useParams } from "next/navigation";

export default function OAuthRedirect() {
  const params = useParams<{ token: string }>();
  useOAuthRedirect(params.token);

  return <></>;
}