"use client";
import Modal from "@/components/generalComponents/modal";
import { useDebounce } from "@/customHooks/useDebounce";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

function UserList({ customerLst }: { customerLst: CUSTOMER_GENERAL_DTO[] }) {
  const [customerList, setCustomerList] = useState(customerLst);
  const [searchTerm, setSearchTerm] = useState("");
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [deletingItemId, setDeletingItemId] = useState<number | undefined>(
    undefined
  );
  const [colSearching, setColSearching] = useState<
    "LAST_NAME" | "FIRST_NAME" | "CUSTOMER_ID" | "LOGIN_NAME" | "EMAIL_ADDRESS"
  >("LOGIN_NAME");
  const debounce = useDebounce(searchTerm, 800);
  const orderType = useRef<-1 | 1>(-1);
  const isMount = useRef(false);
  const handleSort = (
    col:
      | "CUSTOMER_ID"
      | "FIRST_NAME"
      | "LAST_NAME"
      | "LOGIN_NAME"
      | "EMAIL_ADDRESS"
  ) => {
    let cst = [...customerLst];
    orderType.current *= -1;
    cst.sort((a, b) => {
      switch (col) {
        case "CUSTOMER_ID": {
          return orderType.current * (a[col] - b[col]);
        }
        default:
          return orderType.current * a[col].localeCompare(b[col]);
      }
    });
    console.log(cst);
    setCustomerList(cst);
  };
  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(
        "http://localhost:8081/admin/customer_list" +
          (debounce.trim().length != 0
            ? "?searchTerm=" + debounce + "&&col=" + colSearching
            : "")
      );
      if (res.ok) {
        let result: errRequest | CUSTOMER_GENERAL_DTO[] = await res.json();
        if (!res)
          return toast.error("Err fetching", {
            autoClose: 1000,
          });
        if ("statusCode" in result) return;
        return setCustomerList(result);
      }
      return toast.error("Err fetching", {
        autoClose: 1000,
      });
    };
    if (isMount.current) fetchData();
    else isMount.current = true;
  }, [debounce, colSearching]);
  const handleDelete = async () => {
    console.log("ddd");
    let res = await fetch("http://localhost:8081/admin/customer", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id: deletingItemId,
      }),
    });
    if (res.ok) {
      let result = await res.json();
      if (result == 1) {
        setIsShowModal(false);
        window.location.href = "/storemanage/account";
        return toast.success("Xóa thành công", {
          autoClose: 800,
        });
      }
    }
    toast.error("Xóa thất bại", {
      autoClose: 800,
    });
  };
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8 ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
        <div className="flex items-center flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 mb-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative" style={{ margin: "8px" }}>
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block  p-2.5 "
            value={colSearching}
            onChange={(e) => {
              setColSearching(
                e.target.value as
                  | "LAST_NAME"
                  | "FIRST_NAME"
                  | "CUSTOMER_ID"
                  | "LOGIN_NAME"
                  | "EMAIL_ADDRESS"
              );
            }}
          >
            <option value="LOGIN_NAME">Tài Khoản</option>
            <option value="CUSTOMER_ID">CUSTOMER_ID</option>
            <option value="EMAIL_ADDRESS">EMAIL</option>
            <option value="FIRST_NAME">Tên</option>
            <option value="LAST_NAME">Họ</option>
          </select>
          <a
            href="/storemanage/account/add"
            className="bg-green-400 p-2 ms-auto rounded text-white font-medium"
          >
            {" "}
            Thêm người dùng
          </a>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3"
                onClick={() => handleSort("LOGIN_NAME")}
              >
                Tài Khoản
              </th>
              <th
                scope="col"
                className="px-6 py-3"
                onClick={() => handleSort("CUSTOMER_ID")}
              >
                CUSTOMER ID
              </th>
              <th
                scope="col"
                className="px-6 py-3"
                onClick={() => handleSort("FIRST_NAME")}
              >
                Tên
              </th>
              <th
                scope="col"
                className="px-6 py-3"
                onClick={() => handleSort("LAST_NAME")}
              >
                Họ
              </th>
              <th scope="col" className="px-6 py-3">
                Giới tính
              </th>
              <th scope="col" className="px-6 py-3">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {customerList.length != 0 &&
              customerList.map((item) => {
                return (
                  <tr
                    key={item.CUSTOMER_ID}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={item.AVATAR}
                        alt="Jese image"
                      />
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {item.LOGIN_NAME}
                        </div>
                        <div className="font-normal text-gray-500">
                          {item.EMAIL_ADDRESS}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{item.CUSTOMER_ID}</td>
                    <td className="px-6 py-4">{item.FIRST_NAME}</td>
                    <td className="px-6 py-4">{item.LAST_NAME}</td>
                    <td className="px-6 py-4">
                      {item.GENDER == "M" ? "Nam" : "Nữ"}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={"/storemanage/account/edit/" + item.CUSTOMER_ID}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-3"
                      >
                        Sửa
                      </a>
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => {
                          setDeletingItemId(item.CUSTOMER_ID);
                          setIsShowModal(true);
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {isShowModal && (
        <Modal
          handle={handleDelete}
          hide={() => setIsShowModal(false)}
          content={"Xóa sản phảm có CUSTOMER_ID là " + deletingItemId}
          action="Xóa"
          title="Xóa"
        />
      )}
    </div>
  );
}

export default UserList;
