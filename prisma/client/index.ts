import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient | undefined = undefined;

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient();
} else {
  if (!prismaClient) {
    prismaClient = new PrismaClient({
      log: ["query"],
    });
  }
}

export default prismaClient!;
