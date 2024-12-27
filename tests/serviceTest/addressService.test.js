const addressService = require("../../service/addressService.js");
const addressRepository = require("../../repository/addressRepository.js");

jest.mock("../../repository/addressRepository.js");

describe("Address Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("can add an address with correct data", async () => {
    const addressData = {
      number: 634,
      street: "Bahia Blanca",
      city: "Llavallol",
      province: "Buenos Aires",
      zipCode: 1836,
    };

    const expectedResult = {
      id: 1,
      number: addressData.number,
      street: addressData.street,
      city: addressData.city,
      province: addressData.province,
      zipCode: addressData.zipCode,
    };

    addressRepository.addAddress.mockResolvedValue(expectedResult);

    const result = await addressService.addAddress(addressData);

    expect(addressRepository.addAddress).toHaveBeenCalledWith(addressData);
    expect(result).toEqual(expectedResult);
  });
});
