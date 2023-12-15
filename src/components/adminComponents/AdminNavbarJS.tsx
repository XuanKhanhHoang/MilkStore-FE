"use client";

import { Collapse } from "flowbite";
import React from "react";

function AdminNavbarJS() {
  if (typeof window !== "undefined") {
    const options = {};
    const $targetEl = document.getElementById("sidebar");
    const $triggerEl = document.getElementById("toggleSidebarMobile");
    $triggerEl?.addEventListener("click", () => {
      $targetEl?.classList.contains("hidden")
        ? $targetEl.classList.remove("hidden")
        : $targetEl?.classList.add("hidden");
      console.log("kk");
    });
  }
  return <div></div>;
}

export default AdminNavbarJS;
