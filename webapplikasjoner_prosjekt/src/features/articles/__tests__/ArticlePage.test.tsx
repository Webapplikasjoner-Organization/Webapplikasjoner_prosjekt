// @vitest-environment happy-dom
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticlePage } from "../pages/ArticlePage";


test('renders correct article with pic', () => {
    
    const mockProps = {
    params: { id: "1" }
  } as any;

    render(<ArticlePage {...mockProps}/>);
        expect(screen.getByText('Article title 1')).toBeInTheDocument();
        expect(screen.getByText('This is sample article content.')).toBeInTheDocument();
        
        const image = screen.getByAltText('article-image');
        expect(image).toBeInTheDocument;
})


