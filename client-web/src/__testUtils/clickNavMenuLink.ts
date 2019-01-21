import { fireEvent, getByText } from "react-testing-library";

export default function clickNavMenuLink(container: HTMLElement, text) {
    fireEvent.click(
        getByText(container.querySelector('nav'), text)
    );
}