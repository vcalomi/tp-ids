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
  async getAddress(addressId) {
    const address = await prisma.address.findUnique({
      where: {
        id: parseInt(addressId)
      },
    })
    return address;
  },
  async deleteAddress(addressId) {
    const deleteAddress = await prisma.address.delete({
      where: {
        id: parseInt(addressId)
      },
    })
    return deleteAddress
  }
};

module.exports = AddressRepository;
