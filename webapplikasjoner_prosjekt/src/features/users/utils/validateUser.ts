export const EMAIL_MAX_LENGTH = 100;
export const EMAIL_REGEX = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
export const USERNAME_MAX_LENGTH = 30;
export const PASSWORD_MAX_LENGTH = 50;

export type UserValidation =
  | { ok: true }
  | { ok: false; field: string; error: string };

export function validateUser(user: {
  email: string;
  username?: string | undefined | null;
  password: string;
}): UserValidation {
  const email = user.email.trim();
  if (email.length === 0) {
    return { ok: false, field: "email", error: "Email cannot be empty." };
  }
  if (email.length > EMAIL_MAX_LENGTH) {
    return {
      ok: false,
      field: "email",
      error: `Email cannot exceed ${EMAIL_MAX_LENGTH} characters.`,
    };
  }
  if (!EMAIL_REGEX.test(email)) {
    return {
      ok: false,
      field: "email",
      error: "The input is in an invalid email format.",
    };
  }

  const username = user.username?.trim() ?? "";
  if (username && username.length === 0) {
    return { ok: false, field: "username", error: "Username cannot be empty." };
  }
  if (username.length > USERNAME_MAX_LENGTH) {
    return {
      ok: false,
      field: "username",
      error: `Username cannot exceed ${USERNAME_MAX_LENGTH} characters.`,
    };
  }

  const password = user.password.trim();
  if (password.length === 0) {
    return { ok: false, field: "password", error: "Password cannot be empty." };
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return {
      ok: false,
      field: "password",
      error: `Password cannot exceed ${PASSWORD_MAX_LENGTH} characters.`,
    };
  }
  return { ok: true };
}
