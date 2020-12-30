import { render, fireEvent } from "@testing-library/react";
import ShapeSelect from ".";

describe("ShapeSelect component", () => {
  it("renders the ul tag element", () => {
    const { container } = render(<ShapeSelect />);

    const shapeSelectContainer = container.querySelector(
      "ul.shape-select-container"
    );

    expect(shapeSelectContainer).toBeInTheDocument();
  });

  it("renders the list of options in the options prop", () => {
    const { container } = render(
      <ShapeSelect
        options={[
          { value: "test", label: "Test option", imageSrc: "./test/image" },
        ]}
      />
    );

    const optionsElements = container.querySelectorAll(
      "li.shape-select-option"
    );

    expect(optionsElements.length).toBe(1);

    optionsElements.forEach((optionElement) => {
      const iconElement = optionElement.querySelector("img.option-icon");

      expect(optionElement).toHaveAttribute("title");
      expect(iconElement).toBeInTheDocument();
      expect(iconElement).toHaveAttribute("src");
    });
  });

  it("renders selected option with a 'selected' class", () => {
    let selectedOption = "test 1";

    const { container } = render(
      <ShapeSelect
        selected={selectedOption}
        options={[
          { value: "test 1", label: "Test option", imageSrc: "./test/image" },
          { value: "test 2", label: "Test option", imageSrc: "./test/image" },
        ]}
      />
    );

    const selectedOptionElements = container.querySelectorAll(
      "li.shape-select-option.selected"
    );

    expect(selectedOptionElements.length).toBe(1);
  });

  it("calls onSelect when clicking on an option", () => {
    const onSelect = jest.fn();

    const { container } = render(
      <ShapeSelect
        options={[
          { value: "test 1", label: "Test option", imageSrc: "./test/image" },
          { value: "test 2", label: "Test option", imageSrc: "./test/image" },
        ]}
        onSelect={onSelect}
      />
    );

    const selectedOptionElement = container.querySelector(
      "li.shape-select-option"
    ) as Element;

    fireEvent.click(selectedOptionElement);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith("test 1");
  });
});
