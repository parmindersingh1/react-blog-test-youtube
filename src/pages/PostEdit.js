import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@chakra-ui/core";

import { Post } from "../Utils/JSONUtil";
import PostManage from "../components/PostManage";

const PostEdit = () => {
  const { push } = useHistory();

  const onSubmitHandler = (values) => {
    Post("http://localhost:3002/posts", values)
      .then(() => {
        push("/posts");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box maxW="40%" marginX="auto">
      <PostManage onSubmit={onSubmitHandler} />
    </Box>
  );
};

export default PostEdit;
