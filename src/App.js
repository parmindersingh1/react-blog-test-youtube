import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Box } from "@chakra-ui/core";

import PostList from "./pages/PostList";
import PostEdit from "./pages/PostEdit";
import PostDetail from "./pages/PostDetail";

// state
// addInc
// decInc
const useCounter = () => {
  const [count, setCount] = useState(0);
  return {
    count,
    addInc: () => {
      setCount(count + 1);
    },
    decInc: () => {
      setCount(count - 1);
    },
  };
};

const useList = () => {
  const [value, setValue] = useState([]);
  return {
    list: value,
    push: (newList) => {
      setValue([...value, newList]);
    },
    pull: (index) => {
      const newList = value.filter((v, newIndex) => {
        return index !== newIndex;
      });

      setValue(newList);
    },
  };
};

function App() {
  const { count, addInc, decInc } = useCounter();
  const { list, push, pull } = useList();

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          Post List 0
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
