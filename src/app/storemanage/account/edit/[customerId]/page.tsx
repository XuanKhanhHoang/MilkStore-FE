import { CUSTOMER_INFO_FULL_DTO } from "@/app/customer/cutomer.dto";
import RenderEditUser from "@/components/adminComponents/RenderUserEdit/RenderEditCreateUser";

export default async function page({
  params,
}: {
  params: { customerId: number };
}) {
  const customer_id = params.customerId ?? "1"; // default value is "1"
  let res: Response = await fetch(
    "http://localhost:8081/admin/customer?customer_id=" + customer_id,
    {
      cache: "default",
    }
  );
  let user: CUSTOMER_INFO_FULL_DTO | undefined = undefined;
  if (res.ok) {
    let data: CUSTOMER_INFO_FULL_DTO | errRequest = await res.json();
    if ("statusCode" in data) {
      return <p>Something Wrong</p>;
    } else {
      user = data;
      return <RenderEditUser user={user} />;
    }
  }
  return <p>Something Wrong</p>;
}
