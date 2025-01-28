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

  test("can't add address with null number", async () => {
    const addressData = {
      number: null,
      street: "Bahia Blanca",
      city: "Llavallol",
      province: "Buenos Aires",
      zipCode: 1836,
    };

    await expect(addressService.addAddress(addressData)).rejects.toThrow();

    expect(addressRepository.addAddress).not.toHaveBeenCalled();
  });

  test("can't add address with a number less than 0", async () => {
    const addressData = {
      number: -1,
      street: "Bahia Blanca",
      city: "Llavallol",
      province: "Buenos Aires",
      zipCode: 1836,
    };

    await expect(addressService.addAddress(addressData)).rejects.toThrow();

    expect(addressRepository.addAddress).not.toHaveBeenCalled();
  });

  test("can't add address with null city", async () => {
    const addressData = {
      number: 634,
      street: "Bahia Blanca",
      city: null,
      province: "Buenos Aires",
      zipCode: 1836,
    };

    await expect(addressService.addAddress(addressData)).rejects.toThrow();

    expect(addressRepository.addAddress).not.toHaveBeenCalled();
  });

  test("can't add address with city being empty", async () => {
    const addressData = {
      number: 634,
      street: "Bahia Blanca",
      city: "",
      province: "Buenos Aires",
      zipCode: 1836,
    };

    await expect(addressService.addAddress(addressData)).rejects.toThrow();

    expect(addressRepository.addAddress).not.toHaveBeenCalled();
  });

  test("can't add address with null street", async () => {
    const addressData = {
      number: 634,
      street: null,
      city: "Llavallol",
      province: "Buenos Aires",
      zipCode: 1836,
    };

    await expect(addressService.addAddress(addressData)).rejects.toThrow();

    expect(addressRepository.addAddress).not.toHaveBeenCalled();
  });

  test("can't add address with empty street", async () => {
    const addressData = {
      number: 634,
      street: "",
      city: "Llavallol",
      province: "Buenos Aires",
      zipCode: 1836,
    };

    await expect(addressService.addAddress(addressData)).rejects.toThrow();

    expect(addressRepository.addAddress).not.toHaveBeenCalled();
  });

  test("can't add address with null province", async () => {
    const addressData = {
      number: 634,
      street: "Bahia Blanca",
      city: "Llavallol",
      province: null,
      zipCode: 1836,
    };

    await expect(addressService.addAddress(addressData)).rejects.toThrow();

    expect(addressRepository.addAddress).not.toHaveBeenCalled();
  });

  test("can't add address with empty province", async () => {
    const addressData = {
      number: 634,
      street: "Bahia Blanca",
      city: "Llavallol",
      province: "",
      zipCode: 1836,
    };

    await expect(addressService.addAddress(addressData)).rejects.toThrow();

    expect(addressRepository.addAddress).not.toHaveBeenCalled();
  });

  test("can't add address with null zipcode", async () => {
    const addressData = {
      number: 634,
      street: "Bahia Blanca",
      city: "Llavallol",
      province: "Buenos Aires",
      zipCode: null,
    };

    await expect(addressService.addAddress(addressData)).rejects.toThrow();

    expect(addressRepository.addAddress).not.toHaveBeenCalled();
  });

  test("can't add address with a zipcode less than 0", async () => {
    const addressData = {
      number: 634,
      street: "Bahia Blanca",
      city: "Llavallol",
      province: "Buenos Aires",
      zipCode: -2,
    };

    await expect(addressService.addAddress(addressData)).rejects.toThrow();

    expect(addressRepository.addAddress).not.toHaveBeenCalled();
  });

  test("can get an address that exists", async () => {
    const mockId = 1;
    const addressData = {
      number: 634,
      street: "Bahia Blanca",
      city: "Llavallol",
      province: "Buenos Aires",
      zipCode: 1836,
    };

    const expectedResult = {
      id: mockId,
      number: addressData.number,
      street: addressData.street,
      city: addressData.city,
      province: addressData.province,
      zipCode: addressData.zipCode,
    };

    addressRepository.getAddress.mockResolvedValue(expectedResult);

    const result = await addressService.getAddress(mockId);

    expect(addressRepository.getAddress).toHaveBeenCalledWith(mockId);
    expect(result).toEqual(expectedResult);
  });

  test("can't get an address that doesn't exists", async () => {
    const mockId = 1;
    addressRepository.getAddress.mockResolvedValue(null);
    const result = await addressService.getAddress(mockId);
    expect(addressRepository.getAddress).toHaveBeenCalledWith(mockId);
    expect(result).toEqual(null);
  });

  test("can delete an address that exists", async () => {
    const mockId = 1;
    const addressData = {
      number: 634,
      street: "Bahia Blanca",
      city: "Llavallol",
      province: "Buenos Aires",
      zipCode: 1836,
    };

    const expectedResult = {
      id: mockId,
      number: addressData.number,
      street: addressData.street,
      city: addressData.city,
      province: addressData.province,
      zipCode: addressData.zipCode,
    };

    addressRepository.deleteAddress.mockResolvedValue(expectedResult);

    const deleteResult = await addressService.deleteAddress(mockId);

    expect(addressRepository.deleteAddress).toHaveBeenCalledWith(mockId);
    expect(deleteResult).toEqual(expectedResult);

    addressRepository.getAddress.mockResolvedValue(null);

    const getResult = await addressService.getAddress(mockId);

    expect(addressRepository.getAddress).toHaveBeenCalledWith(mockId);
    expect(getResult).toEqual(null);
  });

  test("can't delete an address that doesn't exists", async () => {
    const mockId = 1;

    addressRepository.deleteAddress.mockRejectedValue(new Error());

    await expect(addressService.deleteAddress(mockId)).rejects.toThrow();

    expect(addressRepository.deleteAddress).toHaveBeenCalledWith(mockId);
  });
});
