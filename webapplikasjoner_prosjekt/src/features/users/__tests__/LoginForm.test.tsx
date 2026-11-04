// @vitest-environment happy-dom

import { describe, it, expect, vi } from "vitest";
import { LoginForm } from "../components/LoginForm";
import { render, screen } from "@testing-library/react";
// Fikset importen her. Du hadde feil path
import { userEvent } from "@testing-library/user-event";
import {
  USERNAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
} from "@/features/users/utils/validateUser";
import {
  loginAction,
  LoginFormAction,
  type CreateUserFormAction,
} from "@/features/users/actions";

describe("LoginForm", () => {
  it("Should display a success message when inputting valid data", async () => {
    // Siden du har action som prop så kan vi fake den
    // Vi er ikke interessert i at action skal kjøres, bare at komponenten rendrer
    // Nå kan vi simulere resultatet av action under test
    const action = vi.fn<LoginFormAction>().mockResolvedValue({
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
    render(<LoginForm action={action} />);
    await user.type(screen.getByLabelText("Email:"), "validEmail@example.com");
    await user.type(screen.getByLabelText("Password:"), "validPassword");
    await user.click(screen.getByRole("button"));
    // Bruker async sjekk her for å vente på resultatet
    expect(
      await screen.findByText("Logged in successfully!"),
    ).toBeInTheDocument();
  });
  it("Should display the proper error message when input fields are empty", async () => {
    const user = userEvent.setup();
    render(<LoginForm action={loginAction} />);
    await user.click(screen.getByRole("button"));
    expect(
      await screen.findByText("Input fields cannot be empty."),
    ).toBeInTheDocument();
  });
  it("Should display the proper error message when email or password is incorrect", async () => {
    const invalidloginAction = vi.fn<LoginFormAction>().mockResolvedValue({
      ok: false,
      error: {
        code: 404,
        message: "Wrong email or password.",
      },
      values: {
        email: "invalidEmail@example.com",
        password: "invalidPassword",
      },
    });
    const user = userEvent.setup();
    render(<LoginForm action={invalidloginAction} />);
    await user.type(
      screen.getByLabelText("Email:"),
      "invalidEmail@example.com",
    );
    await user.type(screen.getByLabelText("Password:"), "invalidPassword");
    await user.click(screen.getByRole("button"));
    expect(
      await screen.findByText("Wrong email or password."),
    ).toBeInTheDocument();
  });
});
