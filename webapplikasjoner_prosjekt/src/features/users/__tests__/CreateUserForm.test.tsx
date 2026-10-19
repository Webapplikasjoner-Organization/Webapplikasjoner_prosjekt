// @vitest-environment happy-dom

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateUserForm } from "@/features/users/components/CreateUserForm";

describe("CreateUserForm", () => {
  it("No errors are displayed with correct input data", async () => {
    render(<CreateUserForm action={vi.fn()} />);
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button");

    await userEvent.type(usernameInput, "username1");
    await userEvent.type(passwordInput, "password1");
    await userEvent.click(submitButton);

    expect();
  });
});
