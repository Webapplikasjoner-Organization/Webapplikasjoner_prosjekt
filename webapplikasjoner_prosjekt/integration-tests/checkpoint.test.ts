import { test, expect } from "@playwright/test";
import { customRandom, random } from "nanoid";

test("User can register an account and navigate protected routes", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link").nth(4).click();
  await page.getByRole("link", { name: "Register here" }).click();
  await page.getByRole("textbox", { name: "Email:" }).click();
  await page.getByRole("textbox", { name: "Email:" }).fill("daniel");
  await page
    .getByRole("textbox", { name: "Email:" })
    .press("Alt+ControlOrMeta+@");
  await page
    .getByRole("textbox", { name: "Email:" })
    .fill(`daniel@pk${customRandom("0123456789", 10, random)}.no`);
  await page.getByRole("textbox", { name: "Password:" }).click();
  await page.getByRole("textbox", { name: "Password:" }).fill("badpassword");
  await page.getByRole("button", { name: "Create Account" }).click();
  await page.getByRole("link", { name: "My Games" }).click();
  await page.getByRole("link").nth(4).click();
  await page.getByRole("link", { name: "Log out" }).click();
});

test("User can log in and navigate protected routes", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link").nth(4).click();
  await page.getByRole("textbox", { name: "Email:" }).click();
  await page.getByRole("textbox", { name: "Email:" }).fill("danielny2");
  await page
    .getByRole("textbox", { name: "Email:" })
    .press("Alt+ControlOrMeta+@");
  await page.getByRole("textbox", { name: "Email:" }).fill("danielny2@pk.no");
  await page.getByRole("textbox", { name: "Password:" }).click();
  await page.getByRole("textbox", { name: "Password:" }).fill("pass");
  await page.getByRole("button", { name: "Log in" }).click();
  await page.getByRole("link", { name: "My Games" }).click();
  await page.getByRole("link").nth(4).click();
  await page.getByRole("link", { name: "Log out" }).click();
});
