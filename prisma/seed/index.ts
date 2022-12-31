import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import random from "lodash/random";
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

const createRandomUser: () => Promise<Prisma.UserCreateInput> = async () => {
  const passwordHash =  await bcrypt.hash('password', 10)
  return {
    name: faker.internet.userName(),
    email: faker.internet.exampleEmail(),
    passwordHash,
    posts: {
      create: Array.from({ length: random(5, 50) }).map(() => {
        return {
          title: faker.lorem.words(random(3, 8)),
          content: faker.lorem.paragraphs(random(1, 5)),
        };
      }),
    },
  };
};

async function main() {
  console.log(`Start seeding ...`);
  
  for (const i of Array.from({ length: 20 })) {
    const user = await prisma.user.create({
      data: await createRandomUser(),
    });
    console.log(`Created user with id: ${user.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
