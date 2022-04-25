import { Todo } from "./models/Todo.js";


export const root = {
    getTodos: () => Todo.find(),
    createTodo: async (props) => {
        const { input } = props;
        const todo = new Todo(input);
        console.log(todo)
        await todo.save();
        return todo;
    },
};