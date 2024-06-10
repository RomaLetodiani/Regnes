import { render, screen, cleanup } from "@testing-library/react";
import Input, { inputI } from "./Input";

// Helper function to render the Input component
const renderInput = (props: inputI) => {
  render(<Input {...props} />);
};

describe("Input", () => {
  afterEach(cleanup);

  test("renders basic input with label and id", () => {
    renderInput({ label: "Email", id: "email" });

    const input = screen.getByLabelText("Email");
    const label = screen.getByText("Email");
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "email");
  });

  test("label moves up on focus", async () => {
    renderInput({ label: "Email", id: "email", focus: true });
    const label = screen.getByText("Email");

    expect(label).toHaveClass("top-1");
  });

  test("renders error message when hasError", () => {
    renderInput({ label: "Email", id: "email", hasError: true, errorMessage: "Email is required" });
    const errorMessage = screen.getByText("Email is required");

    expect(errorMessage).toBeInTheDocument();
  });

  test("input is disabled when disabled prop is true", () => {
    renderInput({ label: "Email", id: "email", disabled: true });
    const input = screen.getByLabelText("Email");

    expect(input).toBeDisabled();
  });

  test("renders different input types correctly", () => {
    renderInput({ label: "Password", id: "password", type: "password" });
    const input = screen.getByLabelText("Password");

    expect(input).toHaveAttribute("type", "password");
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<Input label="Email" id="email" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
