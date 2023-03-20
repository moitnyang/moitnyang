import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { executeQuery } from "../db";

export default NextAuth({

  providers: [
    //Google Provider
    GoogleProvider({
      clientId: process.env.Google_ID,
      clientSecret: process.env.Google_SECRET,
    }),

    //Github Provider
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),


    //로그인
    CredentialsProvider({
      name: "Credential", //로그인 페이지에서 양식을 생성하는 데 사용.
      async authorize(credentials, req) {
        console.log(credentials)
        var user = await executeQuery("select * from member where member_id=? and member_pass=?",
            [credentials.id, credentials.password])
          if (user.length > 0) {
            user[0].email = user[0].member_id;
            console.log("g");
            return user[0]
          } else {
            throw new Error("아이디와 비밀번호가 틀립니다.");
          }
        // let user = await fetch(
        //   `http://localhost:3000/api/auth/signup?password=${credentials.password}&id=${credentials.id}`,
        //   { headers: { "Content-Type": "application/json" } }
        // ).then((res) => res.json())
        // if (!user) {
        //   throw new Error("No user Found with Id Please Sign Up...");
        // }
        // if (
        //   user[0].member_id !== credentials.id ||
        //   user[0].member_pass !== credentials.password
        // ) {
        //   throw new Error("Username or Password doesn't match");
        // }
        // if (user) {
        //   /*  console.log(authorize); */
        //   user[0].email = user[0].member_id;
        //   return user[0];
        // }
        // else {
        //   return null;
        // }

      },
    }),

  ],
  secret:'aabb',
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 2 * 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      if(session){
        session.user.email = session.user.email.split("@")[0];
        var snscheck = await executeQuery("select * from member where member_id = ?", [session.user.email])
        var snsPass = "sns"+Math.random().toString(36).substring(5, 8) + session.user.name;
        if (snscheck.length>0) {
          return session;
        } else {
          await executeQuery(
            "insert into member (member_id,member_pass,name) values (?,?,?) ",
            [session.user.email,snsPass, session.user.name]
          );
          
          return session;
        }
      }
      
      return session;
    },
  },

});

