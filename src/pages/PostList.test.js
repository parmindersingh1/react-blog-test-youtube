// import * as redux from 'react-redux'

// const spy = jest.spyOn(redux, 'useSelector')
// spy.mockReturnValue({ username:'test' })

import { render, screen } from "@testing-library/react";
import React from "react";
import { useQuery } from "react-query";
import { useColorMode, useTheme } from "@chakra-ui/core";

import PostList from "./PostList";

jest.mock("react-query");

// AAA - Arrange Act Assertion

describe("PostList", () => {
  // Arrange
  it.only("When isLoading is true then loading text should be displayed", () => {
    useQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    useColorMode.mockReturnValue({ colorMode: "dark-mode" });
    useTheme.mockReturnValue({});

    // Act
    const { debug } = render(
      <PostList isDrawerOpen={false} closeDrawer={jest.fn()} />
    );
    debug();

    // Assertion
    // const text = screen.queryByText('Loading..').innerHTML;
    // const text = screen.queryByTestId("loading-text").textContent;

    // expect(text).toBe("Loading..")

    const text = screen.queryByTestId("loading-text");

    expect(text).toHaveTextContent("Loading..");
  });
  it("When isLoading is false and data exist then render list of data");
});
