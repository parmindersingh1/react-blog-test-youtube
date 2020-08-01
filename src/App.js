import React from "react";
import { Route, Switch } from "react-router-dom";

import PostList from "./pages/PostList";
import PostEdit from "./pages/PostEdit";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          Post List 0
        </Route>
        <Route exact path="/posts">
          <PostList />
        </Route>
        <Route path="/posts/new">
          <PostEdit />
        </Route>
        <Route path="/posts/:postId">Post Detail</Route>
      </Switch>
    </div>
  );
}

export default App;
