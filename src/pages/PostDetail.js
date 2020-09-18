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

import PostManage from "../components/PostManage";

const PostDetail = () => {
  const { postId } = useParams();
  const [postDetail, setPostDetail] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    Get(`http://localhost:3002/posts/${postId}`).then((response) => {
      setPostDetail(response.data);
    });
  }, [postId]);

  const onSubmitHandler = (values) => {
    console.log(values);
    // Put Request
    Put(`http://localhost:3002/posts/${postId}`, values)
      .then(() => {
        onClose();
        getPostDetail();
      })
      .catch((err) => {
        console.log(err);
      });
    // Modal Close
  };

  return (
    <div>
      {postDetail === null ? (
        <div>Loading</div>
      ) : (
        <div>
          <Button onClick={onOpen}>Edit</Button>
          <div>{postDetail.description}</div>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalHeader>Post Manage</ModalHeader>
              <ModalBody>
                <PostManage
                  onSubmit={onSubmitHandler}
                  defaultTitle={postDetail.title}
                  defaultDescription={postDetail.description}
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
