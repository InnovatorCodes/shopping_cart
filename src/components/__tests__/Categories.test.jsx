// ...previous imports
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Categories from "../Categories";
import { MemoryRouter } from "react-router-dom";

// Mock images
vi.mock("../assets/audiowear.webp", () => "audioWear.jpg");
vi.mock("../assets/compAcc.avif", () => "compAcc.jpg");
vi.mock("../assets/phonetab.png", () => "phoneTab.png");
vi.mock("../assets/gamingvr.webp", () => "gamingVR.jpg");
vi.mock("../assets/smarthome.webp", () => "smartHome.jpg");

// Mock useNavigate
const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Categories component", () => {
  let setFilterMock;

  beforeEach(() => {
    setFilterMock = vi.fn();
    navigateMock.mockReset(); // reset between tests
  });

  it("renders all category titles", () => {
    render(<Categories setFilter={setFilterMock} />, { wrapper: MemoryRouter });
    expect(screen.getByText("Browse Categories")).toBeInTheDocument();
    expect(screen.getByText("Audio & Wearables")).toBeInTheDocument();
    expect(screen.getByText("Computers & Accessories")).toBeInTheDocument();
    expect(screen.getByText("Smartphones & Tablets")).toBeInTheDocument();
    expect(screen.getByText("Smart Home Devices")).toBeInTheDocument();
    expect(screen.getByText("Gaming & VR")).toBeInTheDocument();
  });

  it("calls setFilter and navigate when a category is clicked", () => {
    render(<Categories setFilter={setFilterMock} />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText("Gaming & VR"));
    expect(setFilterMock).toHaveBeenCalledWith("GVR");
    expect(navigateMock).toHaveBeenCalledWith("/shop");
  });

  // ✅ NEW TEST 1: Renders correct number of category elements
  it("renders 5 categories", () => {
    render(<Categories setFilter={setFilterMock} />, { wrapper: MemoryRouter });
    const categoryElements = screen.getAllByRole("img");
    expect(categoryElements.length).toBe(5); // since each category has one image
  });

  // ✅ NEW TEST 2: All category images have a valid src
  it("renders each category with an image that has a src", () => {
    render(<Categories setFilter={setFilterMock} />, { wrapper: MemoryRouter });
    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      expect(img).toHaveAttribute("src");
      expect(img.getAttribute("src")).not.toBe("");
    });
  });
});
