import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  //Return the content of the data file in json format
  res.status(200).json(fileContents);
}

export async function addData(data) {
    const jsonDirectory = path.join(process.cwd(), 'json');
    const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
    const records = JSON.parse(fileContents);
  
    // add the new data to the records array
    records.push(data);
  
    // write the updated records array back to the file
    await fs.writeFile(jsonDirectory + '/data.json', JSON.stringify(records));
  
    return records;
  }