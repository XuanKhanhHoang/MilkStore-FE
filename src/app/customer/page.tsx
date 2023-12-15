import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { CUSTOMER_DTO } from "./cutomer.dto";
import { customerRole } from "../storemanage/login/roles.enum";

export default async function page() {
  const session = await getServerSession(options);
  console.log(session?.user?.value.ROLE);
  if (!session || session.user?.value.ROLE != customerRole) {
    return redirect("/login");
  }
  let res: Response = await fetch("http://localhost:8081/customer/detail", {
    headers: {
      Authorization: "Bearer " + session.user?.access_token,
    },
  });
  let data: CUSTOMER_DTO | errRequest;
  if (res.ok) {
    data = await res.json();
    if ("message" in data) {
      return <p>Server Error</p>;
    }

    return (
      <div className="bg-gray-100">
        <div className="max-w-screen-xl mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                    alt=""
                  />
                </div>
                <img
                  src={data.AVATAR || "/defaultavatar.jfif"}
                  alt=""
                  className="h-[200px]"
                />
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  {data.LOGIN_NAME}
                </h1>
              </div>
              <div className="my-4" />
            </div>
            <div className="w-full md:w-9/12 mx-2 ">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Tên</div>
                      <div className="px-4 py-2">{data.FIRST_NAME}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Họ</div>
                      <div className="px-4 py-2">{data.LAST_NAME}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Giới tính</div>
                      <div className="px-4 py-2">
                        {data.GENDER == "M" ? "Nam" : "Nữ"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Số điện thoại
                      </div>
                      <div className="px-4 py-2">{data.PHONE_NUMBER}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Địa chỉ</div>
                      <div className="px-4 py-2">{data.ADDRESS}</div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800"
                          href="mailto:jane@example.com"
                        >
                          {data.EMAIL_ADDRESS}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4" />
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">
                      Các đơn hàng đang giao :
                    </span>
                  </div>
                  <ul className="list-inside space-y-2">
                    {data.orders.deliveringOrders.map((item, index) => {
                      return (
                        <li key={item.ORDER_ID}>
                          <div className="text-teal-600">{item.ORDER_NAME}</div>
                          <div className="text-blue-500 text-sm">
                            Trạng thái đơn hàng:{" "}
                            <span className="font-medium text-black">
                              {" "}
                              {item.order_status.STATUS_NAME}
                            </span>
                          </div>
                          <div className="text-red-600 text-md">
                            {item.PRICE} đ
                          </div>
                          <div className="text-gray-500 text-xs">
                            Thời gian đặt: {item.ORDER_DATE}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Lịch sử đơn hàng :</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    {data.orders.otherOrders.map((item, index) => {
                      return (
                        <li key={item.ORDER_ID}>
                          <div className="text-teal-600">{item.ORDER_NAME}</div>
                          <div className="text-blue-500 text-sm">
                            Trạng thái đơn hàng:{" "}
                            <span className="font-medium text-black">
                              {" "}
                              {item.order_status.STATUS_NAME}
                            </span>
                          </div>
                          <div className="text-red-600 text-md">
                            {item.PRICE} đ
                          </div>
                          <div className="text-gray-500 text-xs">
                            Thời gian đặt: {item.ORDER_DATE}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Something wrong</p>;
  }
}
