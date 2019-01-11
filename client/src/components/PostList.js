import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostContainerDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 33%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 3%;
  margin: 3%;
  width: 100%;
  background-color: white;
  border-radius: 2%;
  text-align: center;
  cursor: pointer;
  }
`;

const TitleDiv = styled.div`
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 5%;
`;

const DescriptionDiv = styled.div`
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 100;
  text-decoration: none;
  margin-bottom: 5%;
`;

const PostList = props => {
  console.log('post list props', props);
  return (
    <PostContainerDiv>
      <StyledLink to={`/post/${props.post.id}`}>
        <TitleDiv>
          {props.post.name.length < 10
            ? props.post.name
            : props.post.name.substring(0, 10)}
        </TitleDiv>
        <DescriptionDiv>{props.post.description}</DescriptionDiv>
      </StyledLink>
    </PostContainerDiv>
  );
};

export default PostList;
