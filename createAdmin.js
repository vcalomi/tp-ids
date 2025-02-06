const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

// Función para crear un admin si no existe
async function createAdmin() {
  const hashedPassword = await bcrypt.hash("1234", 10);

  await prisma.appUser.create({
    data: {
      username: "vcalomino",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Usuario admin creado:", admin);
}

module.exports = createAdmin;
