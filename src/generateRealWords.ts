import checkWord from "check-word";

/**
 * Returns the real world checked permutations of the input string
 * @module src/generateRealWords
 * @param {string} inputString - input string to be permutated
 * @returns {string[]} collection of real world words
 */
export default function generateRealWords(inputString: string): string[] {
  let permutations: Map<string, boolean>;
  let realWorldWords: string[] = [];

  const isValid = verifyInput(inputString);

  if (!isValid) {
    console.error("error: invalid input, see above error");
    return realWorldWords;
  }

  permutations = generatePermutationsRecursively(inputString);
  realWorldWords = checkWordsAreReal(permutations);

  return realWorldWords;
}

/**
 * Checks the input is valid according to length and composition
 * @param {string} inputString - input string
 * @returns {boolean} boolean indicating if string is valid
 */
export function verifyInput(inputString: string): boolean {
  let isValid = false;
  // test for english letters
  const areAllLetters = !/[^a-z]/i.test(inputString);

  if (!inputString) {
    console.error("error: please enter a valid argument");
  } else if (inputString.length === 0) {
    console.error("error: please enter a non empty string");
  } else if (inputString.length > 8) {
    console.error(
      "error: string is too long, only character count of 8 or less currently accepted"
    );
  } else if (!areAllLetters) {
    console.error(`error: strings may only include english letters`);
  } else {
    isValid = true;
  }
  return isValid;
}

/**
 * Generates permutations of input string
 * @param {string} inputString - input string to generate permutations from
 * @returns {Map<string, boolean>} map of generated permutations of input string
 */
export function generatePermutationsRecursively(
  inputString: string
): Map<string, boolean> {
  let permutations: Map<string, boolean> = new Map();
  function generatePermutations(
    constructedString: string,
    remainingCharacters: string
  ) {
    // if permutation already generated, exit out of branch
    if (permutations.get(constructedString)) {
      return;
    }

    // if end of potential branch, set and exit out
    if (remainingCharacters.length === 0) {
      permutations.set(constructedString, true);
      return;
    }
    for (let i = 0; i < remainingCharacters.length; i++) {
      // add character at node in tree to permutation map if it doesn't already exist and not ''
      if (constructedString.length > 0) {
        permutations.set(constructedString, true);
      }

      //   pull out letter and append to currently generated string
      const constructedStringWithNewPivot =
        constructedString + remainingCharacters[i];

      //   pull out remaining string without pivot
      const stringWithoutPivot =
        remainingCharacters.slice(0, i) + remainingCharacters.slice(i + 1);

      //    generate next branch of permutations with remaining string characters
      generatePermutations(constructedStringWithNewPivot, stringWithoutPivot);
    }
  }

  generatePermutations("", inputString);
  return permutations;
}

/**
 * Checks keys of permutation against dictionary library
 * @param {Map<string, boolean>} permutations - map of generated permutations
 * @returns {string[]} array of real world verified words from permutations
 */
export function checkWordsAreReal(
  permutations: Map<string, boolean>
): string[] {
  const correctWords = [];
  const wordChecker = checkWord("en");

  for (let word of permutations.keys()) {
    const isValidEnglishWord = wordChecker.check(word);

    if (isValidEnglishWord) {
      correctWords.push(word);
    }
  }
  return correctWords;
}
