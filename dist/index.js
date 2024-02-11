import en from "dictionary-en";
function acceptScring(s) {
    const realWorldWords = {};
    generatePermutationsRecursively(s, realWorldWords);
    console.log(en);
    return realWorldWords;
}
function generatePermutationsRecursively(s, permutations) {
    function generatePermutations(constructedString, remainingCharacters) {
        // add permutation if exists and exit out of current call
        // I like more explicit return rather than else (more readable)
        if (remainingCharacters.length === 0 && !permutations[constructedString]) {
            permutations[constructedString] = true;
            return;
        }
        for (let i = 0; i < remainingCharacters.length; i++) {
            // add character at node in tree if it doesn't already exist and not ''
            if (!permutations[constructedString] && constructedString.length > 0) {
                permutations[constructedString] = true;
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
console.log(acceptScring("old"));
