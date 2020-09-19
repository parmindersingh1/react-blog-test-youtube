import { ListItem, List, ListIcon } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

import { Get } from "../Utils/JSONUtil";

const PostList = () => {
  const { isLoading, error, data } = useQuery("postlist", () => {
    return Get("http://localhost:3002/posts");
  });

  return (
    <div>
      {isLoading ? (
        "Loading.."
      ) : (
        <List>
          {data.data.map((listItem) => {
            return (
              <ListItem key={listItem.id}>
                <Link to={`/posts/${listItem.id}`}>{listItem.title}</Link>
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default PostList;
