const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

// Función para crear un admin si no existe
async function createAdmin() {
  const hashedPassword = await bcrypt.hash("1234", 10);

  await prisma.appUser.create({
    data: {
      username: "vcalomi",
      password: hashedPassword,
      role: "USER",
    },
  });

  console.log("Usuario admin creado:", admin);
}

module.exports = createAdmin;
