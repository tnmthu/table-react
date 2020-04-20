import { isName, isAge, isMoney } from '../services/validate';

describe("Test validator", () => {

  describe("Test isName validator function", () => {

    test('if isName return resolve', async () => {
      await expect(isName(null, 'Thu Tran')).resolves.toBe();
    });

    test("if isName return resolve 2", async () => {
      await expect(isName(null, 'Haha')).resolves.toBe();
    });

    test("if isName return resolve lowercase", async () => {
      await expect(isName(null, "ten khong in hoa")).resolves.toBe();
    });

    test("if isName return resolve uppercase", async () => {
      await expect(isName(null, "SCREAMMMMM")).resolves.toBe();
    });

    test("if isName return error when name contains number", () => {
      return expect(isName(null, "Thu cut3")).rejects.toMatch("Wrong name format.");
    });

    test("if isName return error when name contains symbols", () => {
      return expect(isName(null, "Thu!!!!")).rejects.toMatch("Wrong name format.");
    });

    test("if isName return error when name contains symbols 2", () => {
      return expect(isName(null, "Thu?")).rejects.toMatch("Wrong name format.");
    });

    test("if isName return error when name contains symbols 3", () => {
      return expect(isName(null, "Thu{}")).rejects.toMatch("Wrong name format.");
    });

    test("if isName return error when name contains symbols 4", () => {
      return expect(isName(null, "'Thu'")).rejects.toMatch("Wrong name format.");
    });

    test("if isName return error when name empty", () => {
      return expect(isName(null, "")).rejects.toMatch("Wrong name format.");
    });
  });

  describe('Test isAge validator function', () => {

    test("if isAge return resolve", async () => {
      await expect(isAge(null, 21)).resolves.toBe();
    });

    test("if isAge return resolve 2", async () => {
      await expect(isAge(null, 33)).resolves.toBe();
    });

    test("if isAge return resolve 3", async () => {
      await expect(isAge(null, 64)).resolves.toBe();
    });

    test("if isAge return error when age <= 20", () => {
      return expect(isAge(null, 2)).rejects.toMatch("Age must be an integer, > 20, < 65.");
    });

    test("if isAge return error when age <= 20 2", () => {
      return expect(isAge(null, 2)).rejects.toMatch("Age must be an integer, > 20, < 65.");
    });

    test("if isAge return error when age > 65", () => {
      return expect(isAge(null, 66)).rejects.toMatch("Age must be an integer, > 20, < 65.");
    });

    test("if isAge return error when age > 65 2", () => {
      return expect(isAge(null, 100)).rejects.toMatch("Age must be an integer, > 20, < 65.");
    });

    test("if isAge return error when input alphabet", () => {
      return expect(isAge(null, "abc")).rejects.toMatch("Age must be an integer, > 20, < 65.");
    });

    test("if isAge return error when input alpha-numeric", () => {
      return expect(isAge(null, "21abc")).rejects.toMatch("Age must be an integer, > 20, < 65.");
    });

    test("if isAge return error when input space", () => {
      return expect(isAge(null, "  ")).rejects.toMatch("Age must be an integer, > 20, < 65.");
    });

    test("if isAge return error when input symbols", () => {
      return expect(isAge(null, "!@#")).rejects.toMatch("Age must be an integer, > 20, < 65.");
    });

    test("if isAge return error when null", () => {
      return expect(isAge(null, null)).rejects.toMatch("Age must be an integer, > 20, < 65.");
    });

    test("if isAge return error when input empty string", () => {
      return expect(isAge(null, "")).rejects.toMatch("Age must be an integer, > 20, < 65.");
    });
  });
  
  describe('Test isMoney validator function', () => {
    test("if it return resolve when input correctly", async () => {
      await expect(isMoney(null, 1)).resolves.toBe();
    });
    
    test("if it return resolve when input correctly 2", async () => {
      await expect(isMoney(null, 1000)).resolves.toBe();
    });

    test("if it return resolve when input correctly 3", async () => {
      await expect(isMoney(null, 123456789)).resolves.toBe();
    });

    test("if it return resolve when input correctly 4", async () => {
      await expect(isMoney(null, 0)).resolves.toBe();
    });

    test("if it return error when input alphabet", () => {
      return expect(isMoney(null, "abc")).rejects.toMatch("Salary must be in money type. Eg. 1000000");
    });

    test("if it return error when input alpha-numeric", () => {
      return expect(isMoney(null, "1000abc")).rejects.toMatch("Salary must be in money type. Eg. 1000000");
    });

    test("if it return error when input negative", () => {
      return expect(isMoney(null, "-1000")).rejects.toMatch("Salary must be in money type. Eg. 1000000");
    });

    test("if it return error when input symbol", () => {
      return expect(isMoney(null, "!@#")).rejects.toMatch("Salary must be in money type. Eg. 1000000");
    });

    test("if it return error when input space", () => {
      return expect(isMoney(null, "  ")).rejects.toMatch("Salary must be in money type. Eg. 1000000");
    });
  })
});