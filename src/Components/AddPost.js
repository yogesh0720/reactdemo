import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/post`
  : "http://localhost/post";

const AddPost = () => {
  const [postData, setPostData] = useState({
    title: "",
    body: "",
    author: "",
  });

  useEffect(() => {});

  const navigate = useNavigate();

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postDataJSON = JSON.stringify(postData);
    try {
      const response = await axios.post(`${baseURL}`, postDataJSON);
      console.log(response.data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <h1>Add New Post</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Body</Form.Label>
          <Form.Control
            type="text"
            value={postData.body}
            onChange={(e) => setPostData({ ...postData, body: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={postData.author}
            onChange={(e) =>
              setPostData({ ...postData, author: e.target.value })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        &nbsp;
        <Button variant="secondary" type="Cancel" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default AddPost;
