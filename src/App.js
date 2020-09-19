import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Box } from "@chakra-ui/core";

import PostList from "./pages/PostList";
import PostEdit from "./pages/PostEdit";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/posts" />
        </Route>
        <Route path="/posts/new">
          <PostEdit />
        </Route>

        <Box maxW="60%" marginX="auto" display="flex">
          <Route path="/posts">
            <PostList />
          </Route>
          <Route path="/posts/:postId">
            <PostDetail />
          </Route>
        </Box>
      </Switch>
    </div>
  );
}

export default App;
