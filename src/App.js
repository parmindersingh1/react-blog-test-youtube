import React from "react";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          Post List 0
        </Route>
        <Route exact path="/posts">
          Post List 1
        </Route>
        <Route path="/posts/new">Create new Posts</Route>
        <Route path="/posts/:postId">Post Detail</Route>
      </Switch>
    </div>
  );
}

export default App;
