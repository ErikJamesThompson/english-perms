import nspell from "nspell";
import en from "dictionary-en";
import checkWord from "check-word";

function acceptScring(s: string) {
  const permutations: Map<string, boolean> = new Map();
  let realWorldWords: string[] = [];

  generatePermutationsRecursively(s, permutations);
  realWorldWords = checkWordsAreReal(permutations);

  return realWorldWords;
}

function generatePermutationsRecursively(
  s: string,
  permutations: Map<string, boolean>
) {
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

function checkWordsAreReal(permutations: Map<string, boolean>): string[] {
  const correctWords = [];
  const wordChecker = checkWord("en");

  for (let word of permutations.keys()) {
    // TODO find a better library that is still fast
    const isValidEnglishWord = wordChecker.check(word);

    if (isValidEnglishWord) {
      correctWords.push(word);
    }
  }
  return correctWords;
}

console.log(acceptScring(process.argv.slice(2)[0]));
