import { ListItem, List, ListIcon } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Get } from "../Utils/JSONUtil";

const PostList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // API Call
    Get("http://localhost:3002/posts")
      .then((response) => {
        setList(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    // Set Response to state
  }, []);

  return (
    <div>
      {loading ? (
        "Loading.."
      ) : (
        <List>
          {list.map((listItem) => {
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
