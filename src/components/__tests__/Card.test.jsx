// Card.test.jsx
import { describe, it, expect, vi } from "vitest"; // ✅ replace jest with vi
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../Card";
import { BrowserRouter } from "react-router-dom";

const mockProduct = {
  id: 1,
  name: "Test Product",
  price: 999,
  image_file: "test.jpg",
};

const mockImages = {
  "images/test.jpg": "http://example.com/test.jpg",
};

const setup = (props = {}) => {
  const defaultProps = {
    product: mockProduct,
    cart: { items: [] },
    setCart: vi.fn(), // ✅ use vi.fn() instead of jest.fn()
    quantity: 0,
    images: mockImages,
    userID: 123,
    ...props,
  };
  return render(
    <BrowserRouter>
      <Card {...defaultProps} />
    </BrowserRouter>,
  );
};

describe("Card component", () => {
  it("renders product name and price", () => {
    setup();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("₹ 999")).toBeInTheDocument();
  });

  it("renders image correctly", () => {
    setup();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "http://example.com/test.jpg");
  });

  it("shows Add to Cart when quantity is 0", () => {
    setup({ quantity: 0 });
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("increments quantity on + click", () => {
    const setCart = vi.fn();
    setup({ quantity: 1, setCart });
    fireEvent.click(screen.getByText("+"));
    expect(setCart).toHaveBeenCalled();
  });

  it("decrements quantity on - click", () => {
    const setCart = vi.fn();
    setup({ quantity: 2, setCart });
    fireEvent.click(screen.getByText("-"));
    expect(setCart).toHaveBeenCalled();
  });

  it("allows quantity editing via input", () => {
    const setCart = vi.fn();
    setup({ quantity: 3, setCart });
    fireEvent.click(screen.getByText("3"));
    const input = screen.getByDisplayValue("3");
    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.blur(input);
    expect(setCart).toHaveBeenCalled();
  });
});
