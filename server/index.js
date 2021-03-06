import mongoose from "mongoose";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import schema from "./schema.js";
import { root } from "./resolvers.js";

async function start() {
    try {
        const app = express();
        app.use(cors());
        app.use(
            "/graphql",
            graphqlHTTP({
                graphiql: true,
                schema,
                rootValue: root,
            })
        );
        await mongoose.connect("mongodb://mongodb:27017/mongo", {
            useNewUrlParser: true,
            //   useFindAndModify: false,
        });

        console.log("mongo connected");

        app.listen(5000, () => console.log("server on port 5000"));
    } catch (e) {
        console.log("!!", e);
    }
}

start();
