import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { fireEvent, render } from "@testing-library/react";
import { allSettled, fork } from "effector";
import { Provider } from "effector-react/scope";
import App from "./App";
import { MockedProvider } from "@apollo/react-testing";
import { GET_TODOS } from "./query/user";
import wait from "waait";
import { $inputName, $inputTodo, changeName, changeTodo } from "./models/input";

const mocks = [
    {
        request: {
            query: GET_TODOS,
        },
        result: {
            data: {
                getTodos: [],
            },
        },
    },
];

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
});

describe("testing app component", () => {
    test("there are loadings", () => {
        const scope = fork();
        const rendered = render(
            <ApolloProvider client={client}>
                <Provider value={scope}>
                    <App />
                </Provider>
            </ApolloProvider>
        );

        expect(rendered.getByText("loading...")).toBeInTheDocument();

        // можно делать что угодно с компонентом
        // и проверять что угодно в скоупе
    });

    test("there are title and 'all done' when loaded", async () => {
        const scope = fork();

        const rendered = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Provider value={scope}>
                    <App />
                </Provider>
            </MockedProvider>
        );

        expect(rendered);

        await wait(10);

        const title = rendered.getByText("ToDo");
        const noData = rendered.getByText("all done");

        expect(title).toBeInTheDocument();
        expect(noData).toBeInTheDocument();
    });
});

describe("testing effector state", () => {
    test("testing events", async () => {
        const scope = fork();

        await allSettled(changeName, { scope, params: "123" });
        await allSettled(changeTodo, { scope, params: "todo" });

        expect(scope.getState($inputName)).toBe("123");
        expect(scope.getState($inputTodo)).toBe("todo");
    });
});

describe("testing interaction", () => {
    test("testing inputs", async () => {
        const scope = fork();
        const rendered = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Provider value={scope}>
                    <App />
                </Provider>
            </MockedProvider>
        );
        await wait(10);

        const input = rendered.getByLabelText("ToDo's text:");
        fireEvent.change(input, { target: { value: "23" } });
        expect(input.value).toBe("23");

        const inputName = rendered.getByLabelText("Your name:");
        fireEvent.change(inputName, { target: { value: "name" } });
        expect(inputName.value).toBe("name");
    });

    test("testing creation todo", async () => {
        const scope = fork();
        const rendered = render(
            <ApolloProvider client={client}>
                <Provider value={scope}>
                    <App />
                </Provider>
            </ApolloProvider>
        );
        await wait(100);

        const input = rendered.getByLabelText("ToDo's text:");
        fireEvent.change(input, { target: { value: "to work" } });

        const name = Date.now();
        const inputName = rendered.getByLabelText("Your name:");
        fireEvent.change(inputName, { target: { value: name } });

        const button = rendered.getByRole("button");
        fireEvent.click(button);

        await wait(100);

        const resultName = rendered.getByText(name.toString());
        expect(resultName).toBeInTheDocument();
    });
});
