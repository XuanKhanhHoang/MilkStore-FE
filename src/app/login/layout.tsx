import { getServerSession } from "next-auth";
import "react-quill/dist/quill.snow.css";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { customerRole } from "../storemanage/login/roles.enum";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (
    (await getServerSession(options))?.user?.value.CUSTOMER_ID != undefined &&
    (await getServerSession(options))?.user?.value.ROLE == customerRole
  ) {
    console.log((await getServerSession(options))?.user?.value.CUSTOMER_ID);

    return redirect("/");
  }
  return <div>{children}</div>;
}
