import AuthController from "../../Controllers/Auth";

const letters = ["a", "z"];

function genNome() {
  const sort = Math.floor(Math.random() * 8);
  let nome = "";
  for (let i = 0; i < sort; i++) {
    nome += letters[Math.floor(Math.random() * letters.length) - 1];
  }
  return nome;
}

describe("Register describer", () => {
  test("Credentials valid", async () => {
    const data = await AuthController.register({
      firstName: "X" + genNome(),
      role: "administrador",
      phone: 9,
      password: "senha123",
    });
    expect(data.error).toBe(false);
  });
  test("Credentials invalid", async () => {
    const data = await AuthController.register({
      firstName: "X",
      role: "administrador",
      phone: 9,
      password: "senha123",
    });
    expect(data.error).toBe(true);
    const DataCrazy = await AuthController.register({
      firstName:
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      role: "administrador",
      phone: 9,
      password: "senha123",
    });
    expect(DataCrazy.error).toBe(true);
  });
});
