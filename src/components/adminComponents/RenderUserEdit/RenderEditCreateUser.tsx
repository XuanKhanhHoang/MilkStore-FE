"use client";

import { CUSTOMER_INFO_FULL_DTO } from "@/app/customer/cutomer.dto";
import React, { useState } from "react";
import { toast } from "react-toastify";
export default function RenderEditCreateUser({
  user,
}: {
  user: CUSTOMER_INFO_FULL_DTO | undefined;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHandle, setIsHandle] = useState<boolean>(true);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (isLoading) return;
    const frm = new FormData(e.currentTarget);
    // Lấy iterator của các cặp key/value
    const entries = frm.entries();
    // Duyệt qua các cặp key/value

    for (const [key, value] of entries as any) {
      // In ra console
      if (value.length == 0 && key != "PASSWORD") {
        setIsLoading(false);
        return toast.error("Vui lòng nhập đúng và đủ dữ liệu", {
          autoClose: 1000,
        });
      }
    }
    if ((frm.get("PHONE_NUMBER") as string).length != 10) {
      setIsLoading(false);
      return toast.error("Vui lòng nhập đúng và đủ dữ liệu", {
        autoClose: 1000,
      });
    }
    if (
      (frm.get("PASSWORD") as string).length < 8 &&
      (frm.get("PASSWORD") as string).length != 0
    ) {
      setIsLoading(false);
      return toast.error("Vui lòng nhập mật khảu có độ dài tối thiểu là 8", {
        autoClose: 1000,
      });
    }

    if (user != undefined) {
      frm.set("CUSTOMER_ID", user.CUSTOMER_ID.toString());
      let res = await fetch("http://localhost:8081/admin/customer", {
        method: "POST",
        body: frm,
      });

      if (res.ok) {
        let result = await res.json();
        if (result.success) {
          setIsLoading(false);
          window.location.href = "/storemanage/account";
          return toast.success(
            "Cập nhật thành công cho user có id là " + result.message,
            {
              autoClose: 700,
            }
          );
        } else {
          setIsLoading(false);
          return toast.error("Cập nhật thất bại  ", {
            autoClose: 1000,
          });
        }
      }
      if (!res) {
        setIsLoading(false);
        return toast.error("Cập nhật thất bại  ", {
          autoClose: 1000,
        });
      }
    } else {
      if ((frm.get("PASSWORD") as string).length < 8) {
        setIsLoading(false);
        return toast.error("Vui lòng nhập mật khẩu có độ dài tối thiểu là 8", {
          autoClose: 1000,
        });
      }
      let res = await fetch("http://localhost:8081/admin/addCustomer", {
        method: "POST",
        body: frm,
      });
      setIsLoading(false);
      if (res.ok) {
        let result = await res.json();
        if (result.success) {
          toast.success("Thêm thành công cho user có id là " + result.message, {
            autoClose: 700,
            onClose: () => {
              window.location.href = "/storemanage/account";
            },
          });
        } else {
          setIsLoading(false);
          return toast.error("Thêm thất bại  ", {
            autoClose: 1000,
          });
        }
      }
      if (!res) {
        setIsLoading(false);
        return toast.error("Thêm thất bại  ", {
          autoClose: 1000,
        });
      }
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {user != undefined ? "Sửa đổi thông tin người dùng" : "Thêm người dùng"}
      </h1>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Mỗi ô nhập liệu có một nhãn và một trường nhập */}
        {user != undefined && (
          <div className="flex flex-col">
            <label htmlFor="customer-id" className="text-sm font-semibold">
              CUSTOMER_ID
            </label>
            <input
              type="number"
              id="customer-id"
              name="CUSTOMER_ID"
              className="border rounded p-2"
              defaultValue={user?.CUSTOMER_ID.toString().trim()}
              disabled={true}
            />
          </div>
        )}
        <div className="flex flex-col">
          <label htmlFor="gender" className="text-sm font-semibold">
            GENDER
          </label>
          <select
            id="gender"
            name="GENDER"
            className="border rounded p-2"
            defaultValue={user?.GENDER}
          >
            <option value="M">Nam</option>
            <option value="F">Nữ</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="first-name" className="text-sm font-semibold">
            FIRST_NAME
          </label>
          <input
            type="text"
            id="first-name"
            name="FIRST_NAME"
            className="border rounded p-2"
            defaultValue={user?.FIRST_NAME}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="last-name" className="text-sm font-semibold">
            LAST_NAME
          </label>
          <input
            type="text"
            id="last-name"
            name="LAST_NAME"
            className="border rounded p-2"
            defaultValue={user?.LAST_NAME}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email-address" className="text-sm font-semibold">
            EMAIL_ADDRESS
          </label>
          <input
            type="email"
            id="email-address"
            name="EMAIL_ADDRESS"
            className="border rounded p-2"
            defaultValue={user?.EMAIL_ADDRESS}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="login-name" className="text-sm font-semibold">
            LOGIN_NAME
          </label>
          <input
            type="text"
            id="login-name"
            name="LOGIN_NAME"
            className="border rounded p-2"
            defaultValue={user?.LOGIN_NAME}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone-number" className="text-sm font-semibold">
            PHONE_NUMBER
          </label>
          <input
            type="tel"
            id="phone-number"
            name="PHONE_NUMBER"
            className="border rounded p-2"
            defaultValue={user?.PHONE_NUMBER}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="text-sm font-semibold">
            ADDRESS
          </label>
          <input
            type="text"
            id="address"
            name="ADDRESS"
            className="border rounded p-2"
            defaultValue={user?.ADDRESS}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="avatar" className="text-sm font-semibold">
            AVATAR
          </label>
          <input
            type="file"
            id="avatar"
            name="AVATAR"
            className="border rounded p-2"
            accept="image/*"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-semibold">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            name="PASSWORD"
            className="border rounded p-2"
            defaultValue={""}
          />
        </div>
        {/* Nút gửi để lưu thay đổi */}
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : user != undefined ? "Lưu" : "Thêm"}
          </button>
        </div>
      </form>
    </div>
  );
}
