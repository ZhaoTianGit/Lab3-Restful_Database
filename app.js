const express = require('express')
const app = express()
const port = 3000

const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://Lab3:Lab3-RestfulDatabase@lab3.c2clvwz.mongodb.net/?retryWrites=true&w=majority";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url);

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
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})



// POST request - Create a new user
app.post('/usersCreate', async (req, res) => {
    try {
      const db = client.db('Lab3');
  
      const collection = db.collection('users');
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
      const db = client.db(Lab3);
      const collection = db.collection('users');

      const users = await collection.find().toArray();
  
      res.status(200).json(users);
      client.close();
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // GET request - Get a specific user by ID
  app.get('/users/:id', async (req, res) => {
    try {
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
  
      const collection = db.collection('users');
      const user = await collection.findOne({ _id: req.params.id });
  
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(user);
      }
      client.close();
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // PATCH request - Update a specific user by ID
  app.patch('/users/:id', async (req, res) => {
    try {
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
  
      const collection = db.collection('users');
      const result = await collection.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
  
      if (result.matchedCount === 0) {
        res.status(404).send('User not found');
      } else {
        res.status(200).send('User updated');
      }
      client.close();
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // DELETE request - Delete a specific user by ID
  app.delete('/users/:id', async (req, res) => {
    try {
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
  
      const collection = db.collection('users');
      const result = await collection.deleteOne({ _id: req.params.id });
  
      if (result.deletedCount === 0) {
        res.status(404).send('User not found');
      } else {
        res.status(204).send();
      }
      client.close();
    } catch (err) {
      res.status(500).send(err);
    }
  });
  