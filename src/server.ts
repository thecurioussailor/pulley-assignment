import express from "express"
const app = express();
import {Buffer} from 'buffer'
const port = 3000;
const axios = require('axios')


function decodeBase64(encodedPath: string): string {
    try {
      return Buffer.from(encodedPath, 'base64').toString('utf-8');
    } catch (error) {
      console.error('Error decoding base64 path:', error);
      throw new Error('Invalid base64 encoding');
    }
  }
  
  // Fetch data from the decoded path
  async function fetchData(decodedPath: string): Promise<any> {
    try {
      const response = await axios.get(decodedPath);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

app.get("/",async (req, res) => {
    
    try{
        const response = await axios.get("https://ciphersprint.pulley.com/ashu.sagar111@gmail.com");
        
        const path = response.data.encrypted_path;
        const method = response.data.encryption_method;

        const response2 = await axios.get(`https://ciphersprint.pulley.com/${path}`);
        const path2 = response2.data.encrypted_path;
        const method2 = response2.data.encryption_method;

        const base64String = path2;
        const buffer = Buffer.from(base64String,"base64");
        const decodedString = buffer.toString("utf-8");
        const response3 = await axios.get(`https://ciphersprint.pulley.com/${decodedString}`);
        const data3 = response3.data;
        res.json({
            decodedString
        })
    } catch (error){
        res.status(500).json({
            msg: error
        })
    }
})

app.listen(port, ()=> {
    console.log(`Listening on the port ${port}`)
})