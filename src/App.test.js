import { render, screen } from "@testing-library/react";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store/store";

test("renders title", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const title = screen.getByText("Shapes Exercise");
  expect(title).toBeInTheDocument();
});

test("renders source link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const link = screen.getByText("Source");
  expect(link).toBeInTheDocument();
  expect(link).toHaveTextContent('Source');
});