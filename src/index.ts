import generateRealWords from "./generateRealWords.js";

/**
 * Deduces environment and generates permutations with passed in argument or hardcoded
 * @returns {string[]} collection of real world words
 */
export default function init() {
  const environment = process.env.NODE_ENV;
  if (environment === "dev") {
    console.time();
    // for dev, call directly without using process
    const words = generateRealWords("asaaafj");
    console.timeEnd();
    return words;
  }
  if (environment === "prod") {
    return generateRealWords(process.argv.slice(2)[0]);
  }
}

console.log(init());
