const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createAdmin() {
  try {
    await prisma.appUser.create({
      data: {
        username: "vcalomino",
        password: "1234",
        role: "ADMIN",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createAdmin,
};
