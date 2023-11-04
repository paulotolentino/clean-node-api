import bcrypt from "bcrypt";
import { Encrypter } from "../../data/protocols";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(value: string): Promise<string> {
    return Promise.resolve("hashed_value");
  },
}));

interface SutTypes {
  sut: Encrypter;
}

const makeSut = (salt = 12): SutTypes => {
  const sut = new BcryptAdapter(salt);

  return {
    sut,
  };
};

describe("Bcrypt Adapter", () => {
  test("Should call bcrypt with correct values", async () => {
    const salt = 12;
    const { sut } = makeSut(salt);
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });

  test("Should return a hash on success", async () => {
    const { sut } = makeSut();
    const hash = await sut.encrypt("any_value");
    expect(hash).toBe("hashed_value");
  });

  test("Should throws if bcrypt throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.encrypt("any_value");
    await expect(promise).rejects.toThrow();
  });
});
