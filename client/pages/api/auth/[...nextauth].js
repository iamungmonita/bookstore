import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import AdminModel from '../../../../server/models/admin'
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.

            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const { email, password } = credentials
                //   const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                if (email !== 'iamungmonita@gmail.com' || password !== '092988227') {
                    throw new Error('invalid admin')
                } else {
                    return { id: '12', name: "monita" }
                }

            }
        })
        // ...add more providers here
    ],
}

export default NextAuth(authOptions)