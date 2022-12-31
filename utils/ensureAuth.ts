import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "./getServerSession";

export async function ensureAuth(context: GetServerSidePropsContext) {
  const session = await getServerSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}