import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import "./App.css";
import { CREATE_TODO } from "./mutations/user";
import { GET_ALL_USERS, GET_USER } from "./query/user";

function App() {
    const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
    // const { data: oneUser, loading: loadingOneUser } = useQuery(GET_USER, {variables:{
    // 	id: 1
    // }});
    // console.log(oneUser)
    const [createTodo] = useMutation(CREATE_TODO);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [todo, setTodo] = useState("");

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers);
        }
    }, [data]);

    const addUser = (e) => {
        e.preventDefault();
        createTodo({
            variables: {
                input: {
                    username,
                    text: todo,
                },
            },
        }).then(({ data }) => {
            console.log(data);
            setTodo("");
            setUsername("");
        });
    };

    const getAll = (e) => {
        e.preventDefault();
        refetch();
    };

    if (loading) {
        return <h1>loading...</h1>;
    }

    return (
        <div className="App">
            <h1>ToDo</h1>
            <form>
                <div className="form-container">
                    <label htmlFor="todo">ToDo's text:</label>
                    <input
                        id="todo"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        type="text"
                    />
                    <label htmlFor="username">Your name:</label>
                    <input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                    />

                    <div className="buttons">
                        <button onClick={addUser}>Create ToDo</button>
                        <button onClick={getAll}>Get all users</button>
                    </div>
                </div>
            </form>
            <div>
				<h3>ToDo list:</h3>
                {users.length ? users.map((user) => (
                    <div key={user.id}>
                        {user.id}. {user.username} {user.age}
                    </div>
                )) : <span>all done</span>}
            </div>
        </div>
    );
}

export default App;
