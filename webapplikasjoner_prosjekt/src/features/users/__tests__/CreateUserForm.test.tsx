// @vitest-environment happy-dom

import { describe, it, expect, vi } from "vitest";
import { CreateUserForm } from "../components/CreateUserForm";
import { render, screen } from "@testing-library/react";
// Fikset importen her. Du hadde feil path
import { userEvent } from "@testing-library/user-event";
import {
  USERNAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
} from "@/features/users/utils/validateUser";
import {
  createUserAction,
  type CreateUserFormAction,
} from "@/features/users/actions";

describe("CreateUserForm", () => {
  it("Should display a success message when inputting valid data", async () => {
    // Siden du har action som prop så kan vi fake den
    // Vi er ikke interessert i at action skal kjøres, bare at komponenten rendrer
    // Nå kan vi simulere resultatet av action under test
    const action = vi.fn<CreateUserFormAction>().mockResolvedValue({
      ok: true,
      data: {
        id: "1",
        email: "validEmail@example.com",
        username: "validUsername",
        password: "validPassword",
      },
      code: 201,
    });
    // For å bruker userEvent må vi "setup" den.
    const user = userEvent.setup();
    render(<CreateUserForm action={action} />);
    await user.type(screen.getByLabelText("Email:"), "validEmail@example.com");
    await user.type(screen.getByLabelText("Password:"), "validPassword");
    await user.click(screen.getByRole("button"));
    // Bruker async sjekk her for å vente på resultatet
    expect(
      await screen.findByText("Account created successfully!"),
    ).toBeInTheDocument();
  });
  it("Should display the proper error message when input fields are empty", async () => {
    const user = userEvent.setup();
    render(<CreateUserForm action={createUserAction} />);
    await user.click(screen.getByRole("button"));
    expect(
      await screen.findByText("Input fields cannot be empty."),
    ).toBeInTheDocument();
  });
  it("Should display the proper error message when inputting an email consisting of over 100 characters", async () => {
    const user = userEvent.setup();
    render(<CreateUserForm action={createUserAction} />);
    await user.type(
      screen.getByLabelText("Email:"),
      "invalidEmailThatIsWayTooLongAndIsOverOneHundredCharactersinvalidEmailThatIsWayTooLongAndIsOverOneHundredCharacters@example.com",
    );
    await user.type(screen.getByLabelText("Password:"), "invalidPassword");
    await user.click(screen.getByRole("button"));
    expect(
      await screen.findByText(
        `Email cannot exceed ${EMAIL_MAX_LENGTH} characters.`,
      ),
    ).toBeInTheDocument();
  });
  it("Should display the proper error message when inputting a password consisting of over 50 characters", async () => {
    const user = userEvent.setup();
    render(<CreateUserForm action={createUserAction} />);
    await user.type(screen.getByLabelText("Email:"), "validEmail@example.com");
    await user.type(
      screen.getByLabelText("Password:"),
      "invalidPasswordThatIsWayTooLongAndExceedsTheMaximumLengthAllowed",
    );
    await user.click(screen.getByRole("button"));
    expect(
      await screen.findByText(
        `Password cannot exceed ${PASSWORD_MAX_LENGTH} characters.`,
      ),
    ).toBeInTheDocument();
  });
  it("Should display the proper error message when a user with the same email already exists", async () => {
    const user = userEvent.setup();
    render(<CreateUserForm action={createUserAction} />);
    await user.type(screen.getByLabelText("Email:"), "jane.doe@example.com");
    await user.type(screen.getByLabelText("Password:"), "password456");
    await user.click(screen.getByRole("button"));
    expect(
      await screen.findByText(
        "A user with this email or username already exists.",
      ),
    ).toBeInTheDocument();
  });
});
