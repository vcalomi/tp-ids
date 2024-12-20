const productService = require("../../service/productService.js");
const productRepository = require("../../repository/productRepository.js");

jest.mock("../../repository/productRepository.js");

describe("Product Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("can create a product with correct data", async () => {
    const productData = {
      name: "Cheesecake",
      value: 4000,
      description: "Con berries",
      type: ["Dulce", "Comida"],
      calories: 465,
    };

    const expectedResult = {
      id: 1,
      createdAt: Date.now(),
      name: productData.name,
      value: productData.value,
      description: productData.description,
      type: productData.type,
      calories: productData.calories,
    };

    productRepository.createProduct.mockResolvedValue(expectedResult);

    const result = await productService.createProduct(productData);

    expect(productRepository.createProduct).toHaveBeenCalledWith(productData);
    expect(result).toEqual(expectedResult);
  });

  test("can't create a product with null name field", async () => {
    const invalidProductData = {
      name: null,
      value: 4000,
      description: "Con berries",
      type: ["Dulce", "Comida"],
      calories: 465,
    };

    expect(() =>
      productService.createProduct(invalidProductData)
    ).rejects.toThrow();
  });

  test("can't create a product with empty name", async () => {
    const invalidProductData = {
      name: "",
      value: 4000,
      description: "Con berries",
      type: ["Dulce", "Comida"],
      calories: 465,
    };

    expect(() =>
      productService.createProduct(invalidProductData)
    ).rejects.toThrow();
  });

  test("can't create a product with null value field", async () => {
    const invalidProductData = {
      name: "Cheesecake",
      value: null,
      description: "Con berries",
      type: ["Dulce", "Comida"],
      calories: 465,
    };

    expect(() =>
      productService.createProduct(invalidProductData)
    ).rejects.toThrow();
  });

  test("can't create a product with a negative value", async () => {
    const invalidProductData = {
      name: "Cheesecake",
      value: -5,
      description: "Con berries",
      type: ["Dulce", "Comida"],
      calories: 465,
    };

    expect(() =>
      productService.createProduct(invalidProductData)
    ).rejects.toThrow();
  });

  test("can't create a product with null description field", async () => {
    const invalidProductData = {
      name: "Cheesecake",
      value: 4000,
      description: null,
      type: ["Dulce", "Comida"],
      calories: 465,
    };

    expect(() =>
      productService.createProduct(invalidProductData)
    ).rejects.toThrow();
  });

  test("can't create a product with empty description", async () => {
    const invalidProductData = {
      name: "Cheesecake",
      value: 4000,
      description: "",
      type: ["Dulce", "Comida"],
      calories: 465,
    };

    expect(() =>
      productService.createProduct(invalidProductData)
    ).rejects.toThrow();
  });

  test("can't create a product with null type field", async () => {
    const invalidProductData = {
      name: "Cheesecake",
      value: 4000,
      description: "Con berries",
      type: null,
      calories: 465,
    };

    expect(() =>
      productService.createProduct(invalidProductData)
    ).rejects.toThrow();
  });

  test("can't create a product with empty type", async () => {
    const invalidProductData = {
      name: "Cheesecake",
      value: 4000,
      description: "Con berries",
      type: [],
      calories: 465,
    };

    expect(() =>
      productService.createProduct(invalidProductData)
    ).rejects.toThrow();
  });

  test("can't create a product with null calories field", async () => {
    const invalidProductData = {
      name: "Cheesecake",
      value: 4000,
      description: "Con berries",
      type: ["Dulce", "Comida"],
      calories: null,
    };

    expect(() =>
      productService.createProduct(invalidProductData)
    ).rejects.toThrow();
  });

  test("can't create a product with negative calories", async () => {
    const invalidProductData = {
      name: "Cheesecake",
      value: 4000,
      description: "Con berries",
      type: ["Dulce", "Comida"],
      calories: -2,
    };

    expect(() =>
      productService.createProduct(invalidProductData)
    ).rejects.toThrow();
  });
});
