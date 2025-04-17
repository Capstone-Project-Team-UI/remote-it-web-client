import { getAuthenticatedUser} from "@/auth";
import { redirect } from "next/navigation";

export default async function UnauthenticatedLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthenticatedUser();
  if(user) redirect("/devices");

  return <div>{children}</div>;
}
