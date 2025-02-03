const AddressRepository = require("../repository/addressRepository.js");
const authService = require("./authService.js");

async function validateAddressData(data) {
  const { number, street, city, province, zipCode, userId } = data;

  if (userId) {
    const user = await authService.findUserById(userId);
    if (!user) {
      throw new Error("User doesn't exist");
    }
  }

  if (!city || city.trim().length === 0) {
    throw new Error("Address city is required and cannot be empty");
  }

  if (!street || street.trim().length === 0) {
    throw new Error("Address street is required and cannot be empty");
  }

  if (number == null || isNaN(number) || number < 0) {
    throw new Error("Address number must be a positive number");
  }

  if (!province || province.trim().length === 0) {
    throw new Error("Address province is required and cannot be empty");
  }

  if (zipCode == null || isNaN(zipCode) || zipCode < 0) {
    throw new Error("Address zipCode must be a positive number");
  }
}

async function addAddress(addressData) {
  const parsedData = {
    userId: parseInt(addressData.userId),
    street: addressData.street,
    number: parseInt(addressData.number),
    zipCode: parseInt(addressData.zipCode),
    province: addressData.province,
    city: addressData.city,
  };
  await validateAddressData(addressData);
  return AddressRepository.addAddress(parsedData);
}

async function getAddress(id) {
  return AddressRepository.getAddress(id);
}

async function deleteAddress(id) {
  try {
    return AddressRepository.deleteAddress(id);
  } catch (error) {
    throw new Error("La direccion no existe.");
  }
}

async function updateAddress(addressData) {
  validateAddressData(addressData);
  return AddressRepository.updateAddress(addressData);
}

module.exports = {
  addAddress,
  getAddress,
  deleteAddress,
  updateAddress,
};
