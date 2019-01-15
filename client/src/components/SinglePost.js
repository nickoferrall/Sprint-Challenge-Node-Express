import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const SinglePostContainerDiv = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const SinglePostWrapperDiv = styled(Link)`
  align-content: center;
  margin-top: 30%;
  padding: 5%;
  background-color: #f2f2f2;
  border-radius: 2.5%;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const SinglePostTitle = styled.div`
  font-weight: 600;
  padding: 5%;
`;

const DescriptionDiv = styled.div`
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 100;
  text-decoration: none;
  margin-bottom: 5%;
`;

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: props.posts,
      id: props.match.params.id,
      actions: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/api/projects/getactions/${this.state.id}`)
      .then(response => {
        console.log('cdm response', response);
        this.setState({
          actions: response.data
        });
      });
  }

  render() {
    return (
      <SinglePostContainerDiv>
        <SinglePostWrapperDiv to={'/'}>
          {this.state.posts.data.map((post, index) => {
            return post.id === parseInt(this.state.id) ? (
              <div key={index}>
                <SinglePostTitle>{post.name}</SinglePostTitle>
                <DescriptionDiv>{post.description}</DescriptionDiv>
              </div>
            ) : null;
          })}
          <DescriptionDiv>
            {this.state.actions.map((action, index) => {
              return (
                <div key={index}>
                  <DescriptionDiv>
                    Action Description: {action.description}
                  </DescriptionDiv>
                  <DescriptionDiv>Action Notes: {action.notes}</DescriptionDiv>
                </div>
              );
            })}
          </DescriptionDiv>
        </SinglePostWrapperDiv>
      </SinglePostContainerDiv>
    );
  }
}

export default SinglePost;
