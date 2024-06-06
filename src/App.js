import React, { useState, useEffect } from 'react';
import { Typography, TextField, Grid } from '@material-ui/core';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageDetails, setImageDetails] = useState({});
  const [isImageDetailsLoaded, setIsImageDetailsLoaded] = useState(false);
  
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-api-key': "a7d0a86f-60d2-4526-b1fb-976fe91a9e83"
    }
  };

  useEffect(() => {
    // Fetch all images if there is no search term
    const url = searchTerm
      ? `https://api.thecatapi.com/v1/images/search?limit=12&breed_ids=${searchTerm}&api_key=live_NjuCmIw9bzjBXBq4X9mYLJP58Uu3zuLqOgEjJPL1H3kp5fRFtFgwTDtBhzNeanF5`
      : `https://api.thecatapi.com/v1/images/search?limit=12&api_key=live_NjuCmIw9bzjBXBq4X9mYLJP58Uu3zuLqOgEjJPL1H3kp5fRFtFgwTDtBhzNeanF5`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [searchTerm]); // Fetch images whenever the searchTerm changes

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchImageDetails = async (id) => {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/${id}`);
        const data = await response.json();
        setImageDetails(data);
        setIsImageDetailsLoaded(true);
        console.log(imageDetails);
      } catch (error) {
        console.error('Error fetching image details:', error);
      }
    };

    if (searchTerm && posts.length > 0) {
      fetchImageDetails(posts[0].id);
    }
  }, [searchTerm, posts]);

  return (
    <div className="p-5 m-5">
      <Typography variant="h4" gutterBottom>
        Photos & GIFs from the API
      </Typography>
      <TextField
        label="Search by Breed Name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-5 rounded-2xl"
      />
      {/* {searchTerm && posts.length > 0 && isImageDetailsLoaded && (
        <Typography variant="caption" >
          {imageDetails.breeds[0].length>0 && (
            <div>
              <h1 className='font-bold text-[30px] mt-2  no-underline'>NAME: <span className='text-gray-700 text-[30px] mt-2 underline'>{imageDetails.breeds[0].name}</span> </h1> 

              <h1 className='font-bold text-[20px] mt-[3px]'>DESCRIPTION :  <span className='text-gray-700 text-[20px] mt-[1px]' >{imageDetails.breeds[0].description}</span></h1> 
            </div>
          )}
        </Typography>
      )} */}
      <Typography
        variant="h6"
        style={{ color: 'gray', fontStyle: 'oblique', marginTop: '10px', cursor: 'pointer' }}
        gutterBottom
        onClick={handleReload}
      >
        Click{' '}
        <span style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>here</span> for random
        images
      </Typography>
      <Grid container spacing={3} className="mt-5">
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4} lg={3}>
            <img
              src={post.url}
              alt={post.id}
              loading="lazy"
              className="w-full h-full border p-2 shadow-xl object-cover rounded-lg"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
