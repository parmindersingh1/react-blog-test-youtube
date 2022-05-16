// import * as redux from 'react-redux'

// const spy = jest.spyOn(redux, 'useSelector')
// spy.mockReturnValue({ username:'test' })

import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
// import { useQuery } from "react-query";
import * as reactQuery from "react-query";
import { useColorMode, useTheme } from "@chakra-ui/core";
import PostList from "./PostList";
import { renderWithRouter } from "./../Utils/testUtil";

import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
  rest.get("http://localhost:3002/posts", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          title: " API Dummy Title",
        },
        {
          id: 2,
          title: " API Another Dummy Title",
        },
        {
          id: 3,
          title: " API Test Another Dummy Title",
        },
        {
          id: 4,
          title: " API Test 2 Another Dummy Title",
        },
      ])
    );
  })
);

// jest.mock("react-query");

// AAA - Arrange Act Assertion

describe("PostList", () => {
  //  let log = null;
  let useQuery = null;
  beforeAll(() => {
    // log = jest.spyOn(console, 'log').mockImplementation(a => {
    //   console.error(a + " mocked")
    // })

    useQuery = jest.spyOn(reactQuery, "useQuery");
    // console.log(useQuery);

    server.listen();
  });
  beforeEach(() => {
    // clear (reset) mocked useQuery before each test
    useQuery.mockClear();

    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
  it("When isLoading is true then loading text should be displayed", () => {
    // Arrange
    useQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    useColorMode.mockReturnValue({ colorMode: "dark-mode" });
    useTheme.mockReturnValue({});

    // Act
    const { debug } = renderWithRouter(
      <PostList isDrawerOpen={false} closeDrawer={jest.fn()} />
    );
    // debug();

    // Assertion
    // const text = screen.queryByText('Loading..').innerHTML;
    // const text = screen.queryByTestId("loading-text").textContent;

    // expect(text).toBe("Loading..")

    const text = screen.queryByTestId("loading-text");

    expect(text).toHaveTextContent("Loading..");
  });
  it("When isLoading is false and data exist then render list of data", () => {
    useQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        data: [
          {
            id: 1,
            title: "Dummy Title",
          },
          {
            id: 2,
            title: "Another Dummy Title",
          },
          {
            id: 3,
            title: "Test Another Dummy Title",
          },
          {
            id: 4,
            title: "Test 2 Another Dummy Title",
          },
        ],
      },
    });

    useColorMode.mockReturnValue({ colorMode: "dark-mode" });
    useTheme.mockReturnValue({});

    renderWithRouter(<PostList isDrawerOpen={false} closeDrawer={jest.fn()} />);

    const data = screen.getAllByTestId("list-item").map((li) => li.textContent);

    // expect(data).toEqual([ 'Dummy Title', 'Another Dummy Title' ])
    expect(data).toMatchInlineSnapshot(`
      Array [
        "Dummy Title",
        "Another Dummy Title",
        "Test Another Dummy Title",
        "Test 2 Another Dummy Title",
      ]
    `);
  });

  it("When API calls made to POST endpoint", async () => {
    // as we don't want to  mock useQuery we will restore to original
    useQuery.mockRestore();

    useColorMode.mockReturnValue({ colorMode: "dark-mode" });
    useTheme.mockReturnValue({});

    renderWithRouter(<PostList isDrawerOpen={false} closeDrawer={jest.fn()} />);

    await waitForElementToBeRemoved(() => screen.getByTestId("loading-text"));

    const data = screen.getAllByTestId("list-item").map((li) => li.textContent);
    expect(data).toMatchInlineSnapshot(`
      Array [
        " API Dummy Title",
        " API Another Dummy Title",
        " API Test Another Dummy Title",
        " API Test 2 Another Dummy Title",
      ]
    `);
  });
});
