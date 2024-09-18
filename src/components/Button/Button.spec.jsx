import { render, screen } from '@testing-library/react';
import { Button } from ".";

describe('<Button />', ()=>{
    it('Should render the button with the text', () => {
        render(<Button text = "Load mode"/>)
        const button = screen.getByRole('button', {name: /load more/i});
        expect(button).toBeInTheDocument()
    });
});