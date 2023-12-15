import { NextAuthOptions, Session, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  secret: "kkk",
  providers: [
    CredentialProvider({
      id: "user",
      name: "user",
      type: "credentials",
      credentials: {
        username: {
          label: "UserName",
          type: "text",
          placeholder: "",
        },
        password: {
          label: "Password",
          type: "text",
          placeholder: "",
        },
      },
      async authorize(credentials, req): Promise<any> {
        let res: Response = await fetch("http://localhost:8081/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        if (!res.ok) return null;
        let user:
          | { access_token: string; value: userSummaryInfo }
          | errRequest = await res.json();
        if (res.ok && "value" in user) {
          return user;
        }
        return null;
      },
    }),
    CredentialProvider({
      id: "admin",
      name: "admin",
      type: "credentials",
      credentials: {
        username: {
          label: "UserName",
          type: "text",
          placeholder: "",
        },
        password: {
          label: "Password",
          type: "text",
          placeholder: "",
        },
      },
      async authorize(credentials, req): Promise<any> {
        let res: Response = await fetch(
          "http://localhost:8081/auth/AdminLogin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          }
        );
        if (!res.ok) return null;
        let user:
          | { access_token: string; value: userSummaryInfo }
          | errRequest = await res.json();
        if (res.ok && "value" in user) {
          console.log("kkk ", user);
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user = {
        access_token: "",
        value: {
          CUSTOMER_ID: undefined,
          FIRST_NAME: "",
          AVATAR: "",
          ROLE: "",
        },
      },
    }) {
      // the user present here gets the same data as received from DB call  made above -> fetchUserInfo(credentials.opt)
      // console.log("jwt", { ...user, ...token });
      return { ...user, ...token };
    },
    session: async ({ session, token, user }) => {
      // user param present in the session(function) does not recive all the data from DB call -> fetchUserInfo(credentials.opt)

      let ss = {
        ...session,
        user: { ...token },
      };
      // console.log("ss", ss);
      return ss;
    },
  },
  pages: {
    signIn: "/login",
  },
};
