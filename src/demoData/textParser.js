var fs = require("fs");

require.extensions[".txt"] = function(module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

var questions = require("./questions.txt");

// console.log(questions);
// console.log(JSON.parse(questions));

let structuredQuestions = { questions: [] };
let currentQuestion = null;

for (var char = 0; char < questions.length; char++) {
  const currentChar = questions.charAt(char);
  const previousChar = questions.charAt(char - 1);
  const nextChar = questions.charAt(char + 1);
  const nextnextChar = questions.charAt(char + 2);
  const nextnextnextChar = questions.charAt(char + 3);
  const next4Char = questions.charAt(char + 4);

  const isH4Headline = () =>
    currentChar === "#" &&
    nextChar === "#" &&
    nextnextChar === "#" &&
    nextnextnextChar === "#" &&
    next4Char !== "#" &&
    previousChar !== "#";

  if (isH4Headline()) {
    if (!currentQuestion) {
      currentQuestion = char;
    } else {
      const fullString = questions.substring(currentQuestion, char);

      const firstLineBreakIndex = fullString.search("\n");
      const question = fullString.substring(0, firstLineBreakIndex);

      const answer = fullString.substring(
        firstLineBreakIndex,
        fullString.length - 1
      );

      structuredQuestions.questions = [
        ...structuredQuestions.questions,
        { question, answer }
      ];
      currentQuestion = char;
    }
  }
}
console.log(structuredQuestions.questions.length);
fs.writeFileSync(
  "./data.json",
  JSON.stringify(structuredQuestions, null, 2),
  "utf-8"
);
