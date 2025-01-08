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
    const deletedAddress = await prisma.address.delete({
      where: {
        id: parseInt(addressId)
      },
    })
    return deletedAddress
  },
  async updateAddress(addressData) {
    const updatedAddress = await prisma.address.update({
      where: {
        id: parseInt(addressData.id)
      },
      data: {
        number: addressData.number,
        street: addressData.street,
        city: addressData.city,
        province: addressData.province,
        zipCode: addressData.zipCode,
      },
    })
    return updatedAddress
  }
};

module.exports = AddressRepository;
