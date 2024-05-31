import cors from "cors";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import ConnectMongoDBSession from "connect-mongodb-session";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {  buildContext } from "graphql-passport";
import passport from "passport";
import session from "express-session";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDB } from "./db/connectDB.js";
import { configurePassport } from "./passport/passport.config.js";




dotenv.config();
configurePassport();



const app = express();

// Create an HTTP server
const httpServer = http.createServer(app);

const MongoDBStore = ConnectMongoDBSession(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions"
})

store.on("error", (err) => console.log(err));

app.use(
  session({
    secret: process.env.SESSSION_SECRET,
    resave: false,
    saveUninitialized: false,
   cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
   },
  store: store
  })
)
app.use(passport.initialize());
app.use(passport.session());


// Create a new Apollo Server instance
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Start the Apollo Server
await server.start();

app.get("/", (req, res) => {
  res.send({
    msg: "HELLO",
  });
});

app.use(
  "/",
  cors({
    origin: "http://localhost:3000",
    credentials: true
  }), // Enable CORS
  express.json(), // Parse JSON bodies
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res }), // Provide request context
  })
);

// Connect to the database
await connectDB();

// Start the HTTP server
await new Promise((resolve) => httpServer.listen(process.env.PORT, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
