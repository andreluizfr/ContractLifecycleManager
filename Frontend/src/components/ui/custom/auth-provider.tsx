import { useFetchUser } from "@/hooks/use-fetch-user";
import Loading from "./loading";

interface AuthProviderProps extends React.HTMLAttributes<HTMLDivElement>{}

export function AuthProvider({children}:AuthProviderProps) {

  const fetchUserResult = useFetchUser();

  if(fetchUserResult.isLoading || fetchUserResult.isFetching) return <Loading/>;

  return <>{children}</>;
}