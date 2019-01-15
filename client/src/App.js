import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import PostContainer from './components/PostContainer';
import LoadingSpinner from './components/LoadingSpinner';
import { Route } from 'react-router-dom';
import SinglePost from './components/SinglePost';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    axios.get('http://localhost:9000/api/projects').then(response => {
      console.log('Component did mount...', response);
      this.setState({
        posts: response,
        isLoaded: true
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props =>
            this.state.isLoaded === true ? (
              <PostContainer {...props} posts={this.state.posts} />
            ) : (
              <LoadingSpinner />
            )
          }
        />
        <div>
          <Route
            path="/post/:id"
            render={props => (
              <SinglePost
                {...props}
                posts={this.state.posts}
                tags={this.state.tags}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
