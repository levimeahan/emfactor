import { waitForElement, getByText } from "react-testing-library";

export default async function(container: HTMLElement, textMatch) {
    return await waitForElement(
        () => getByText(container, textMatch, { selector: '[data-testid="errorMessage"]' }),
        { container }
    );
}

