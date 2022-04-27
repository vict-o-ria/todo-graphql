import { createStore, createEvent } from "effector";

export const reset = createEvent();

export const changeName = createEvent();

export const $inputName = createStore("")
    .on(changeName, (_, value) => value)
    .reset(reset);

export const changeTodo = createEvent();

export const $inputTodo = createStore("")
    .on(changeTodo, (_, value) => value)
    .reset(reset);
