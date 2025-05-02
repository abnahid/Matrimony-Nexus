const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_TOKEN_SECRET);

const port = process.env.PORT || 5012;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Middleware
app.use(
  cors({
    origin: ["https://matrimony-nexus.netlify.app", "http://localhost:5173"],
    credentials: true,
  })
);


app.use(express.json());


app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10h" });

  // No cookies
  res.send({ success: true, token });
});

// Middleware: verify token from Authorization header
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

// POST /logout - dummy endpoint if you're only using localStorage
app.post("/logout", (req, res) => {
  // On frontend: just remove localStorage token
  res.send({ success: true, message: "Logged out" });
});

// use verify admin after verifyToken
const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;

  const query = { email: email };
  const user = await usersCollection.findOne(query);

  const isAdmin = user?.role === "admin";
  if (!isAdmin) {
    console.error("Access denied. User is not an admin.");
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};


// MongoDB Connection URI
const uri = `mongodb+srv://${process.env.MATRIMONY_IQ_USER}:${process.env.MATRIMONY_IQ_USER_PASS}@abnahid.cot7i.mongodb.net/?retryWrites=true&w=majority&appName=abnahid`;

// MongoDB Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to MongoDB
    // await client.connect();

    // Collections
    const biodatasCollection = client
      .db("matrimonyNexus")
      .collection("biodatas");
    const usersCollection = client.db("matrimonyNexus").collection("users");
    const contactRequestsCollection = client
      .db("matrimonyNexus")
      .collection("contactRequests");
    const favoritesCollection = client
      .db("matrimonyNexus")
      .collection("favorites");
    const successCollection = client.db("matrimonyNexus").collection("success");
    const reviewCollection = client.db("matrimonyNexus").collection("review");
    const paymentCollection = client
      .db("matrimonyNexus")
      .collection("payments");


    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;

      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }

      // Set default role if not provided
      if (!user.role) {
        user.role = "user";
      }

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.get("/recent-users", async (req, res) => {
      try {
        const cursor = usersCollection.find().sort({ date: -1 }).limit(4);

        const result = await cursor.toArray();
        res.send(result);
      } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send({ error: "Failed to fetch the users" });
      }
    });

    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;

      const query = { email: email };

      const user = await usersCollection.findOne(query);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      res.send(user);
    });

    app.patch("/users/:email", async (req, res) => {
      const email = req.params.email;
      const updatedUser = req.body;

      const filter = { email: email };
      const updateDoc = {
        $set: {}
      };

      // Check each key in the updated user object
      for (const [key, value] of Object.entries(updatedUser)) {
        // Skip the _id field and any other fields you don't want to update
        if (key !== '_id' && value !== undefined && value !== null) {
          updateDoc.$set[key] = value;
        }
      }

      const result = await usersCollection.updateOne(filter, updateDoc);

      if (result.matchedCount === 0) {
        return res.status(404).send({ message: "User not found" });
      }

      res.send({ success: true, message: "User updated successfully" });

    });


    app.post("/users/premium-request", async (req, res) => {
      const { id } = req.body;

      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { premium: true, approvedPremium: false } }
      );

      if (result.modifiedCount > 0) {
        res.send({ success: true, message: "Premium request submitted." });
      } else {
        res.status(404).send({
          success: false,
          message: "Biodata not found or not updated.",
        });
      }
    });

    app.get("/users/pendingPremium", verifyToken, async (req, res) => {
      const users = await usersCollection
        .find({ premium: true, approvedPremium: { $ne: true } })
        .toArray();
    });

    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await usersCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );

    app.patch(
      "/users/premium/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            premium: true,
          },
        };

        const result = await usersCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );

    app.patch(
      "/users/approvedPremium/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            approvedPremium: true,
          },
        };

        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );

    // a new contactRequests
    app.get("/user/contactRequest", async (req, res) => {
      const contactRequests = await contactRequestsCollection.find().toArray();
      res.status(200).send(contactRequests);
    });

    app.get("/users/contactRequests/:email", async (req, res) => {
      const email = req.params.email;

      const contactRequests = await contactRequestsCollection
        .find({ email })
        .toArray();

      const enrichedRequests = await Promise.all(
        contactRequests.map(async (request) => {
          const biodata = await biodatasCollection.findOne({
            biodataId: request.biodataId,
          });
          return { ...request, ...biodata };
        })
      );

      res.send(enrichedRequests);
    });

    app.post("/users/contactRequests", async (req, res) => {
      const { name, mobileNumber, biodataId, email, paymentId, status } =
        req.body;

      const result = await contactRequestsCollection.insertOne({
        biodataId,
        name,
        email,
        paymentId,
        status,
        mobileNumber,
        createdAt: new Date(),
      });
      res.send({ success: true, result });
    });

    app.patch(
      "/users/contactRequests/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: { status: "approved" } };

        const result = await contactRequestsCollection.updateOne(
          filter,
          updateDoc
        );
        res.send(result);
      }
    );

    app.delete(
      "/users/contactRequests/:requestId",
      verifyToken,
      async (req, res) => {
        const requestId = req.params.requestId;

        const result = await contactRequestsCollection.deleteOne({
          _id: new ObjectId(requestId),
        });
        if (result.deletedCount > 0) {
          res.send({
            success: true,
            message: "Contact request removed successfully.",
          });
        } else {
          res
            .status(404)
            .send({ success: false, message: "Contact request not found." });
        }
      }
    );

    // biodatas
    app.get("/biodatas", async (req, res) => {
      const {
        page = 1,
        limit = 20,
        gender,
        minAge,
        maxAge,
        minHeight,
        maxHeight,
        email,
        permanentDivision,
        biodataId,
      } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const limitNumber = parseInt(limit);

      const filters = {};

      if (email) {
        filters.contactEmail = email;
      }

      if (gender) {
        filters.type = gender;
      }

      if (minAge && maxAge) {
        filters.age = { $gte: parseInt(minAge), $lte: parseInt(maxAge) };
      }

      const convertCmToHeightString = (cm) => {
        const feet = Math.floor(cm / 30.48);
        const inches = Math.round((cm % 30.48) / 2.54);
        return `${feet}'${inches}"`;
      };

      if (minHeight && maxHeight) {
        filters.height = {
          $gte: convertCmToHeightString(minHeight),
          $lte: convertCmToHeightString(maxHeight),
        };
      }

      if (permanentDivision) {
        filters.permanentDivision = permanentDivision;
      }

      if (biodataId) {
        filters.biodataId = parseInt(biodataId);
      }

      const total = await biodatasCollection.countDocuments(filters);
      const result = await biodatasCollection.find(filters).skip(skip).limit(limitNumber).toArray();

      res.send({ data: result, total });
    });

    app.get("/biodatas/:biodataId", async (req, res) => {
      const biodataId = parseInt(req.params.biodataId);

      if (isNaN(biodataId)) {
        return res.status(400).send({ error: "Invalid biodataId format." });
      }

      const query = { biodataId };

      const biodata = await biodatasCollection.findOne(query);
      if (!biodata) {
        return res.status(404).send({ exists: false });
      }

      res.send({ exists: true, biodata });
    });

    app.post("/biodatas", async (req, res) => {
      const { contactEmail, ...biodata } = req.body;

      const existingBiodata = await biodatasCollection.findOne({
        contactEmail,
      });

      if (existingBiodata) {
        return res.status(400).send({
          success: false,
          message:
            "Biodata already exists for this email. Please edit instead.",
        });
      }

      // Generate a new biodataId
      const lastBiodata = await biodatasCollection
        .find()
        .sort({ biodataId: -1 })
        .limit(1)
        .toArray();
      const newBiodataId = (lastBiodata[0]?.biodataId || 0) + 1;

      const newBiodata = {
        ...biodata,
        biodataId: newBiodataId,
        contactEmail,
      };

      const result = await biodatasCollection.insertOne(newBiodata);
      res.send({
        success: true,
        message: "Biodata created successfully.",
        insertedId: result.insertedId,
      });
    });

    app.patch("/biodatas/:biodataId", async (req, res) => {
      const biodataId = parseInt(req.params.biodataId);
      const updatedBiodata = req.body;
      const filter = { biodataId };
      const updateDoc = { $set: updatedBiodata };
      delete updateDoc.$set._id;
      const result = await biodatasCollection.updateOne(filter, updateDoc);

      if (result.matchedCount === 0)
        return res.status(404).send({ message: "Biodata not found" });
      res.send({ success: true, message: "Biodata updated successfully" });
    });

    app.get("/recent-biodata", async (req, res) => {
      try {
        const cursor = biodatasCollection.find().sort({ date: -1 }).limit(4);

        const result = await cursor.toArray();
        res.send(result);
      } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).send({ error: "Failed to fetch the orders" });
      }
    });

    // favorites

    app.get("/favorites", async (req, res) => {
      const favorites = await favoritesCollection.find().toArray();
      res.send(favorites);
    });

    app.get("/favorites/:userId", async (req, res) => {
      const userId = req.params.userId;
      const query = { userId };
      const favorites = await favoritesCollection.find(query).toArray();
      res.send(favorites);
    });

    app.post("/favorites", verifyToken, async (req, res) => {
      const { biodataId, userId, name, permanentDivision, occupation } =
        req.body;

      try {
        // Check if the favorite already exists
        const existingFavorite = await favoritesCollection.findOne({
          biodataId,
          userId,
          name,
          permanentDivision,
          occupation,
        });

        if (existingFavorite) {
          return res
            .status(400)
            .send({ success: false, message: "Already in favorites." });
        }

        // Add new favorite
        const result = await favoritesCollection.insertOne({
          biodataId,
          userId,
          name,
          permanentDivision,
          occupation,
          createdAt: new Date(),
        });

        res.send({ success: true, message: "Added to favorites.", result });
      } catch (error) {
        console.error("Error adding to favorites:", error);
        res
          .status(500)
          .send({ success: false, message: "Failed to add to favorites." });
      }
    });

    app.delete("/favorites/:biodataId", verifyToken, async (req, res) => {
      const { biodataId } = req.params;

      const result = await favoritesCollection.deleteOne({ biodataId });
      if (result.deletedCount > 0) {
        res.send({ success: true, message: "Biodata removed from favorites." });
      } else {
        res.status(404).send({ success: false, message: "Biodata not found." });
      }
    });

    // add To payment-intent
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.get("/payments", async (req, res) => {
      const payments = await paymentCollection.find().toArray();
      res.send(payments);
    });

    app.get("/payments/:email", verifyToken, async (req, res) => {
      const query = { email: req.params.email };
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;

      const paymentResult = await paymentCollection.insertOne(payment);

      if (payment.cartIds && Array.isArray(payment.cartIds)) {
        const query = {
          _id: {
            $in: payment.cartIds.map((id) => new ObjectId(id)),
          },
        };

        res.send({ paymentResult });
      } else {
        res.send({
          paymentResult,
          deleteResult: null,
          message: "No cart items to delete.",
        });
      }
    });

    app.get("/payment/:transactionId", async (req, res) => {
      const transactionId = req.params.transactionId;

      try {
        const query = { transactionId: transactionId };
        const payment = await paymentCollection.findOne(query);

        if (!payment) {
          return res.status(404).send({ error: "Payment not found" });
        }

        res.send(payment);
      } catch (err) {
        console.error("Error fetching payment:", err);
        res.status(500).send({ error: "Failed to fetch payment" });
      }
    });

    // Chart and Stats
    app.get("/dashboard/stats", async (req, res) => {
      const totalUsers = await usersCollection.countDocuments();
      const totalBiodatas = await biodatasCollection.countDocuments();
      const totalPremiumUsers = await usersCollection.countDocuments({
        approvedPremium: true,
      });

      res.send({
        totalUsers,
        totalBiodatas,
        totalPremiumUsers,
      });
    });

    app.get("/dashboard/chart", async (req, res) => {
      const totalBiodatas = await biodatasCollection.countDocuments();
      const maleBiodatas = await biodatasCollection.countDocuments({
        type: { $regex: /^male$/i },
      });
      console.log("Count of male biodatas:", maleBiodatas);
      const femaleBiodatas = await biodatasCollection.countDocuments({
        type: { $regex: /^female$/i },
      });
      const premiumBiodatas = await usersCollection.countDocuments({
        approvedPremium: true,
      });

      const totalRevenue = await paymentCollection
        .aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: "$price" },
            },
          },
        ])
        .toArray();
      res.send({
        totalBiodatas,
        maleBiodatas,
        femaleBiodatas,
        premiumBiodatas,
        totalRevenue: totalRevenue[0]?.total || 0,
      });
    });

    // success stories
    app.get("/success-story", async (req, res) => {
      const successStories = await successCollection.find().toArray();
      res.send(successStories);
    });

    app.post("/success-story", async (req, res) => {
      const successStory = req.body;

      const result = await successCollection.insertOne(successStory);
      res.send(result);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Run the database connection setup
run().catch(console.dir);

// Root API Endpoint
app.get("/", (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Matrimony Nexus Server</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #ffffff; /* BgMainColor */
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #333;
        }
        .container {
          text-align: center;
          padding: 20px;
          border: 2px solid #c0272c; /* BgSecondary */
          border-radius: 10px;
          background-color: #F1494C; /* BgPrimary */
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        p {
          font-size: 1.2rem;
          margin: 5px 0;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          text-decoration: none;
          color: #ffffff;
          background-color: #c0272c; /* BgSecondary */
          padding: 10px 20px;
          border-radius: 5px;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        a:hover {
          background-color: #ffffff;
          color: #c0272c;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Matrimony Nexus Server</h1>
        <p>Your trusted server for connecting hearts!</p>
        <p>Server is running smoothly.</p>
        <a href="/biodatas">View Biodatas</a>
      </div>
    </body>
    </html>
  `;
  res.send(htmlContent);
});

// Start the Server
app.listen(port, () => {
  console.log(`Matrimony Nexus Server Is Running on Port: ${port}`);
});
