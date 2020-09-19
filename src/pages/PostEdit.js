import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Textarea,
} from "@chakra-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";

import { Post } from "../Utils/JSONUtil";

const createPost = ({ title, description }) => {
  return Post("http://localhost:3002/posts", {
    title,
    description,
  });
};

const PostEdit = () => {
  const { push } = useHistory();

  const [mutate] = useMutation(createPost);

  const { control, handleSubmit, errors } = useForm();

  const onSubmitHandler = (value) => {
    const { title, description } = value;

    mutate({ title, description })
      .then(() => {
        push("/posts");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(errors);

  return (
    <Box maxW="40%" marginX="auto">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormControl isInvalid={errors.title}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Controller
            defaultValue=""
            control={control}
            name="title"
            as={Input}
            rules={{
              required: {
                value: true,
                message: "It is required",
              },
              minLength: {
                value: 3,
                message: "minimum length is 3",
              },
              maxLength: {
                value: 20,
                message: "maximum length is 10",
              },
            }}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.description}>
          <FormLabel htmlFor="Description">Description</FormLabel>
          <Controller
            defaultValue=""
            control={control}
            name="description"
            as={Textarea}
            rules={{
              required: {
                value: true,
                message: "It is required",
              },
              minLength: {
                value: 3,
                message: "minimum length is 3",
              },
              maxLength: {
                value: 100,
                message: "maximum length is 100",
              },
            }}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>

        <div>
          <Button marginTop="2rem" variantColor="green" type="submit">
            Add Blog
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default PostEdit;
