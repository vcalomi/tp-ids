const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("1234", 10);

  await prisma.appUser.create({
    data: {
      username: "admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Usuario admin creado:", admin);
}

module.exports = createAdmin;
