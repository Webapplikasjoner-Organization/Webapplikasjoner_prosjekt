// @vitest-environment happy-dom

import { describe, it, expect, beforeEach } from "vitest";
import { CreateUserForm } from "../components/CreateUserForm";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event/dist/cjs/setup/index.js";
import {
  USERNAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "@/features/users/utils/validateUser";
import { createUserAction } from "@/features/users/actions";

describe("CreateUserForm", () => {
  it("Should display a success message when inputting valid data", async () => {
    render(<CreateUserForm action={createUserAction} />);
    userEvent.type(screen.getByLabelText("Username:"), "validUsername");
    userEvent.type(screen.getByLabelText("Password:"), "validPassword");
    userEvent.click(screen.getByRole("button"));
    expect(
      screen.getByText("Account created successfully!"),
    ).toBeInTheDocument();
  });
  it("Should display the proper error message when username is empty", async () => {
    render(<CreateUserForm action={createUserAction} />);
    userEvent.type(screen.getByLabelText("Username:"), "");
    userEvent.type(screen.getByLabelText("Password:"), "validPassword");
    userEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Username cannot be empty.")).toBeInTheDocument();
  });
  it("Should display the proper error message when inputting a username consisting of over 30 characters", async () => {
    render(<CreateUserForm action={createUserAction} />);
    userEvent.type(
      screen.getByLabelText("Username:"),
      "invalidUsernameThatIsWayTooLong",
    );
    userEvent.type(screen.getByLabelText("Password:"), "invalidPassword");
    userEvent.click(screen.getByRole("button"));
    expect(
      screen.getByText(
        `Username cannot exceed ${USERNAME_MAX_LENGTH} characters.`,
      ),
    ).toBeInTheDocument();
  });
  it("Should display the proper error message when inputting a password consisting of over 50 characters", async () => {
    render(<CreateUserForm action={createUserAction} />);
    userEvent.type(screen.getByLabelText("Username:"), "validUsername");
    userEvent.type(
      screen.getByLabelText("Password:"),
      "invalidPasswordThatIsWayTooLongAndExceedsTheMaximumLengthAllowed",
    );
    userEvent.click(screen.getByRole("button"));
    expect(
      screen.getByText(
        `Password cannot exceed ${PASSWORD_MAX_LENGTH} characters.`,
      ),
    ).toBeInTheDocument();
  });
});
