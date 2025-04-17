import { redirect } from "next/navigation";
import { getAuthenticatedUser} from "@/auth";

export default async function RootLayout() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/login");
  else redirect("/devices")
}
