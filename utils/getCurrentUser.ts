import type {
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "./getServerSession";
import prismaClient from "../prisma/client";
import { CurrentUser } from "../pages/api/graphql";

export async function getCurrentUser({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<CurrentUser> {
  const session = await getServerSession({
    req,
    res,
  });
  const email = session?.user?.email;

  if (email) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },

      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return user;
  }

  return null;
}
