import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { List } from "react-virtualized";

const baseURL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/post`
  : "http://localhost/post";

const PostListing = () => {
  const [postData, setPostData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const getAllData = async () => {
    try {
      const response = await axios.get(baseURL);
      setPostData(response.data);
      setFilteredList(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const deletePostData = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      console.log(response.data);
      getAllData();
    } catch (e) {
      console.log(e);
    }
  };

  const filterBySearch = (event) => {
    const query = event.target.value;
    var updatedList = [...postData];
    updatedList = updatedList.filter((item) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(updatedList);
  };

  const renderRow = ({ index, key, style }) => (
    <div>
      <div key={key} style={style} className="post">
        <h4>
          {`${filteredList[index].title}-${filteredList[index].id}`}&nbsp;
          <Link to={`/edit-post/${filteredList[index].id}`}>
            <Button>Edit</Button>
          </Link>{" "}
          &nbsp;
          <Button
            onClick={() => deletePostData(filteredList[index].id)}
            variant="danger"
          >
            {" "}
            Delete
          </Button>
        </h4>
        <p>{filteredList[index].body}</p>
      </div>
    </div>
  );

  return (
    <Container>
      <div>
        <h1 style={{ display: "inline-block" }}>Manage post</h1>
        <Link to="/add-post">
          <Button className="btn btn-primary">Add New Post</Button>
        </Link>
      </div>
      <hr />
      <div className="search-header">
        <div className="search-text">Search:</div>
        <input id="search-box" onChange={filterBySearch} />
      </div>
      <List
        width={1200}
        height={700}
        rowRenderer={renderRow}
        rowCount={filteredList.length}
        rowHeight={80}
      />
    </Container>
  );
};

export default PostListing;
