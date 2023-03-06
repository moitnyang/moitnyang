import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import connectMongo from '@/database/conn';
import Users from "@/model/Schema";
import { compare } from "bcryptjs";

// const client_id = "337106084645-8nha4v8f3vg4fut11gjs9qhrp6nbumuk.apps.googleusercontent.com"
// const client_secret = "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"

// GITHUB_ID = f266d57c5b576b16893b
// GITHUB_SECRET = 8c5b8c8b200ab2c522f2253893f55a9153a2490c

export default NextAuth({
  providers:[
    //Google Provider
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_SECRET
    }),
    GithubProvider({
      clientId:process.env.GITHUB_ID,
      clientSecret:process.env.GITHUB_SECRET
    }),
    //회원가입
    CredentialsProvider({
      name:"Credential",
      async authorize(credentials, req){
        connectMongo().catch( error => { error:"Connection Failed..." } )

        //check user existance
        const result = await Users.findOne({ email:credentials.email })
        if(!result){
          throw new Error("No user Found with Email Please Sign Up...")
        }

        //compare()
        const checkPassword = await compare(credentials.password, result.password);

        //incorrect password
        if(!checkPassword || result.email !== credentials.email ){
          throw new Error("Username or Password doesn't match")
        }

        return result;

      }
    })
  ]
})