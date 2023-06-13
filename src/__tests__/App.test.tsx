import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

it("should have hello world", () => {
  render(<App />);
  const message = screen.queryByText(/Hello World/i);
  expect(message).toBeVisible();
});

it("should have default button text with 0 count", () => {
  render(<App />);

  const button = screen.getByRole("button");

  expect(button).toBeVisible();
  expect(button.innerHTML).toEqual("count is 0");
});

it("should update button text with 1 count on button click", () => {
  render(<App />);

  const button = screen.getByRole("button");

  expect(button).toBeVisible();
  expect(button.innerHTML).toEqual("count is 0");
  fireEvent.click(button);
  expect(button).toBeVisible();
  expect(button.innerHTML).toEqual("count is 1");
});
