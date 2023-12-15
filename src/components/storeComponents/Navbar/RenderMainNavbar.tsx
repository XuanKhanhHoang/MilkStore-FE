"use client";
import { Collapse } from "flowbite";
import "./Navbar.scss";
import { useRouter } from "next/navigation";
import DataManufactureNav from "@/components/storeComponents/Navbar/DataManufactureNav";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import React, { useEffect } from "react";
import { adminRole } from "@/app/storemanage/login/roles.enum";

export default function RenderMainNavbar({
  data,
}: {
  data: categoriesDTO[] | [];
}) {
  const router = useRouter();
  const usSession = useSession();
  let { data: session } = usSession;
  if (usSession.data?.user?.value.ROLE == adminRole) {
    session = null;
  }
  const handleSearch = () => {
    let key: string | undefined = (
      document.getElementById("searchInp") as HTMLInputElement
    )?.value.trim();
    router.push(`/production/find?search_key=${key}`);
  };

  if (typeof window !== "undefined") {
    const options = {};
    const $targetEl = document.getElementById("subNavMobile");
    const $triggerEl = document.getElementById("triggerSubNavMobile");
    const collapse = new Collapse($targetEl, $triggerEl, options);
  }
  const handleLogout = () => {
    signOut();
    router.replace("/");
  };
  const checkValidAccToken = async () => {
    if (
      session?.user?.value.ROLE == adminRole ||
      !session ||
      !session.user?.access_token
    )
      return;
    let res = await fetch("http://localhost:8081/auth/getInfoByAccessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: session?.user?.access_token,
      }),
    });
    if (res.status != 200) {
      signOut();
    }
  };
  useEffect(() => {
    checkValidAccToken();
  }, []);
  return (
    <header className=" sticky mb-4 shadow-sm  bg-[#3d71e7] ">
      <div className="max-w-screen-xl flex items-center mx-auto pb-2 py-3">
        <div
          className="p-2 px-6 block md:hidden cursor-pointer"
          id="triggerSubNavMobile"
        >
          <i className="fa-solid fa-bars text-lg text-white"></i>
        </div>
        <a className="w-[140px] h-[50px] relative mx-auto" href={"/"}>
          <Image src="/logo.png" alt="logo" layout="fill" objectFit="contain" />
        </a>
        <div className=" mx-3 relative w-2/5 hidden md:block shadow-md rounded-md h-9 mx-auto">
          <input
            className="border-0 text-sm font-normal rounded w-full p-2 h-full border-transparent focus:border-transparent focus:ring-0"
            id="searchInp"
            type="text"
            placeholder="Hôm nay bạn cần gì??"
          />
          <button
            className=" absolute  text-black text-xs right-0 w-12 h-full  hover:opacity-30 "
            onClick={handleSearch}
          >
            <i className="fa-solid fa-magnifying-glass text-lg"></i>
          </button>
        </div>
        <div className=" flex justify-center items-center me-8 text-white ">
          {session ? (
            <div className="relative" id="accountInfoContainer">
              <Link className="p-2 me-2 flex items-center" href={"/customer"}>
                <Image
                  src={session?.user?.value.AVATAR || "/img.png"}
                  width={30}
                  height={30}
                  className="rounded-full me-1"
                  alt="avatar"
                />
                <span className="font-semibold hidden md:contents">
                  {session?.user?.value.FIRST_NAME}
                </span>
              </Link>
              <button
                className="font-semibold text-[#3d71e7] ms-2  p-3 absolute bg-white  rounded hidden min-w-[130px]"
                id="btnLogout"
                onClick={handleLogout}
              >
                {" "}
                Đăng xuất
                <i className="fa-solid fa-arrow-right-from-bracket p-1"></i>
              </button>
            </div>
          ) : (
            <Link className="p-2 me-2 flex items-center" href={"/login"}>
              <i className="fa-regular fa-user p-2"></i>
              <span className="font-semibold hidden md:contents">
                Đăng nhập
              </span>
            </Link>
          )}
          <Link className="text-center  " href={""}>
            <div className="relative inline-block me-2">
              <i className="fa-solid fa-cart-shopping p-2 cursor-pointer"></i>
              <span className="bg-orange-500 px-1 absolute rounded font-bold bottom-0 right-0 text-xs">
                0
              </span>
            </div>

            <span className="font-semibold hidden md:contents">Giỏ hàng</span>
          </Link>
        </div>
      </div>

      {/* sidebar */}
      <div className="hidden md:hidden  bg-white" id="subNavMobile">
        <div className="h-[1px] bg-white "></div>

        <div className="relative opacity-100  ">
          <div className="flex items-center p-2 py-3 bg-[#3d71e7] text-white">
            {usSession.data ? (
              <div className="flex items-center p-2 py-3 bg-[#3d71e7] text-white justify-evenly w-full">
                <Link
                  className="p-2 me-2 flex items-center flex-row ms-3"
                  href={"/user/" + session?.user?.value.CUSTOMER_ID}
                >
                  <Image
                    src={session?.user?.value.AVATAR || "/img.png"}
                    width={30}
                    height={30}
                    className="rounded-full me-1"
                    alt="avatar"
                  />
                  <span className="font-semibold md:hidden contents ms-3">
                    {session?.user?.value.FIRST_NAME}
                  </span>
                </Link>
                <button
                  className="font-semibold text-white ms-auto p-3"
                  onClick={handleLogout}
                >
                  {" "}
                  Đăng xuất
                  <i className="fa-solid fa-arrow-right-from-bracket p-1"></i>
                </button>
              </div>
            ) : (
              <Link href={"/login"} className="flex flex-row">
                <button className="bg-white p-2 px-3 rounded-lg ms-3 me-2">
                  <i className="fa-solid fa-user fs-2 text-[#3d71e7]"></i>
                </button>
                <div className="text-white ms-4">
                  <h2 className="font-bold">Đăng nhập</h2>
                  <p className="italic text-sm">
                    Đăng nhập để nhận nhiều ưu đãi
                  </p>
                </div>
              </Link>
            )}
          </div>
          <a className="nav-link" href={`/`}>
            <i className="fa-solid fa-house p-2"></i>
            Trang chủ
          </a>
          <ul className="p-0">
            <li className="bg-[#3d71e7] text-white">
              <p className="text-lg font-semibold p-1 ">
                <i className="fa-solid fa-list p-2"></i>
                Danh mục sản phẩm
              </p>
            </li>
            <DataManufactureNav dataManufactureNav={data} />
          </ul>
        </div>
      </div>

      <nav className="hidden md:block bg-white rounded p-2 w-fit mx-auto my-1 overflow-x-scroll w-full">
        <ul className="flex ">
          <DataManufactureNav dataManufactureNav={data} />
        </ul>
      </nav>
    </header>
  );
}
