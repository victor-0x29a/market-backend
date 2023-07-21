import AuthController from "../../Controllers/Auth";

describe("Login describer", () => {
  test("Credentials valid", async () => {
    const data = await AuthController.login({
      firstName: "Gomes",
      password: "senha1234",
      phone: 67993462261,
      role: "administrador",
    });
    expect(data.data).toBeDefined();
    return expect(data.data.jwt).toBeDefined();
  });
  test("Credentials invalid", async () => {
    const data = await AuthController.login({
      firstName: "Gomes",
      password: "senha123",
      phone: 67993462261,
      role: "administrador",
    });
    expect(data.data).toBeUndefined();
  });
  test("Body invalid", async () => {
    const data = await AuthController.login({
      firstName: "",
      password: "",
      phone: 67993462261,
      role: "administrador",
    });
    expect(data.data).toBeUndefined();
    const DataCrazy = await AuthController.login({
      firstName:
        "crazyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      password: "senha123",
      phone: 67993462261,
      role: "administrador",
    });
    expect(DataCrazy.data).toBeUndefined();
  });
});
