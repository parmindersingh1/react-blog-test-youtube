import { renderHook, act } from "@testing-library/react-hooks";
import React from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";

import useFetch from "./useFetch";

const TODOURL = "https://jsonplaceholder.typicode.com/todos/";
const POSTURL = "https://jsonplaceholder.typicode.com/posts/";

const server = setupServer(
  rest.get(TODOURL, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          completed: false,
          id: 1,
          title: "delectus aut autem",
          userId: 1,
        },
        {
          completed: false,
          id: 2,
          title: "dummy title  aut autem",
          userId: 2,
        },
      ])
    );
  }),
  rest.get(POSTURL, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          body: `est rerum tempore vitae
        sequi sint nihil reprehenderit dolor beatae ea dolores neque
        fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
        qui aperiam non debitis possimus qui neque nisi nulla`,
          id: 2,
          title: "qui est esse",
          userId: 1,
        },
      ])
    );
  })
);
describe("useFetch", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
  it("should be able to make API call of given Endpoint", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch({
        URL: TODOURL,
      })
    );

    await waitForNextUpdate();
    expect(result.current.data).toMatchInlineSnapshot(`
      Array [
        Object {
          "completed": false,
          "id": 1,
          "title": "delectus aut autem",
          "userId": 1,
        },
        Object {
          "completed": false,
          "id": 2,
          "title": "dummy title  aut autem",
          "userId": 2,
        },
      ]
    `);
  });
  it("When URL is changed make API call to changed endpoint", async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ URL }) =>
        useFetch({
          URL,
        }),
      {
        initialProps: {
          URL: TODOURL,
        },
      }
    );

    await waitForNextUpdate();

    rerender({
      URL: POSTURL,
    });

    await waitForNextUpdate();

    expect(result.current.data).toMatchInlineSnapshot(`
      Array [
        Object {
          "body": "est rerum tempore vitae
              sequi sint nihil reprehenderit dolor beatae ea dolores neque
              fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
              qui aperiam non debitis possimus qui neque nisi nulla",
          "id": 2,
          "title": "qui est esse",
          "userId": 1,
        },
      ]
    `);
  });
  // it("", () => {})
});
