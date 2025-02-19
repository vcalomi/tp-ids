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
      include: {
        address: true,
        orders: {
          include: {
            products: {
              include: {
                product: true,
              },
            },
          },
        },
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
  async getUsers() {
    const users = await prisma.appUser.findMany();
    return users;
  },
  async changeRole(userId, newRole) {
    await prisma.appUser.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        role: newRole,
      },
    });
  },
};

module.exports = UserRepository;
