import UserList from "@/components/adminComponents/RenderUserList/RenderCustomerList";
import React from "react";

export default async function page() {
  let users: CUSTOMER_GENERAL_DTO[] | errRequest = [];
  let res = await fetch("http://localhost:8081/admin/customer_list", {
    cache: "default",
  });
  if (res.ok) {
    users = await res.json();
    if ("statusCode" in users) return <p>Something Wrong</p>;
  }
  return <UserList customerLst={users} />;
}
