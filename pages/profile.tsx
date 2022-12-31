import type { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { ensureAuth } from "../utils/ensureAuth";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return ensureAuth(context);
}

export default function Profile({ session }) {
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </div>
  );
}
