import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/config/mongodb"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import User from "@/models/User"
import { verifyPassword } from "@/config/utils"
import dbConnect from "@/config/db"
// import Role from "@/models/Role"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect()

        // Validate input
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const user = await User.findOne({ email: credentials.email })
        
        if (!user) {
          throw new Error("No user found with this email")
        }

        const isValid = await verifyPassword(credentials.password, user.password)
        
        if (!isValid) {
          throw new Error("Incorrect password")
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
          // role: user.role,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true, // Enable account linking
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (user) {
        token.id = user.id
         // Add role to token if it exists
        // if (user.role) {
        //   token.role = user.role
        // }
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
         // Add role to session
        //  session.user.role = token.role
      }
      return session
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   try {
        
    //     // You can add additional sign-in validation here if needed
    //     if (account?.provider === 'credentials') {
    //       // Additional checks for credentials provider if necessary
    //       if (!user.email) {
    //         throw new Error("Email is required")
    //       }
    //     }
    //     return true
    //   } catch (error) {
    //     // Log the error
    //     console.error("SignIn error:", error)
        
    //     // Pass error message to the error page
    //     const errorMessage = error instanceof Error ? error.message : "Authentication failed"
    //     return `/auth/error?error=${encodeURIComponent(errorMessage)}`
    //   }
    // },

    async signIn({ user, account, profile, email, credentials }) {
      try {
        await dbConnect()

        if (account?.provider === 'google') {
          // For Google sign-in, check if user exists and has a role
          const existingUser = await User.findOne({ email: user.email })
          
          if (!existingUser) {
            // Create new user with default role for Google sign-in
            // const defaultRole = await Role.findOne({ name: "User" }) ||
            //   await Role.create({ name: "User" })

            const newUser = await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
              // role: defaultRole._id,
            })
          }
        }

        return true
      } catch (error) {
        console.error("SignIn error:", error)
        const errorMessage = error instanceof Error ? error.message : "Authentication failed"
        return `/auth/error?error=${encodeURIComponent(errorMessage)}`
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

// Add type declarations for role in session
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image?: string
      role?: {
        _id: string
        name: string
      }
    }
  }

  interface User {
    role?: {
      _id: string
      name: string
    }
  }
}