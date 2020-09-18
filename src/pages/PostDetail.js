import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Get, Put } from "../Utils/JSONUtil";
import { useQuery } from "react-query";

import PostManage from "../components/PostManage";

const PostDetail = () => {
  const { postId } = useParams();

  const { isLoading, error, data, refetch } = useQuery("postdetail", () => {
    return Get(`http://localhost:3002/posts/${postId}`);
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmitHandler = (values) => {
    console.log(values);
    // Put Request
    Put(`http://localhost:3002/posts/${postId}`, values)
      .then(() => {
        onClose();
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
    // Modal Close
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <Button onClick={onOpen}>Edit</Button>
          <div>{data.data.description}</div>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalHeader>Post Manage</ModalHeader>
              <ModalBody>
                <PostManage
                  onSubmit={onSubmitHandler}
                  defaultTitle={data.data.title}
                  defaultDescription={data.data.description}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
