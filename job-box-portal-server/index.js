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
  origin: [
    'http://localhost:5173',
    'https://job-portal-implementation.web.app',
    'https://job-portal-implementation.firebaseapp.com'
  ],
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
  //console.log('token inside the verify token', token);
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized access' });
  }
  //verify the token
  jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
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
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");


    //jobs related apis
    const userCollection = client.db('jobsBoxPortal').collection('users');
    const jobsCollection = client.db('jobsBoxPortal').collection('jobs');
    const reviewsCollection = client.db('jobsBoxPortal').collection('reviews');
    const jobApplicationCollection = client.db('jobsBoxPortal').collection('jobs_applications');
    const contactsCollection = client.db('jobsBoxPortal').collection('users_contact');



    //verifyRecruiter
    // const verifyRecruiter = async (req, res, next) => {
    //   const email = req.user?.email;
    //   if (!email) {
    //     return res.status(401).send({ message: 'Unauthorized: No email in token' });
    //   }

    //   try {
    //     const user = await userCollection.findOne({ email });
    //     if (!user || user.role !== 'recruiter') {
    //       return res.status(403).send({ message: 'Forbidden: Not a recruiter' });
    //     }

    //     next();
    //   } catch (err) {
    //     console.error('verifyRecruiter error:', err);
    //     res.status(500).send({ message: 'Internal server error' });
    //   }
    // };




    const verifyUser = async (req, res, next) => {

      const email = req.user?.email;
      const user = await userCollection.findOne({ email });
      if (user?.role !== 'user') return res.status(403).send({ message: 'Forbidden: Not Admin' });
      next();
    };



    //verifyadmin
    const verifyAdmin = async (req, res, next) => {
      const email = req.user?.email;
      const user = await userCollection.findOne({ email });
      if (user?.role !== 'admin') return res.status(403).send({ message: 'Forbidden: Not Admin' });
      next();
    };

    //verifyrecruiteroradmin
    const verifyRecruiterOrAdmin = async (req, res, next) => {
      const email = req.user?.email;
      const user = await userCollection.findOne({ email });
      if (user?.role === 'admin' || user?.role === 'recruiter') {
        req.role = user.role;
        next();
      } else {
        return res.status(403).send({ message: 'Forbidden: Not Recruiter or Admin' });
      }
    };




    //auth related APIs
    app.post('/jwt', async (req, res) => {
      const { email, photo, name } = req.body;
      console.log('update photo', photo);
      console.log('update name', name);
      //jodi age photo url add korte bule jao taholeeta korba

      const defaultPhoto = 'default_photo_url';
      const defaultName = 'Anonymous'
      await userCollection.updateOne(
        { email }, // query to match
        {
          // $set: {

          //   photo
          // }
          $set: {
            photo: photo || defaultPhoto,
            name: name || defaultName
          }

        },
        { upsert: true }
      );


      const user = await userCollection.findOne({ email }); // Database থেকে user খুঁজে বের করো

      if (!user) {
        return res.status(401).send({ message: 'User not found' });
      }

      const tokenPayload = {
        email: user.email,
        role: user.role, //  database থেকে role
        name: user.name
      };


      const token = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25d' })
      //res.send(token)
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",

      }).send({ success: true })
    })

    //logout
    app.post('/logOut', (req, res) => {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",

      }).send({ success: true })
    })



    //users related api

    app.get('/users', verifyToken, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    })

    app.get('/users/role/:email', verifyToken, async (req, res) => {


      // Ensure token email matches the requested email
      const email = req.params.email;

      // // Ensure token email matches the requested email
      if (email !== req.user.email) {
        return res.status(403).send({ message: 'forbidden access' });
      }

      try {
        const user = await userCollection.findOne({ email });

        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }

        // fallback role if not defined
        const role = user.role || 'user';

        res.send({
          role,
          isAdmin: role === 'admin',
          isRecruiter: role === 'recruiter'
        });

      } catch (error) {
        console.error('Error fetching role:', error);
        res.status(500).send({ message: 'Internal server error' });
      }

    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      //insert emal if user doesn't exists
      //you can do dis many ways (1. email unique, 2.upsert, 3.simple checking)
      //social er jonno
      const query = { email: user.email }
      const exsistingUser = await userCollection.findOne(query);
      if (exsistingUser) {
        return res.send({ message: 'User already exists', insertedId: null })
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    })


    // user role 1
    app.patch('/users/role/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      console.log(id)
      const { newRole } = req.body;

      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role: newRole } }
      );

      res.send(result)
    })
    // 1
    app.delete('/users/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })

    // app.get('/jobs', logger, async (req, res) => {

    //   console.log('now inside the api call back ')
    //   //email onujai data load korba mypost e dekhabe jara jara job post korse tader job list
    //   const email = req.query.email;
    //   const salarySort = req.query?.salarySort;
    //   const search = req.query?.search;
    //   const min = req.query?.min;
    //   const max = req.query?.max;



    //   let query = {};
    //   let sortQuery = {};
    //   console.log(req.query)

    //   if (email) {
    //     query = { hr_email: email }
    //   }
    //   //-1 mane shobche boro value dibe
    //   if (salarySort == "true") {
    //     sortQuery = { "salaryRange.min": -1 }
    //   }


    //   //    Alada alada kore dekhabe ekta ekta search dile
    //   //  if(search){
    //   //   //  search location, title, jobType, company Name
    //   //   query.$or = [
    //   //     { location: { $regex: search, $options: "i" } },
    //   //     { title: { $regex: search, $options: "i" } },
    //   //     { jobType: { $regex: search, $options: "i" } },
    //   //     { company: { $regex: search, $options: "i" } },


    //   //   ];

    //   //  }


    //   // shob gula ek sathe serach dite pari abar aladao
    //   if (search) {
    //     const keywords = search.trim().split(/\s+/);
    //     query.$and = keywords.map((word) => ({
    //       $or: [
    //         { location: { $regex: word, $options: "i" } },
    //         { title: { $regex: word, $options: "i" } },
    //         { jobType: { $regex: word, $options: "i" } },
    //         { company: { $regex: word, $options: "i" } }
    //       ]
    //     }));
    //   }

    //   //min and max salary serach dile oi onu jai dekhabe serch field e
    //   if (min && max) {
    //     query = {
    //       ...query,
    //       "salaryRange.min": { $gte: parseInt(min) },
    //       "salaryRange.max": { $lte: parseInt(max) }
    //     }
    //   }


    //   const cursor = jobsCollection.find(query).sort(sortQuery);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    app.get('/jobs', logger, async (req, res) => {
      //console.log('Inside /jobs API');

      const email = req.query.email;
      const salarySort = req.query?.salarySort;
      const search = req.query?.search;
      const min = req.query?.min;
      const max = req.query?.max;

      let query = {};
      let sortQuery = {};

      //Email-based filtering
      if (email) {
        query.hr_email = email;
      } else {
        query.status = 'active'; // Only show active jobs to public
      }

      // Full-text search on multiple fields
      if (search) {
        const keywords = search.trim().split(/\s+/);
        query.$and = keywords.map(word => ({
          $or: [
            { location: { $regex: word, $options: 'i' } },
            { title: { $regex: word, $options: 'i' } },
            { jobType: { $regex: word, $options: 'i' } },
            { company: { $regex: word, $options: 'i' } }
          ]
        }));
      }

      // Salary range filter min max
      if (min && max) {
        query = {
          ...query,
          "salaryRange.min": { $gte: parseInt(min) },
          "salaryRange.max": { $lte: parseInt(max) }
        };
      }

      // Sorting by salary
      if (salarySort === "true") {
        sortQuery = { "salaryRange.min": -1 };
      }
      else {
        sortQuery = { createdAt: -1 }; // Sort by latest jobs
      }

      try {
        const cursor = jobsCollection.find(query).sort(sortQuery);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).send({ error: 'Failed to fetch jobs' });
      }
    });



    //specific job khujar jonno
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await jobsCollection.findOne(query);
      res.send(result);
    });

    //1 //add job
    // app.post('/jobs', verifyToken,verifyRecruiterOrAdmin, async (req, res) => {
    //   const newJob = req.body;
    //   console.log('verify role',req.user)
    //   console.log(newJob)
    //   newJob.createdAt = new Date();
    //   const result = await jobsCollection.insertOne(newJob);
    //   res.send(result);
    // })

    // Post Job Route
    app.post('/jobs', verifyToken, verifyRecruiterOrAdmin, async (req, res) => {
      const newJob = req.body;
      newJob.createdAt = new Date();
      newJob.status = req.role === 'admin' ? 'active' : 'pending';

      const result = await jobsCollection.insertOne(newJob);
      res.send(result);
    });


    //Admin Panel Job List
    app.get('/admin/jobs', verifyToken, verifyAdmin, async (req, res) => {
      const jobs = await jobsCollection.find().sort({ createdAt: -1 }).toArray();
      res.send(jobs);
    });

    //Update Job Status (Dropdown)
    app.patch('/jobs/:id/status', verifyToken, verifyAdmin, async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      const result = await jobsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );
      res.send(result);
    });



    //job update patch
    app.patch('/jobs/:id', async (req, res) => {
      const job = req.body;
      //console.log(job)
      const id = req.params.id;
      //console.log(id)
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          title: job.title,
          location: job.location,
          jobType: job.jobType,
          category: job.category,
          salaryRange: job.salaryRange,
          currency: job.salaryRange?.currency,
          description: job.description,
          company: job.company,
          requirements: job.requirements,
          responsibilities: job.responsibilities,
          hr_name: job.hr_name,
          applicationDeadline: job.applicationDeadline,
          company_logo: job.company_logo

        }
      }
      const result = await jobsCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    //delete sepecific jobs
    app.delete('/jobs/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(query);
      res.send(result);
    })

    //apply hoyar por query diya koyta apply korse khuje ber korba
    //get all data, get one data, get some data,
    app.get('/job-applications', verifyToken, async (req, res) => {
      const email = req.query.email;
      const query = { applicant_email: email }

      if (req.user.email !== req.query.email) {
        return res.status(403).send({ message: 'forbidden access' })

      }


      //console.log('cookies automatic request sent', req.cookies)

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

    app.get('/job-applications/jobs/:job_id', verifyToken, async (req, res) => {
      const jobId = req.params.job_id;
      const query = { job_id: jobId }
      const result = await jobApplicationCollection.find(query).toArray();
      res.send(result);
    })
    //user job apply korar por
    app.post('/job-applications', verifyToken, verifyUser, async (req, res) => {
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

      //console.log(result)
      res.send(result);



    })
    //my application item delete korar jonno email r id diye data ber kore match korle item delete hobe
    app.delete('/job-applications/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const data = req.body.email;
      //console.log(data, id);

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


    //stats or analytics
    app.get('/admin-stats', verifyToken, verifyAdmin, async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const jobApplication = await jobApplicationCollection.estimatedDocumentCount();
      const jobCollection = await jobsCollection.estimatedDocumentCount();

      const adminUsers = await userCollection.countDocuments({ role: 'admin' });
      const recruiterUsers = await userCollection.countDocuments({ role: 'recruiter' });
      const userUsers = await userCollection.countDocuments({ role: 'user' });

      const activeJobs = await jobsCollection.countDocuments({ status: 'active' });
      const pendingJobs = await jobsCollection.countDocuments({ status: 'pending' });

      const rejectApplications = await jobApplicationCollection.countDocuments({ status: 'Rejected' });
      const acceptedApplications = await jobApplicationCollection.countDocuments({ status: 'Hired' });

      res.send({
        users,
        jobApplication,
        jobCollection,
        adminUsers,
        recruiterUsers,
        userUsers,
        activeJobs,
        pendingJobs,
        rejectApplications,
        acceptedApplications
      })

    })


    //our team member
    app.get('/team/admins', async (req, res) => {
      try {
        const admins = await userCollection.find({ role: 'admin' }).toArray();
        res.send(admins);
      } catch (err) {
        res.status(500).send({ message: 'Failed to fetch admins' });
      }
    });


    //stats or analytics
    app.get('/recruiter-stats', async (req, res) => {
      // tar job koy job apply korse aggrygate pipeline diya ber korba
      const jobApplication = await jobApplicationCollection.estimatedDocumentCount();
      const jobCollection = await jobsCollection.estimatedDocumentCount();
      res.send({
        users,
        jobApplication,
        jobCollection
      })

    })

    //review
    //specific data load kore update
    app.get('/reviews', async (req, res) => {
      const review = await reviewsCollection.find().sort({ createdAt: -1 }).toArray();
      res.send(review);
    })
    app.get('/reviews/:id', async (req, res) => {
      const id = req.params.id;
      //     const review = await reviewsCollection.findOne({ _id: new ObjectId(id) });
      const query = { _id: new ObjectId(id) }
      const result = await reviewsCollection.findOne(query);

      res.send(result)


    })

    //get all data, get one data, get some data[0,1, many]
    app.get('/my-reviews', verifyToken, async (req, res) => {
      const email = req.user.email;
      const reviews = await reviewsCollection.find({ email }).toArray();
      res.send(reviews);
    });


    app.post('/reviews', verifyToken, async (req, res) => {
      const newReview = req.body;
      //   console.log('verify role',req.user)

      const email = req.user.email;

      const user = await userCollection.findOne({ email });
      if (!user) return res.status(404).send({ message: 'User not found' });


      // console.log(newReview)

      const result = await reviewsCollection.insertOne({
        ...newReview,
        email: user.email,
        name: user.name,
        photoURL: user.photo,
        createdAt: new Date()
      });
      res.send(result);
    })

    //review update
    app.patch('/reviews/:id', async (req, res) => {
      const review = req.body;
      //console.log(job)
      const id = req.params.id;
      //console.log(id)
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          description: review.description,
          recomended: review.recomended,
          rating: review.rating,
        }
      }
      const result = await reviewsCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })


    //sepecific delete review
    app.delete('/reviews/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewsCollection.deleteOne(query);
      res.send(result);
    })

    //user contact form
    app.get('/contacts-message', verifyToken, verifyAdmin, async (req, res) => {
      const contacts = await contactsCollection.find().sort({ createdAt: -1 }).toArray();
      res.send(contacts);
    });
 //post contacts message
    app.post('/contacts-message', verifyToken,verifyUser, async (req, res) => {
      const newContact = req.body;
      newContact.createdAt = new Date();
      const result = await contactsCollection.insertOne(newContact);
      res.send(result);
    })
//spacific contact message delete
    app.delete('/contacts-message/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await contactsCollection.deleteOne(query);
      res.send(result);
    });

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