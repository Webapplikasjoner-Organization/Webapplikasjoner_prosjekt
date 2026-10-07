// @vitest-environment happy-dom

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateUserPage } from "@/app/pages/CreateUserPage";
import { navigate } from "rwsdk/client";

describe("CreateUserPage ", () => {
  vi.mock("rwsdk/client", () => ({
    navigate: vi.fn(),
  }));

  it("Username and Password are on the screen after submission", async () => {
    const user = userEvent.setup();
    render(<CreateUserPage />);

    await user.type(screen.getByPlaceholderText("username"), "Daniel");
    await user.type(screen.getByPlaceholderText("password"), "BadPassword");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Daniel")).toBeInTheDocument();
    expect(screen.getByText("BadPassword")).toBeInTheDocument();
  });
});