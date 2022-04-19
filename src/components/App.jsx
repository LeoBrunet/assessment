import React from 'react';
import Post from './Post';
import Category from './Category';

const postsPerPage = 5;

function App() {
  const [posts, setPosts] = React.useState([]);
  const [selectedPosts, setSelectedPosts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [visible, setVisible] = React.useState(postsPerPage)

  /**
   * Handle method when click on "Show more"
   */
  const onLoadMore = () => {
    if (selectedPosts.length > visible + postsPerPage) {
      setVisible(visible + postsPerPage)
    // case posts without filter
    } else if (selectedPosts.length === 0) {
      if (posts.length > visible + postsPerPage) {
        setVisible(visible + postsPerPage)
      // case with less than "postsPerPage" to show
      } else {
        setVisible(selectedPosts.length - 1)
      }
    }
    // case with less than "postsPerPage" to show
    else {
      setVisible(selectedPosts.length - 1)
    }
  }

  /**
   * Handle method when click on one category
   */
  const onFilter = (cat) => {
    let newPosts = []

    posts.forEach(post => {
      if (post.categories.some(r => cat === r.name) || cat === "All"){
        newPosts.push(post)
      }
    })
    setVisible(postsPerPage)
    setSelectedPosts(newPosts)
    setSelectedCategory(cat)
  }

  React.useEffect(() => {

    /**
     * Retrieve data
     */
    // declare the data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await fetch('/api/posts');
      // convert the data to json
      const json = await data.json();

      // get list of categories from all posts
      let categories: Array<String> = ['All'];
      json.posts.forEach(post => {
        post.categories.forEach(category => {
          // check if category is not already include in categories list
          if (!categories.includes(category.name)) {
            categories.push(category.name);
          }
        });
      });

      // set state with the result
      setPosts(json.posts);
      setCategories(categories);
    }

    // call the function
    fetchData()
      .catch(console.error);
  }, []);

  return (
    <>
      <h1> Posts </h1>
      <h2> Categories : {selectedCategory} </h2>
      {<Category categories={categories} onFilter={onFilter}/>}
      {<Post loadMore={visible < selectedPosts.length - 1} posts={selectedPosts.slice(0, visible)} allPosts={posts.slice(0, visible)} onLoadMore={onLoadMore}/>}
    </>
  );

}

export default App;
