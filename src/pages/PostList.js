import { ListItem, List, Box, Link } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

import { Get } from "../Utils/JSONUtil";

const PostList = () => {
  const { isLoading, error, data } = useQuery("postlist", () => {
    return Get("http://localhost:3002/posts");
  });

  return (
    <Box w="20%">
      {isLoading ? (
        "Loading.."
      ) : (
        <List>
          {data.data.map((listItem) => {
            return (
              <ListItem border="1px solid #ccc" key={listItem.id}>
                <Link
                  padding=".8rem"
                  display="flex"
                  as={RouterLink}
                  to={`/posts/${listItem.id}`}
                >
                  {listItem.title}
                </Link>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default PostList;
