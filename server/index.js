const mongoose = require("mongoose");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");
const users = [];
// const users = [{ id: 1, username: "Vika", age: 25 }];

const app = express();
app.use(cors());

const createItem = (input) => {
    const id = Date.now();
    return {
        id,
        ...input,
    };
};

const root = {
    getAllUsers: () => {
        return users;
    },
    getUser: ({ id }) => {
        return users.find((user) => user.id == id);
    },
    createUser: ({ input }) => {
        const user = createItem(input);
        users.push(user);
        return user;
    },
    createTodo: (props) => {
        const { input } = props;
        console.log(props);
        return createItem(input);
    },
};

app.use(
    "/graphql",
    graphqlHTTP({
        graphiql: true,
        schema,
        rootValue: root,
    })
);

async function start() {
    try {
        await mongoose.connect("mongodb://localhost:27017/mongo", {
            useNewUrlParser: true,
            //   useFindAndModify: false,
        });

        console.log("mongo connected");

        app.listen(5000, () => console.log("server on port 5000"));
    } catch (e) {
        console.log(e);
    }
}

start();
