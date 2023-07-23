import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import * as typechat from 'typechat';
import { Products } from './interface.js';
import { CloudVisionClient } from 'cloud-vision-client.js';

// Create a __dirname equivalent
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables.
dotenv.config({ path: path.join(__dirname, '../.env') });

const cloudVisionClient = new CloudVisionClient();

// Create a language model based on the environment variables.
const model = typechat.createLanguageModel(process.env);

// // Load up the contents of our "Response" schema.
const schema = fs.readFileSync(path.join(__dirname, 'interface.ts'), 'utf8');

const translator = typechat.createJsonTranslator<Products>(
  model,
  schema,
  'Products'
);

const getOcrResult = async () => {
  const result = await cloudVisionClient.fetchImageToText(
    `${__dirname}/images/image.jpg`
  );
  return result;
};

const text = await getOcrResult();
const response = await translator.translate(text as string);

// @ts-ignore
console.log(JSON.stringify(response.data, null, 2));
