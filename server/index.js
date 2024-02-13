const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;


//middleware
app.use(cors()); 
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://oshagaras:IvreH6y33hK847D6@cluster0.me71vaa.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

     //create db
     const db = client.db("profileDB");
     const Collections = db.collection("Collections");

    //methods for sending and receiving data
    app.post("/users", async(req, res) => {
      const user = req.body;
      console.log(user);

      const result = await Collections.insertOne(user);
        if (result.insertedId){
            return res.status(200).send(result);
        }else{
            return res.status(404).send({
                message: "cannot insert! try again later",
                status: false
            })
        }
    })

      //get data from db 
    app.get("/users", async(req, res) => {
      const allUsers = await Collections.find().toArray()
      res.send(allUsers);
  })

    //get single job using id
    app.get("/users/:id", async(req, res) => {
      const id = req.params.id;
      const userId = await Collections.findOne({
        _id: new ObjectId(id)
      })
      res.send(userId)
    })

   // delete a job
   app.delete("/users/:id", async(req, res) => {
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)}
    const result = await Collections.deleteOne(filter);
    res.send(result);
  });

  app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = req.body;

    const filter = {_id: new ObjectId(id)};
    const options = { upsert: true };
    const updateduser = {
        $set:{
            name: user.name,
            email: user.email,
            photoURL: user.photoURL
        }
    }

    const result = await Collections.updateOne(filter, updateduser, options);
    res.send(result);
});

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})