import NextAuth, { Account, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin

      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user!.email = token.sub;
      return session;
    },
  },
});

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   // callbacks: {
//   //   async signIn({ user, account, profile }) {
//   //     if (account?.provider === "google" && profile?.sub) {
//   //       // Include the Google ID in the user object
//   //       // Include the Google ID in the user object
//   //       const updatedUser = {
//   //         ...user,
//   //         id: profile.sub,
//   //         googleId: profile.sub,
//   //       };
//   //       return Promise.resolve(updatedUser);
//   //     }
//   //     return Promise.resolve(false);
//   //   },
//   //   // async session({ session, user }) {
//   //   //   if (user?.id && user.googleId) {
//   //   //     session.user!.id = user.id;
//   //   //     session.user.googleId = user.googleId;
//   //   //   }
//   //   //   return session;
//   //   // },
//   // },

//   callbacks: {
//     async signIn(params) {
//       const { user, account, profile } = params as {
//         user: User | undefined;
//         account: Account | null;
//         profile?:
//           | {
//               sub?: string;
//             }
//           | undefined;
//       };

//       if (account?.provider === "google" && profile?.sub) {
//         // Include the Google ID in the user object
//         return Promise.resolve({
//           ...(user || {}), // Ensure user exists
//           id: profile.sub,
//           googleId: profile.sub,
//         });
//       }
//       return Promise.resolve(false);
//     },
//     async session(session:any, user:any) {
//       if (user?.id && user.googleId) {
//         session.user.id = user.id;
//         session.user.googleId = user.googleId;
//       }
//       return session;
//     },
//   },

//   // callbacks: {
//   //   async signIn({ user, account, profile }) {
//   //     if (account?.provider === "google" && profile?.sub) {
//   //       // Access the Google ID from the profile object
//   //       console.log("Google ID:", profile?.sub);

//   //       // Include the Google ID in the session object
//   //       return Promise.resolve({
//   //         ...user,
//   //         id: profile.sub, // Add the Google ID as 'id'
//   //       });
//   //     }
//   //     return Promise.resolve(false);
//   //   },
//   // },

//   // callbacks: {
//   //   profile(profile:any) {
//   //     // Set the user's ID to their Google ID.
//   //     profile.id = profile.googleId;

//   //     return profile;
//   //   },
//   // },
//   // callbacks: {
//   //   async signIn({ user, account, profile }) {
//   //     if (account?.provider === "google") {
//   //       // Include the Google ID in the user object
//   //       (user as any).googleId = profile?.sub;
//   //     }
//   //     return true;
//   //   },
//   // },
// });

export { handler as GET, handler as POST };
