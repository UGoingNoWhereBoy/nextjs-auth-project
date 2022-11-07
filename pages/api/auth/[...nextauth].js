import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider  from "next-auth/providers/credentials";
import User from '../model/schema';
import connectdb from "../../../db/mongodb";
import { compare } from "bcrypt";
export default NextAuth({
    providers: [
        
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }),
 
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        CredentialsProvider({
          name: "Credentials",
          async authorize(credentials) {

            connectdb();
                
            const result = await User.findOne({"name":credentials.name})

            if(!result){
                throw new Error('User not found')
            }
            
            const checkPassword = await compare(credentials.password, result.password)
        
            if(!checkPassword && result.email !== credentials.email){   
                throw new Error("Username and Password don't match")
            }
            return result;
          }
        }), 
    ],
    pages: {
        signIn: '/login'
    
    },


    secret: process.env.JWT_SECRET
})