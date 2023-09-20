// next-auth.d.ts

import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    googleId?: string;
  }
}
