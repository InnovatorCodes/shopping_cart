import { render, screen } from "@testing-library/react";
import ProductCards from "../ProductCards";
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock("./Card", () => ({
  default: vi.fn(() => <div data-testid="card"></div>),
}));

describe("ProductCards", () => {
  const mockCart = { items: [{ id: 1, quantity: 2 }] };
  const mockImages = { "image1.jpg": "mockImage1" };
  const mockSetCart = vi.fn();
  const mockProducts = [
    { id: 1, category: "audio", image_file: "image1.jpg" },
    { id: 2, category: "computers", image_file: "image1.jpg" },
    { id: 3, category: "VR", image_file: "image1.jpg" },
  ];

  it("renders loader when no products are available", () => {
    render(
      <MemoryRouter>
          <ProductCards
            products={[]}
            cart={mockCart}
            setCart={mockSetCart}
            images={mockImages}
            userID={123}
            filter="ALL"
          />
      </MemoryRouter>
    );
    expect(screen.getByText((_, el) => el?.classList.contains("loader"))).toBeInTheDocument();
  });

  it("renders all cards if filter is ALL", () => {
    render(
      <MemoryRouter>
          <ProductCards
            products={mockProducts}
            cart={mockCart}
            setCart={mockSetCart}
            images={mockImages}
            userID={123}
            filter="ALL"
          />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId("card")).toHaveLength(mockProducts.length);
  });

  it("filters products by category AW", () => {
    render(
      <MemoryRouter>
          <ProductCards
            products={mockProducts}
            cart={mockCart}
            setCart={mockSetCart}
            images={mockImages}
            userID={123}
            filter="AW"
          />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId("card")).toHaveLength(1);
  });

  it("filters products by category CA", () => {
    render(
      <MemoryRouter>
          <ProductCards
            products={mockProducts}
            cart={mockCart}
            setCart={mockSetCart}
            images={mockImages}
            userID={123}
            filter="CA"
          />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId("card")).toHaveLength(1);
  });

  it("filters products by category GVR", () => {
    render(
      <MemoryRouter>
          <ProductCards
            products={mockProducts}
            cart={mockCart}
            setCart={mockSetCart}
            images={mockImages}
            userID={123}
            filter="GVR"
          />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId("card")).toHaveLength(1);
  });
});
