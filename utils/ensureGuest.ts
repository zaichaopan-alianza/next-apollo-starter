import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "./getServerSession";

export async function ensureGuest(context: GetServerSidePropsContext) {  
  const session = await getServerSession(context)

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
