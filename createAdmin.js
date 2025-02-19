const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createAdmin() {
  await prisma.appUser.create({
    data: {
      username: "admin",
      password: "1234",
      role: "ADMIN",
    },
  });
}

module.exports = {
  createAdmin,
};
