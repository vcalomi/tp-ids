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

async function validateAddressOwnership(addressId, userId) {
  const user = await authService.findUserById(userId);
  if (!user) {
    return false;
  }
  if (user.address.id !== addressId) {
    return false;
  }
  return true;
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

async function getAddress(userId) {
  const user = await authService.findUserById(userId);
  return user.address;
}

async function deleteAddress(addressId, userId) {
  if (!validateAddressOwnership(addressId, userId)) {
    throw new Error("Error when checking address ownership");
  }
  try {
    return AddressRepository.deleteAddress(addressId, userId);
  } catch (error) {
    throw new Error("The address doesn't exist");
  }
}

async function updateAddress(addressData, userId) {
  validateAddressData(addressData);
  if (!validateAddressOwnership(addressData.id, userId)) {
    throw new Error("Error when checking address ownership");
  }
  return AddressRepository.updateAddress(addressData);
}

module.exports = {
  addAddress,
  getAddress,
  deleteAddress,
  updateAddress,
};
