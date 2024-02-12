import checkWord from "check-word";

export function acceptScring(s: string) {
  let permutations: Map<string, boolean>;
  let realWorldWords: string[];

  const isValid = verifyInput(s);

  if (!isValid) {
    console.error("error: invalid input, see above error");
    return;
  }

  permutations = generatePermutationsRecursively(s);
  realWorldWords = checkWordsAreReal(permutations);

  return realWorldWords;
}

export function verifyInput(s: string) {
  let isValid = false;
  const areAllLetters = !/[^a-z]/i.test(s);

  if (!s) {
    console.error("error: please enter a valid argument");
  } else if (s.length === 0) {
    console.error("error: please enter a non empty string");
  } else if (s.length > 8) {
    console.error(
      "error: string is too long, only character count of 8 or less currently accepted"
    );
  } else if (!areAllLetters) {
    console.error("error: strings may only include english letters");
  } else {
    isValid = true;
  }
  return isValid;
}

export function generatePermutationsRecursively(s: string) {
  let permutations: Map<string, boolean> = new Map();
  function generatePermutations(
    constructedString: string,
    remainingCharacters: string
  ) {
    // add permutation if exists and exit out of current call
    // I like more explicit return rather than else (more readable)
    if (
      remainingCharacters.length === 0 &&
      !permutations.get(constructedString)
    ) {
      permutations.set(constructedString, true);
      return;
    }
    for (let i = 0; i < remainingCharacters.length; i++) {
      // add character at node in tree if it doesn't already exist and not ''
      if (
        !permutations.get(constructedString) &&
        constructedString.length > 0
      ) {
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

  generatePermutations("", s);
  return permutations;
}

export function checkWordsAreReal(
  permutations: Map<string, boolean>
): string[] {
  const correctWords = [];
  const wordChecker = checkWord("en");

  for (let word of permutations.keys()) {
    // TODO find a better library that is still fast
    // but allows refinement of valid words
    // e.g. disallow affixes, prefixes
    const isValidEnglishWord = wordChecker.check(word);

    if (isValidEnglishWord) {
      correctWords.push(word);
    }
  }
  return correctWords;
}

// for dev, call directly without using process
// console.log(acceptScring("assdp"));
console.log(acceptScring(process.argv.slice(2)[0]));
