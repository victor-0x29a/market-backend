
function sum(a: number, b: number) {
  return a + b
}

describe("oi", () => {
  test('oi', () => {
    const conta = sum(1, 1)
    expect(conta).toBe(2)
  })
})

