// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  // let letterPoints = "";
  let letterPoints = 0;

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        // letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
        letterPoints += Number(pointValue);
      }
    }
  }
  // return console.log(letterPoints);
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let word = input.question("Let's play some scrabble! Enter a word: ");
  console.log("Which scoring algorithm would you like to use?");
  return word;
}

let simpleScorer = function (word) {
  word = word.toUpperCase().split("");
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    letterPoints += 1;
  }
  return letterPoints;
};
// console.log(simpleScorer("JavaScript"));

let vowelBonusScorer = function (word) {
  word = word.toUpperCase().split("");
  let vowels = ["A", "E", "I", "O", "U"];
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    if (vowels.includes(letter)) {
      letterPoints += 3;
    } else {
      letterPoints += 1;
    }
  }
  return letterPoints;
};
// console.log(vowelBonusScorer("JavaScript"));

let newPointStructure = transform(oldPointStructure);

let scrabbleScorer;

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: oldScrabbleScorer,
  },
];

function scorerPrompt() {
  console.log(`0 - Simple: ${scoringAlgorithms[0].description}`);
  console.log(`1 - Vowel Bonus: ${scoringAlgorithms[1].description}`);
  console.log(`2 - Scrabble: ${scoringAlgorithms[2].description}`);
  let number = Number(input.question("Enter a number: "));
  let scorer = scoringAlgorithms[number];
  return scorer;
}

// Simple scoring

function transform(obj) {
  let transformedObj = {};
  for (pointValue in obj) {
    for (let i = 0; i < obj[pointValue].length; i++) {
      // console.log(obj[pointValue][i]);
      let letter = obj[pointValue][i];
      // console.log(typeof letter);
      transformedObj[letter.toLowerCase()] = Number(pointValue);
    }
  }
  return console.log(transformedObj);
}

// transform(oldPointStructure);

function runProgram() {
  // let word = initialPrompt();
  // let scorer = scorerPrompt();
  // return console.log(`Score for '${word}': ${scorer.scorerFunction(word)}`);
  // return scorer.scorerFunction(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
