import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentailsProvider from "next-auth/providers/credentials";
import UserModel from "../../../../../Models/UserModel";
import mongoose from "mongoose";
import connectDb from "../../../../../lib/connectDb";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { toast } from "react-hot-toast";

export const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentailsProvider({
      async authorize(credentials) {
        const response = await axios.post("http://localhost:3000/api/signin", {
          ...credentials,
        });

        if (response.status == 200) {
          return response.data;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.type === "oauth") {
        await axios.post("http://localhost:3000/api/signup", {
          ...user,
          ...account,
        });
      }

      return user;
    },
    async session({ session, trigger, newSession }) {
      return session;
    },
  },
};
