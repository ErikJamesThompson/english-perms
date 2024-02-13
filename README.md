# English Perms

## About The Project

This project outputs a list of acceptable english words generated by creating the permutations of an input string.

The list of acceptable english words is currently based on this [project](https://github.com/S0c5/node-check-word), which is an autocorrect based dictionary. This offers speed of checking however has limitations in which category of words can be checked (e.g. affixes, prefixes) and does not offer information about the verified words (e.g. definition, category, synonyms). Future updates to this project will include investigation into a library better suited for this use-case.

### English Word Considerations

Many words exist in various dictionaries that aren't often used in common parlance.

Running the Below Command

```sh
npm run generateRealWords odog
```

Will generate this list of words:

```
[
  'od',   'oo',
  'do',   'doo',
  'dog',  'go',
  'god',  'goo',
  'good'
]
```

I wasn't expecting examples like

- [od](https://www.dictionary.com/browse/od) - (noun) A mystical supernatural force
- [oo](https://www.dictionary.com/browse/o-o) - (noun) Species of Hawaiian birds
- [doo](https://www.dictionary.com/browse/doo) - (noun) Another word for a pigeon!

Refinement of dictionary entries or specificity in types of words allowed seems like the right way to ensure we are pulling from a "correct" pool of words. On the roadmap is further investigation into third party applications that may grant us the specificity we desire.

## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ErikJamesThompson/english-perms.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

## Usage

Below is the usage guide for running this project locally.

### Input Limitations

Strings are currently only accepted when they adhere to the following limitations

1. Only English letters
2. String must contain under 8 characters (for performance)
3. Must contain no numbers

### Generating real word permutations

This Project can be run in the CLI by the following commands:

1. Generate words, output is logged in console
   ```sh
   npm run generateRealWords {{string here}}
   ```
2. Generate words, output directed to generated `result.txt` file
   ```sh
   npm run generateRealWordsToFile {{string here}}
   ```
3. DEV: Generate words, output is logged to console. Input may be edited in `./src/index.ts` file
   ```sh
   npm run dev
   ```
4. Tests may be run by
   ```sh
   npm test
   ```
5. Tests may be run and developed on in watch mode
   ```sh
   npm run test:watch
   ```

## Roadmap

- [ ] Investigate better dictionary libraries
- [ ] Improve overall performance
  - [ ] **Reduce permutation calls when duplicate letters exist in permutations object**
    - [ ] Re-evaluate permutations object -> array if duplicates area already handled
  - [ ] Ensure performance of dictionary lookup. May need revisit depending on library chosen
- [ ] Improve console experience.
  - [ ] Interactive inputs
  - [ ] Better developer experience, don't want to update init to change input string

<!-- CONTACT -->

## Contact

Your Name - erik.james.thompson@gmail.com

Project Link: [https://github.com/ErikJamesThompson/english-perms](https://github.com/ErikJamesThompson/english-perms)
