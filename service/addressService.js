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
  validateAddressData(addressData);
  return AddressRepository.addAddress(addressData);
}

async function getAddress(id) {
  return AddressRepository.getAddress(id);
}

module.exports = {
  addAddress,
  getAddress,
};
