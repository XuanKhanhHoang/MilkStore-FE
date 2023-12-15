import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";
export function middleware(request: Request) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);

  const pathname = new URL(request.url).pathname;
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-url", request.url);
  // console.log("dd ", pathname);
  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}

// export const config = { matcher: ["/customer"] };
