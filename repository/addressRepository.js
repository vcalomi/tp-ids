const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AddressRepository = {
  async addAddress(addressData) {
    const address = await prisma.address.create({
      data: {
        number: addressData.number,
        street: addressData.street,
        city: addressData.city,
        province: addressData.province,
        zipCode: addressData.zipCode,
      },
    });
    return address;
  },
};

module.exports = AddressRepository;
