// @vitest-environment happy-dom

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateUserPage } from "@/app/pages/CreateUserPage";

describe("CreateUserPage ", () => {
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