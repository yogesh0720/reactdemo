import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const baseURL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/post`
  : "http://localhost/post";

const EditPost = () => {
  const { id } = useParams();

  const [editPost, setEditPost] = useState({
    title: "",
    body: "",
    author: "",
  });

  const getSingleData = async () => {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      setEditPost(response.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSingleData();
  }, []);

  const navigate = useNavigate();

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const editPostJSON = JSON.stringify(editPost);
    try {
      const response = await axios.put(`${baseURL}/${id}`, editPostJSON);
      setEditPost(response.data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <Container>
      <h1>Edit Post</h1>
      <hr />
      <Form onSubmit={handleEditSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Edit Post Title</Form.Label>
          <Form.Control
            type="text"
            value={editPost?.title || ""}
            onChange={(e) =>
              setEditPost({ ...editPost, title: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Edit Body</Form.Label>
          <Form.Control
            type="text"
            value={editPost?.body || ""}
            onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Edit Author</Form.Label>
          <Form.Control
            type="text"
            value={editPost?.author || ""}
            onChange={(e) =>
              setEditPost({ ...editPost, author: e.target.value })
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

export default EditPost;
