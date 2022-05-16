import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "./../Utils/testUtil";
import { Switch, Route } from "react-router-dom";
import UserEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import PostEdit from "./PostEdit";

const server = setupServer(
  rest.post("http://localhost:3002/posts", (req, res, ctx) => {
    return res(ctx.json({ message: "Post Created" }));
  })
);

describe("PostEdit", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
  it("should create post when valid title and description is given", async () => {
    const history = createMemoryHistory(["/", "/posts"]);
    // history.push("/posts")
    const { debug } = render(
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={PostEdit} />
          <Route path="/posts" render={() => <div>post created</div>} />
        </Switch>
      </Router>
    );

    const title = screen.getByLabelText(/title/i);
    const desc = screen.getByLabelText(/description/i);

    UserEvent.type(title, "Dummy Title");
    UserEvent.type(desc, "Dummy Desc");

    debug();

    const button = screen.getByText(/Add Blog/i);

    UserEvent.click(button);

    const divEl = await screen.findByText(/post created/i);
       
    expect(divEl).toBeInTheDocument();
  });
});
