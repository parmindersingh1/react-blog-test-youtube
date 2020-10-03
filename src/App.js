import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Box, IconButton, useDisclosure } from "@chakra-ui/core";
import { MdDehaze } from "react-icons/md";

import PostList from "./pages/PostList";
import PostEdit from "./pages/PostEdit";
import PostDetail from "./pages/PostDetail";

function App() {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  return (
    <Box h="100%">
      <Switch>
        <Route exact path="/">
          <Redirect to="/posts" />
        </Route>
        <Route path="/posts/new">
          <PostEdit />
        </Route>

        <Box h="100%">
          <Box padding=".4rem" minHeight="40px" borderBottom="1px solid #ccc">
            <IconButton
              display={{
                sm: "block",
                md: "none",
              }}
              onClick={onToggle}
              icon={MdDehaze}
            />
          </Box>
          <Box
            maxW={{
              sm: "100%",
              md: "80%",
              lg: "60%",
            }}
            padding={{
              sm: "2rem",
              md: "0",
            }}
            h="100%"
            marginX="auto"
            display="flex"
          >
            <Route path="/posts">
              <PostList isDrawerOpen={isOpen} closeDrawer={onClose} />
            </Route>
            <Route path="/posts/:postId">
              <PostDetail />
            </Route>
          </Box>
        </Box>
      </Switch>
    </Box>
  );
}

export default App;
