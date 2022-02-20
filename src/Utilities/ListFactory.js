const fs = require("fs");
// const file = require("./allowedGuess.txt");
// console.log(file);
const text = fs.readFileSync(
  "/Users/asanto/Desktop/coding/wordleguesser/src/Utilities/allowedGuessTwo.txt",
  "utf-8"
);
const textByLine = text.split("\n");

let wordArr = [];

textByLine.forEach((el) => {
  wordArr.push(`"${el}"`);
});

// for (let i = 0; i < text.length; i++) {
//   currentWord ? (currentWord = currentWord + text[i]) : (currentWord = text[i]);
//   if (currentWord.length === 5) {
//     wordArr.push(`"${currentWord}"`);
//     currentWord = "";
//   }
// }

fs.writeFileSync(
  "/Users/asanto/Desktop/coding/wordleguesser/src/Utilities/allowedGuess.js",
  `export const allowedGuessArray  = [${wordArr}]`
);

// console.log(wordArray);

// fs.readFile(file, function (text) {
//   var textByLine = text.split("\n");
//   console.log(textByLine);
// });
