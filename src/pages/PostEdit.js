import React, { useState } from "react";

const PostEdit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(title, description);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>

        <div>
          <button type="submit">Add Blog</button>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
