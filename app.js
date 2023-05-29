const express = require('express')
const app = express()
const port = 3000

const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://Lab3:Lab3-RestfulDatabase@lab3.c2clvwz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url,{
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
const dbName = 'Lab3'
const dbCollection = 'users' 

async function run() {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log('Connected successfully to server');
    return "done.";
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
// run().catch(console.dir);
run()
    .then(console.log)
    .catch(console.error)


//  Enable Json
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


// POST request - Create a new user
app.post('/usersCreate', async (req, res) => {
    try {
      const db = client.db(dbName);
  
      const collection = db.collection(dbCollection);
      const result = await collection.insertOne(req.body);
      res.send(req.body);
      console.log(req.body);  
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // GET request - Get all users
  app.get('/usersGet', async (req, res) => {
    try {
      const db = client.db(dbName);
      const collection = db.collection(dbCollection);

      const users = await collection.find().toArray();
  
      res.status(200).json(users);
      client.close();
    } catch (err) {
      res.status(500).send(err);
    }
  });
  

  