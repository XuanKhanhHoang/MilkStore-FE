import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export async function handleDeleteProduct(id: number) {
  const response: Response = await fetch(
    "http://localhost:8081/admin/deleteProduct",
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ProductId: id }),
    }
  );
  if (response.ok) {
    let res:
      | {
          productId: Number;
        }
      | errRequest = await response.json();
    if ("productId" in res) {
      return toast.success(
        "Xóa hành công sản phẩm có mã sản phẩm là " + res.productId,
        {
          autoClose: 1200,
          onClose: () => {
            window.location.href = "http://localhost:3000/storemanage";
          },
        }
      );
    }
    return toast.error("Xóa thất bại", {
      autoClose: 800,
    });
  }
  return toast.error("Gửi dữ liệu tới server thất bại", {
    autoClose: 800,
  });
}
