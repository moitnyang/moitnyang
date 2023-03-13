import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcryptjs";

// const client_id = "337106084645-8nha4v8f3vg4fut11gjs9qhrp6nbumuk.apps.googleusercontent.com"
// const client_secret = "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"

// GITHUB_ID = f266d57c5b576b16893b
// GITHUB_SECRET = 8c5b8c8b200ab2c522f2253893f55a9153a2490c

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
      // credentials : { id:credentials.id, password:credentials.password },
      async authorize(credentials, req) {
        let result;
        await fetch(
          `http://localhost:3000/api/auth/signup?password=${credentials.password}&id=${credentials.id}`,
          { headers: { "Content-Type": "application/json" } }
        )
          .then((res) => res.json())
          .then((users) => (result = users));

        if (!result) {
          throw new Error("No user Found with Id Please Sign Up...");
        }

        //compare()
        // const checkPassword = await compare(credentials.password, result.password);

        //incorrect password
        if (
          result[0].password !== credentials.password ||
          result[0].id !== credentials.id
        ) {
          throw new Error("Username or Password doesn't match");
        }

        // console.log(result)
        return result;
      },
    }),
  ],
});
