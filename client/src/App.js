import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import "./App.css";
import { CREATE_TODO } from "./mutations/user";
import { GET_TODOS, GET_ALL_USERS } from "./query/user";
import {
    $inputName,
    $inputTodo,
    changeName,
    changeTodo,
    reset,
} from "./models/input";
import { useStore, useEvent } from "effector-react";

function App() {
    const { data: usersData } = useQuery(GET_ALL_USERS);
    const users = usersData?.getTodos;
    const { data, loading, refetch } = useQuery(GET_TODOS);

    const [createTodo] = useMutation(CREATE_TODO);
    const [todos, setTodos] = useState([]);
    const username = useStore($inputName);
    const todo = useStore($inputTodo);
    // for testing
    const changeNameEvent = useEvent(changeName);
    const changeTodoEvent = useEvent(changeTodo);

    useEffect(() => {
        if (!loading) {
            setTodos(data.getTodos);
        }
    }, [data]);

    const addTodo = (e) => {
        e.preventDefault();
        createTodo({
            variables: {
                input: {
                    username,
                    text: todo,
                },
            },
        }).then(() => {
            reset();
            refetch();
        });
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
                        onChange={(e) => changeTodoEvent(e.target.value)}
                        type="text"
                    />
                    <label htmlFor="username">Your name:</label>
                    <input
                        id="username"
                        value={username}
                        onChange={(e) => changeNameEvent(e.target.value)}
                        type="text"
                    />

                    <div className="buttons">
                        <button onClick={addTodo}>Create ToDo</button>
                    </div>
                </div>
            </form>
            <div>
                <h3>ToDo list:</h3>
                {todos.length ? (
                    todos.map((todo, idx) => (
                        <div key={todo.id}>
                            {idx + 1}. {todo.username}: "{todo.text}"
                        </div>
                    ))
                ) : (
                    <span>all done</span>
                )}
            </div>
            <div>
                <h3>Users:</h3>
                {users?.map((user) => (
                    <div key={user.id}>{user.username}</div>
                ))}
            </div>
        </div>
    );
}

export default App;
