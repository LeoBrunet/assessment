import React from 'react';

export default function Post({ posts, allPosts, onLoadMore, loadMore }) {

  // create button if there is other posts to load
  let loadMoreButton;
  if (loadMore) {
    loadMoreButton = <button className="loadMore" onClick={onLoadMore}> Show more</button>;
  } else {
    loadMoreButton = <></>;
  }

  // create postsToShow with allPosts if the list with filtered post is empty
  let postsToShow;
  if (posts.length > 0) {
    postsToShow = posts;
  } else {
    postsToShow = allPosts;
    loadMoreButton = <button className="loadMore" onClick={onLoadMore}> Show more</button>;
  }

  return (
    <div>
      <div>
        {postsToShow.map(post => (
          <div className="box" key={post.id}>
            <h2 className="title">{post.title}</h2>
            <div className="author">
              <img className="avatar" src={post.author.avatar} alt={post.author.name + 'avatar.'} />
              <p className="avatar-name"> {post.author.name} • {new Date(post.publishDate).toLocaleDateString('en-US')} </p>
            </div>
            <p> {post.summary} </p>
          </div>
        ))}
      </div>
      {loadMoreButton}
    </div>
  );
}

