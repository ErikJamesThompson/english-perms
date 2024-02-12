import generateRealWords, {
  verifyInput,
  generatePermutationsRecursively,
} from "../src/generateRealWords.ts";

const realWorldWords: string[] = [];
const storage = {
  consoleSpy: jest.spyOn(console, "error").mockImplementation(() => {}),
  isValid: true,
  permutations: new Map(),
  realWorldWords,
};

describe(".verifyInput", () => {
  afterEach(() => {
    storage.consoleSpy.mockClear();
  });

  describe("when an invalid argument is passed", () => {
    describe("when a blank string is passed", () => {
      beforeEach(() => {
        storage.isValid = verifyInput("");
      });
      it("should return false", () => {
        expect(storage.isValid).toEqual(false);
      });

      it("should log an error", () => {
        expect(storage.consoleSpy).toHaveBeenCalledWith(
          "error: please enter a valid argument"
        );
      });
    });

    describe("when a blank string is passed", () => {
      beforeEach(() => {
        storage.isValid = verifyInput("asdfgtyvfghjkl");
      });

      it("should return false", () => {
        expect(storage.isValid).toEqual(false);
      });

      it("should log an error", () => {
        expect(storage.consoleSpy).toHaveBeenCalledWith(
          "error: string is too long, only character count of 8 or less currently accepted"
        );
      });
    });

    describe("when a string with numbers is passed", () => {
      beforeEach(() => {
        storage.isValid = verifyInput("asd234");
      });

      it("should return false", () => {
        expect(storage.isValid).toEqual(false);
      });

      it("should log an error", () => {
        expect(storage.consoleSpy).toHaveBeenCalledWith(
          "error: strings may only include english letters"
        );
      });
    });
  });

  describe("when a valid string is passed", () => {
    beforeEach(() => {
      storage.isValid = verifyInput("asdpoi");
    });

    it("should return true", () => {
      expect(storage.isValid).toEqual(true);
    });
  });
});

describe(".generatePermutationsRecursively", () => {
  describe("when a string is passed", () => {
    beforeEach(() => {
      storage.permutations = generatePermutationsRecursively("ad");
    });

    it("should return all permutations", () => {
      expect(storage.permutations).toEqual(
        new Map([
          ["a", true],
          ["ad", true],
          ["d", true],
          ["da", true],
        ])
      );
    });
  });
});

describe(".generateRealWords", () => {
  describe("when a valid string is passed", () => {
    beforeEach(() => {
      storage.realWorldWords = generateRealWords("doog");
    });

    it("should return all real words from passed in string", () => {
      expect(storage.realWorldWords).toEqual([
        "do",
        "doo",
        "dog",
        "od",
        "oo",
        "go",
        "god",
        "goo",
        "good",
      ]);
    });
  });
});
