export const USERNAME_MAX_LENGTH = 30;
export const PASSWORD_MAX_LENGTH = 50;

export type UserValidation =
  | { ok: true }
  | { ok: false; field: string; error: string };

export function validateUser(user: {
  username: string;
  password: string;
}): UserValidation {
  const username = user.username.trim();
  if (username.length === 0) {
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
