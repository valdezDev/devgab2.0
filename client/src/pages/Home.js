import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { user } = useContext(AuthContext);

  let posts = "";
  const { error, loading, data } = useQuery(FETCH_POSTS_QUERY);

  console.log(`Loading: ${loading}`);
  console.log(data);

  if (data) {
    posts = { data: data.getPosts };
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      {loading ? (
        <h1>Loading posts..</h1>
      ) : (
        posts.data &&
        posts.data.map(post => (
          <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
            <PostCard post={post} />
          </Grid.Column>
        ))
      )}
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
