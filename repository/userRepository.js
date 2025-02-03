const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserRepository = {
  async findUser(username) {
    const user = await prisma.appUser.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  },
  async findUserById(userId) {
    const user = await prisma.appUser.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  },
  async createUser(username, password) {
    const user = await prisma.appUser.create({
      data: {
        username: username,
        password: password,
        role: "USER",
      },
    });
    return user;
  },
};

module.exports = UserRepository;
