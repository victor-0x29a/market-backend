import AuthController from "../../Controllers/Auth";

describe("Login Test", () => {
  test("Credentials valid", () => {
    expect(
      async () =>
        await AuthController.login({
          firstName: "Gomes",
          password: "senha123",
          phone: 67993462261,
          role: "administrador",
        })
    ).toBe(2);
  });
});
