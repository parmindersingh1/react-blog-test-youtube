import axios from "axios";

export const Post = (url, requestContent) => {
  return axios.post(url, requestContent);
};

export const Get = (url) => {
  return axios.get(url);
};
