import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders with primary styles by default", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary text-white");
  });

  test("renders with secondary styles when btnType is secondary", () => {
    render(<Button btnType="secondary">Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-secondary-200 text-primary");
  });

  test("renders with danger styles when btnType is danger", () => {
    render(<Button btnType="danger">Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-danger text-white");
  });

  test("applies additional class names", () => {
    render(<Button className="additional-class">Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("additional-class");
  });

  test("renders with disabled attribute", () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeDisabled();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<Button>Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
