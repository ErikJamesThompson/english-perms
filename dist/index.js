import en from "dictionary-en";
import nspell from "nspell";
export default function acceptScring(s) {
    const permutations = new Map();
    let realWorldWords = [];
    console.log(process.argv);
    generatePermutationsRecursively(s, permutations);
    realWorldWords = checkWordsAreReal(permutations);
    return realWorldWords;
}
function generatePermutationsRecursively(s, permutations) {
    function generatePermutations(constructedString, remainingCharacters) {
        // add permutation if exists and exit out of current call
        // I like more explicit return rather than else (more readable)
        if (remainingCharacters.length === 0 &&
            !permutations.get(constructedString)) {
            permutations.set(constructedString, true);
            return;
        }
        for (let i = 0; i < remainingCharacters.length; i++) {
            // add character at node in tree if it doesn't already exist and not ''
            if (!permutations.get(constructedString) &&
                constructedString.length > 0) {
                permutations.set(constructedString, true);
            }
            //   pull out letter and append to currently generated string
            const constructedStringWithNewPivot = constructedString + remainingCharacters[i];
            //   pull out remaining string without pivot
            const stringWithoutPivot = remainingCharacters.slice(0, i) + remainingCharacters.slice(i + 1);
            //    generate next branch of permutations with remaining string characters
            generatePermutations(constructedStringWithNewPivot, stringWithoutPivot);
        }
    }
    generatePermutations("", s);
    return permutations;
}
function checkWordsAreReal(permutations) {
    const correctWords = [];
    console.log(en);
    const spell = nspell(en);
    for (let word of permutations.keys()) {
        // spellcheck dictionary registers single letters as positives
        // TODO find a better library that is still fast
        const isOnlyAcceptableSingleCharacter = word.length === 1 && word === "a";
        const isValidEnglishWord = word.length > 1 && spell.correct(word);
        if (isValidEnglishWord || isOnlyAcceptableSingleCharacter) {
            correctWords.push(word);
        }
    }
    return correctWords;
}
