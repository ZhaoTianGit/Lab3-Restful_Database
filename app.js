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

run()
    .then(console.log)
    .catch(console.error)


// Enable Json
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


// POST request - Create a new user
app.post('/usersCreate', async (req, res) => {
    try {
      const db = client.db(dbName);
      const collection = db.collection(dbCollection);

      await collection.insertOne(req.body);
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
        ///client.close(); // Do not close the client to get the info again
    } catch (err) {
        res.status(500).send(err);
    }
});

// PATCH request - Updata user's data
// app.patch('/usersUpdate', async (req, res) => {
//   try {
//     const db = client.db(dbName);
//     const collection = db.collection(dbCollection);
//     console.log("Update Starto!!!!!");
//     const filter = { matrixNo: req.body.matrixNo }; // Assuming you have a "matrixNo" field to uniquely identify the document
//     console.log(filter);
//     const update = { $set: req.body.matrixNo }; // Assuming the entire req.body contains the updated fields/values
//     console.log(update);

//     const result = await collection.updateOne(filter, update);
//     res.send(result);
//     console.log("User with", req.body.matrixNo, "is updated successfully!");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// PATCH Update v2
app.patch('/usersUpdate', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(dbCollection);

    const filter = { matrixNo: req.body.matrixNo };
    const update = {
      $set: {
        name: req.body.name,
        password: req.body.password,
        matrixNo: req.body.matrixNo
      }
    };
    console.log(filter);
    console.log(update);

    const result = await collection.updateOne(filter, update);
    console.log(result);
    if (result.matchedCount === 1) {
      res.send('User updated successfully!');
      console.log("User with", req.body.matrixNo, "is updated successfully!");
    } else {
      res.status(404).send('User not found.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while updating the user.');
  }
});

app.delete('/usersDelete', async (req, res) => {
  try {
      const db = client.db(dbName);
      const collection = db.collection(dbCollection);

      
      
  } catch (err) {
      res.status(500).send(err);
  }
});



