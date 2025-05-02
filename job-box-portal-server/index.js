const express = require('express');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config()

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//custom middleware
const logger = (req, res, next) => {
  console.log('inside the logger')
  next();
}

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  console.log('token inside the verify token', token);
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized access' });
  }
  //verify the token
  jwt.verify(token, process.env.Access_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized access' });
    }
    req.user = decoded;
    next();
  })
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.urmrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


    //jobs related apis
    const jobsCollection = client.db('jobsBoxPortal').collection('jobs');
    const jobApplicationCollection = client.db('jobsBoxPortal').collection('jobs_applications');



    //auth related APIs
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
      //res.send(token)
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, //http://localhost:5173/login
      }).send({ success: true })
    })

    //logout
    app.post('/logOut', (req, res) => {
      res.clearCookie('token', {
        httpOnly: true,
        secure: false
      }).send({ success: true })
    })

    // jobs related APIs
    app.get('/jobs', logger, async (req, res) => {

      console.log('now inside the api call back ')
      //email onujai data load korba mypost e dekhabe jara jara job post korse tader job list
      const email = req.query.email;
      const salarySort = req.query?.salarySort;
      const search = req.query?.search;
      const min = req.query?.min;
      const max = req.query?.max;



      let query = {};
      let sortQuery = {};
      console.log(req.query)

      if (email) {
        query = { hr_email: email }
      }
      //-1 mane shobche boro value dibe
      if (salarySort == "true") {
        sortQuery = { "salaryRange.min": -1 }
      }


      //    Alada alada kore dekhabe ekta ekta search dile
      //  if(search){
      //   //  search location, title, jobType, company Name
      //   query.$or = [
      //     { location: { $regex: search, $options: "i" } },
      //     { title: { $regex: search, $options: "i" } },
      //     { jobType: { $regex: search, $options: "i" } },
      //     { company: { $regex: search, $options: "i" } },


      //   ];

      //  }


      // shob gula ek sathe serach dite pari abar aladao
      if (search) {
        const keywords = search.trim().split(/\s+/);
        query.$and = keywords.map((word) => ({
          $or: [
            { location: { $regex: word, $options: "i" } },
            { title: { $regex: word, $options: "i" } },
            { jobType: { $regex: word, $options: "i" } },
            { company: { $regex: word, $options: "i" } }
          ]
        }));
      }

      //min and max salary serach dile oi onu jai dekhabe serch field e
      if (min && max) {
        query = {
          ...query,
          "salaryRange.min": { $gte: parseInt(min) },
          "salaryRange.max": { $lte: parseInt(max) }
        }
      }


      const cursor = jobsCollection.find(query).sort(sortQuery);
      const result = await cursor.toArray();
      res.send(result);
    });



    //specific job khujar jonno
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await jobsCollection.findOne(query);
      res.send(result);
    });

    //add job
    app.post('/jobs', async (req, res) => {
      const newJob = req.body;
      console.log(newJob)
      newJob.createdAt = new Date();
      const result = await jobsCollection.insertOne(newJob);
      res.send(result);
    })

    //apply hoyar por query diya koyta apply korse khuje ber korba
    app.get('/job-applications', verifyToken, async (req, res) => {
      const email = req.query.email;
      const query = { applicant_email: email }

      if (req.user.email !== req.query.email) {
        return res.status(403).send({ message: 'forbidden access' })

      }


      //  console.log('cookies automatic request sent', req.cookies)

      const result = await jobApplicationCollection.find(query).toArray();
      //shob data na thakay data jobId diye kore ager datar moode dukano hoise
      // fokira way to aggregate data
      for (const application of result) {
        // console.log(application.job_id)
        const query1 = { _id: new ObjectId(application.job_id) }
        const job = await jobsCollection.findOne(query1);
        if (job) {
          application.title = job.title;
          application.location = job.location;
          application.company = job.company;
          application.company_logo = job.company_logo;
          application.jobType = job.jobType;

        }
      }

      res.send(result)
    })

    app.get('/job-applications/jobs/:job_id', async (req, res) => {
      const jobId = req.params.job_id;
      const query = { job_id: jobId }
      const result = await jobApplicationCollection.find(query).toArray();
      res.send(result);
    })

    app.post('/job-applications', verifyToken, async (req, res) => {
      // const application = req.body;
      const { job_id } = req.body;
      //email from jwt
      const applicant_email = req.user.email;
      //dublication apply remove korar jonno
      const alreadyApplied = await jobApplicationCollection.findOne({ job_id, applicant_email });


      if (alreadyApplied) {
        return res.status(409).send({ message: 'Already applied' });
      }
      const result = await jobApplicationCollection.insertOne({
        ...req.body,
        appliedAt: new Date()
      });
      await jobsCollection.updateOne(
        { _id: new ObjectId(job_id) },
        { $inc: { applicationCount: 1 } }
      );


      console.log(result)
      res.send(result);
      // const result = await jobApplicationCollection.insertOne(application);

      // Not the best way (use aggregate) 
      // skip --> it
      // const id = application.job_id;
      // const query = { _id: new ObjectId(id) }
      // const job = await jobsCollection.findOne(query);
      // console.log(job);

      // let newCount = 0;
      // if (job.applicationCount) {
      //     newCount = job.applicationCount + 1;
      // }
      // else {
      //     newCount = 1;
      // }

      // // now update the job info
      // const filter = { _id: new ObjectId(id) };
      // const updatedDoc = {
      //     $set: {
      //         applicationCount: newCount
      //     }
      // }

      // const updateResult = await jobsCollection.updateOne(filter, updatedDoc);
      // console.log(updateResult)

      // res.send(result);


    })
    //my application item delete korar jonno email r id diye data ber kore match korle item delete hobe
    app.delete('/job-applications/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const data = req.body.email;
      console.log(data, id);

      const result = await jobApplicationCollection.deleteOne({
        _id: new ObjectId(id),
        applicant_email: data
      });
      res.send(result);
    })


    //update status
    app.patch('/job-applications/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          status: data.status
        }
      }
      const result = await jobApplicationCollection.updateOne(filter, updatedDoc);
      res.send(result)
    })



  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Job is falling from the sky')
})

app.listen(port, () => {
  console.log(`Job is waiting at: ${port}`)
})