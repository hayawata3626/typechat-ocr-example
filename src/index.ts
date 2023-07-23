import * as dotenv from "dotenv";
import { OpenAI, PromptTemplate } from "langchain";
import { ChatOpenAI } from "langchain/chat_models";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

dotenv.config();

// const model = new OpenAI({
//   modelName: "gpt-3.5-turbo",
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// const params = {
//   q: "Coffee",
//   location: "Shibuya, Tokyo, Japan",
//   hl: "ja",
//   gl: "jp",
//   google_domain: "google.co.jp",
//   api_key: "secret_api_key"
// } satisfies GoogleParameters;

// const res = await model.call(
//   "What's a good idea for an application to build with GPT-3?"
// );

// console.log(res);

// const chat = new ChatOpenAI({
//   modelName: "gpt-3.5-turbo",
// });
// const res2 = await chat.call([
//   new SystemChatMessage(
//     "You are an experiement running in node, Please informorm the user of that with your opening reply."
//   ),
//   new HumanChatMessage("Hello, how are you?"),
// ]);

// console.log(res2);

// Prompt template
const template =
  "What can I make using the following ingredients: {ingredients}?";
const promptIngredients = new PromptTemplate({
  template,
  inputVariables: ["ingredients"],
});

// We can use the `format` method to format the template with the given input values.
const ingredientsResponseA = await promptIngredients.format({
  ingredients: "Potatoes,Hamburger patty,Rolls,Rice,Noodles,Egg,Chicken",
});
console.log({ ingredientsResponseA });

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});
const resIngredients = await model.call(ingredientsResponseA);
console.log("Ingredient response", resIngredients);

const vectorStore = await MemoryVectorStore.fromTexts(
  [
    "You favorite swimsuit is a neon green onepiece",
    "You have green eyes",
    "You are tall",
    "You like to eat pizza",
    "You like rock music",
    "新宿駅から東京駅までに山手線が乗れます",
    "新橋駅からお台場駅までにゆりかもめが乗れます",
    "京都はかっこいいです",
    "これは関係ないの日本です",
    "東京都でタクシーでどこでもへ乗れます",
  ],
  [
    { id: 2 },
    { id: 1 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
  ],
  new OpenAIEmbeddings()
);

const questionOne = "Bikini";
const resultOne = await vectorStore.similaritySearch(questionOne, 1);

const questionTwo = "What is my favorite color?";
const resultTwo = await vectorStore.similaritySearch(questionTwo, 4);

const questionThree = "Do you like R & B?";
const resultThree = await vectorStore.similaritySearch(questionThree, 1);

const questionFour = "どうやってお台場に行きますか";
const resultFour = await vectorStore.similaritySearch(questionFour, 1);

const questionFive = "どうやって新宿に行けますか";
const resultFive = await vectorStore.similaritySearch(questionFive, 1);

const questionSix = "どうやって江戸川に行けますか";
const resultSix = await vectorStore.similaritySearch(questionSix, 2);

const questionSeven = "How do I get to Shinjuku?";
const resultSeven = await vectorStore.similaritySearch(questionSeven, 1);

const questionEight = "Tell me about the Tokyo illuminations"
const resultEight = await vectorStore.similaritySearch(questionEight, 1)

// ガンダムはどこですか
const questionNine = "どうやってガンダム像を見に行きますか"
const resultNine = await vectorStore.similaritySearch(questionNine, 2)

const questionTen = "How do I get to the Gundam statue?"
const resultTen = await vectorStore.similaritySearch(questionTen, 2)

const questionEleven = "Hamburger"
const resultEleven = await vectorStore.similaritySearch(questionEleven, 1)

const questionTwelve = "お寿司"
const resultTwelve = await vectorStore.similaritySearch(questionTwelve, 1)

const questionThirteen = "どうやって清水寺に行きますか？"
const resultThirteen = await vectorStore.similaritySearch(questionThirteen, 3)

console.log("Question 1:", questionOne);
console.log("Result 1:", resultOne);
console.log("Question 2:", questionTwo);
console.log("Result 2:", resultTwo);
console.log("Question 3:", questionThree);
console.log("Result 3:", resultThree);
console.log("Question 4:", questionFour);
console.log("Result 4:", resultFour);
console.log("Question 5:", questionFive);
console.log("Result 5:", resultFive);
console.log("Question 6:", questionSix);
console.log("Result 6:", resultSix);
console.log("Question 7:", questionSeven);
console.log("Result 7:", resultSeven);
console.log("Question 8:", questionEight);
console.log("Result 8:", resultEight);
console.log("Question 9:", questionNine);
console.log("Result 9:", resultNine);
console.log("Question 10:", questionTen);
console.log("Result 10:", resultTen);
console.log("Question 11:", questionEleven);
console.log("Result 11:", resultEleven);
console.log("Question 12:", questionTwelve);
console.log("Result 12:", resultTwelve);
console.log("Question 13:", questionThirteen);
console.log("Result 13:", resultThirteen);
// console.log("Vector store", vectorStore)
// console.log("Index 0", JSON.stringify(vectorStore.memoryVectors[0]))
