import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import * as typechat from 'typechat';
import { Products } from './interface.js';
import Tesseract from 'tesseract.js';
import { log } from 'console';

// Create a __dirname equivalent
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables.
dotenv.config({ path: path.join(__dirname, '../.env') });

// Create a language model based on the environment variables.
const model = typechat.createLanguageModel(process.env);

// Load up the contents of our "Response" schema.
const schema = fs.readFileSync(path.join(__dirname, 'interface.ts'), 'utf8');

const translator = typechat.createJsonTranslator<Products>(
  model,
  schema,
  'Products'
);

// Process requests interactively.
console.log(`${__dirname}/images/image.jpg`, '__dirname');

// Tesseract.recognize(`${__dirname}/images/image.jpg`, 'jpn', {
//   logger: (m) => console.log(m),
// }).then(({ data: { text } }) => {
//   console.log(text);
// });

const response = await translator.translate(
  `※ 0206 ソフトパン粉中目\nP4902865070968\n※ 0206 火乃国 片栗粉\nP4976613003720\nP0000000000008\n※ 0051 男爵芋\n※ 0213 スパゲッティ 1.6 ¥1,270\nP8008857250199\n0226 使い捨てマスクふつ ¥248\nP4570087140358\n※ 0300 東海牛乳 北海道牛 ¥185\nP4904568121152\n※ 0301 明治ブルガリアヨーグルト ¥290\nP4902705011625\n( 2個 x @145)\n※ 0302 ブレンドチーズ400g ¥518\nP4961681004595\n※ 0400 ブラジル産鶏もも ¥1,098\nP7894904790234\n※ 0401 鶏屋さんの梅しそカ ¥518\nP4942355205333\n※ 0406 京醍醐点心 ニラ餃子 ¥470\nP4571145930379\n(2個 x @235)\n※ 0051 玉ねぎ\nP0402092501982\n小計\n(外税8%対象額\n消費税8%\n(外税10%対象額\n消費税10%\n8%\n4852\n10%\n¥99\n¥98\n¥298\n¥198\n¥5, 290\n¥5, 042)\n¥403\n¥248)\n¥24`
);

// @ts-ignore
console.log(JSON.stringify(response.data, null, 2));
