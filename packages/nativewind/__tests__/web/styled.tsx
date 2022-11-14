import { render } from "@testing-library/react-native";
import { createElement, ReactNode } from "react";
import { ViewStyle } from "react-native";
import { styled } from "../../src";

const Component = jest.fn(
  (props: { children?: ReactNode; style?: ViewStyle }) => <>{props.children}</>
);

afterEach(() => {
  jest.clearAllMocks();
});

test("styled", () => {
  const StyledComponent = styled(Component);

  render(<StyledComponent className="text-black" />);

  createElement(StyledComponent);

  expect(Component).toHaveBeenCalledWith(
    {
      style: {
        $$css: true,
        "text-black": "text-black",
      },
    },
    {}
  );
});

test("default styles", () => {
  const StyledComponent = styled(Component, "bg-white");

  render(<StyledComponent className="text-black" />);

  expect(Component).toHaveBeenCalledWith(
    {
      style: {
        $$css: true,
        "bg-white text-black": "bg-white text-black",
      },
    },
    {}
  );
});

test("variants", () => {
  const StyledComponent = styled(Component, "bg-white", {
    variants: {
      size: {
        large: "p-4",
      },
    },
  });

  render(<StyledComponent className="text-black" size="large" />);

  expect(Component).toHaveBeenCalledWith(
    {
      size: "large",
      style: {
        $$css: true,
        "bg-white p-4 text-black": "bg-white p-4 text-black",
      },
    },
    {}
  );
});
