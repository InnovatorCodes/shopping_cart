import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock assets
vi.mock("../assets/cart.svg", () => "cart.svg");
vi.mock("../assets/userProfile.svg", () => "userProfile.svg");

// Mock navigate
const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Header Component", () => {
  let setUserMock;

  beforeEach(() => {
    setUserMock = vi.fn();
    navigateMock.mockReset();
  });

  it("renders correctly with active page as home and no user", () => {
    render(<Header active="home" user={null} setUser={setUserMock} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText("LUNO")).toBeInTheDocument();
    expect(screen.getByText("Home")).toHaveClass("active");
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("navigates to login when cart is clicked without a user", () => {
    render(<Header active="home" user={null} setUser={setUserMock} />, {
      wrapper: MemoryRouter,
    });
    fireEvent.click(screen.getByAltText("cart"));
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  it("shows user info and logout button when user is present", () => {
    const mockUser = { full_name: "John Doe" };
    render(<Header active="shop" user={mockUser} setUser={setUserMock} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText("Welcome,")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("navigates to /cart when cart is clicked and user is present", () => {
    const mockUser = { full_name: "Jane Doe" };
    render(<Header active="shop" user={mockUser} setUser={setUserMock} />, {
      wrapper: MemoryRouter,
    });
    fireEvent.click(screen.getByAltText("cart"));
    expect(navigateMock).toHaveBeenCalledWith("/cart");
  });

  it("calls setUser with null when logout is clicked", () => {
    const mockUser = { full_name: "Jane Doe" };
    render(<Header active="shop" user={mockUser} setUser={setUserMock} />, {
      wrapper: MemoryRouter,
    });
    fireEvent.click(screen.getByText("Logout"));
    expect(setUserMock).toHaveBeenCalledWith(null);
  });

  it("highlights shop link when active prop is shop", () => {
    render(<Header active="shop" user={null} setUser={setUserMock} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText("Shop")).toHaveClass("active");
  });
});
