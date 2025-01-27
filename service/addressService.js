const AddressRepository = require("../repository/addressRepository.js");

function validateAddressData(data) {
  const { number, street, city, province, zipCode } = data;

  if (!city || city.trim().length === 0) {
    throw new Error("Address city is required and cannot be empty");
  }

  if (!street || street.trim().length === 0) {
    throw new Error("Address street is required and cannot be empty");
  }

  if (number == null || number < 0) {
    throw new Error("Address number must be a positive number");
  }

  if (!province || province.trim().length === 0) {
    throw new Error("Address province is required and cannot be empty");
  }

  if (zipCode == null || zipCode < 0) {
    throw new Error("Address zipCode must be a positive number");
  }
}

async function addAddress(addressData) {
  console.log(addressData);
  const parsedData = {
    street: addressData.street,
    number: parseInt(addressData.number),
    zipCode: parseInt(addressData.zipCode),
    province: addressData.province,
    city: addressData.city,
  };
  validateAddressData(parsedData);
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
