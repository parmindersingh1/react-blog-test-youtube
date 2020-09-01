import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Get } from "../Utils/JSONUtil";
const PostDetail = () => {
  const { postId } = useParams();
  const [postDetail, setPostDetail] = useState(null);

  useEffect(() => {
    Get(`http://localhost:3002/posts/${postId}`).then((response) => {
      setPostDetail(response.data);
    });
  }, [postId]);

  return (
    <div>
      {postDetail === null ? <div>Loading</div> : postDetail.description}
    </div>
  );
};

export default PostDetail;
