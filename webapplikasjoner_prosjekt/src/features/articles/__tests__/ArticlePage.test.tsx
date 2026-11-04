// @vitest-environment happy-dom
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticlePage } from "../pages/ArticlePage";

// Component-test
test("renders an article with image", () => {
  const mockProps = {
    params: { id: "1" },
  } as any;

  render(<ArticlePage {...mockProps} />);
  expect(screen.getByRole("article")).toBeInTheDocument();

  const image = screen.getByAltText("article-image");
  expect(image).toBeInTheDocument();
});

test("fallback when no article is found", () => {
  const mockPropsEmpty = {
    params: { id: null },
  } as any;

  render(<ArticlePage {...mockPropsEmpty} />);
  expect(screen.getByText("The article could not be found."));
});
