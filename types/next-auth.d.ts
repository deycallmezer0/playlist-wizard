// types/next-auth.d.ts

import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      id: string
    } & DefaultSession["user"]
  }
  interface User {
    id: string
  }
  interface Track {
    id: string
    name: string
    artists: { name: string }[]
    album: { name: string }
  }
}