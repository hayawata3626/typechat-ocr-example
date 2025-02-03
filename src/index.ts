import * as fs from 'fs';
import * as path from 'path';
import * as typechat from 'typechat';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { Products } from './interface.js';
import { CloudVisionClient } from 'cloud-vision-client.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, '../.env') });

const cloudVisionClient = new CloudVisionClient();
const model = typechat.createLanguageModel(process.env);
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
