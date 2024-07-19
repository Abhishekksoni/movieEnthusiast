import React from 'react';
import { Box, Typography, Container, Avatar, Grid, Paper, Divider, TextField, Button } from '@mui/material';
import abhishekPhoto from './MePhoto.jpg'; // Replace with your photo path
import { NavLink } from 'react-router-dom';
import NavbarHome from './navbar-home';

const About = () => {
  return (
    <Box sx={{ position: 'relative', margin: 0, padding: 0, background: 'black' }}>
      <NavbarHome />
      <Container maxWidth="lg" sx={{ pt: 10, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, background: '#333', color: 'white' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Avatar
                alt="Abhishek Soni"
                src={abhishekPhoto}
                sx={{ width: 150, height: 150, margin: '0 auto' }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h4" gutterBottom>
                About Movie Enthusiast
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to Movie Enthusiast! My name is Abhishek Soni, and I'm the founder of this platform. With a deep passion for cinema, I created Movie Enthusiast to be more than just a website—it's a community for fellow movie lovers.
              </Typography>
              <Typography variant="body1" paragraph>
                Our mission is to provide movie lovers with a comprehensive and engaging experience, including detailed movie information, reviews, recommendations, personalized favorite lists, and the latest in cinematic news.
              </Typography>
              <Typography variant="body1" paragraph>
                Join us as we explore the magical world of cinema, one film at a time. Thank you for being a part of our journey.
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'white' }} />
          <Typography variant="h4" gutterBottom>
            Why Movie Enthusiast?
          </Typography>
          <Typography variant="body1" paragraph>
            At Movie Enthusiast, we believe that movies are more than just entertainment; they are a form of art that has the power to inspire, educate, and connect people from all walks of life. Whether you are a casual viewer or a die-hard cinephile, you'll find something here to fuel your passion for movies.
          </Typography>
          <Typography variant="body1" paragraph>
            We provide a platform where users can:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Discover new and popular movies.</Typography>
            </li>
            <li>
              <Typography variant="body1">Read detailed reviews and ratings.</Typography>
            </li>
            <li>
              <Typography variant="body1">Create and manage personalized favorite lists.</Typography>
            </li>
            <li>
              <Typography variant="body1">Stay updated with the latest cinematic news.</Typography>
            </li>
          </ul>
          <Divider sx={{ my: 4, borderColor: 'white' }} />
          <Typography variant="h4" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to create a vibrant and engaging community for movie enthusiasts. We aim to offer valuable insights, foster discussions, and celebrate the world of cinema. We are dedicated to continuously improving our platform to meet the needs and preferences of our users.
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for joining us on this journey. Together, let's celebrate the magic of movies!
          </Typography>
          <Divider sx={{ my: 4, borderColor: 'white' }} />
          <Typography variant="h4" gutterBottom>
            Why Subscribe?
          </Typography>
          <Typography variant="body1" paragraph>
            Movie Enthusiast is a newsletter where we dive into the fascinating world of movies, exploring genres, directors, behind-the-scenes stories, and much more. Whether you're a movie buff or just looking for your next watch, our newsletter aims to inform and entertain.
          </Typography>
          <Box component="form" sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Type your email..."
              fullWidth
              InputProps={{
                sx: {
                  background: '#444',
                  color: 'white'
                }
              }}
            />
            <Button variant="contained" color="primary">
              Subscribe
            </Button>
          </Box>
          <Divider sx={{ my: 4, borderColor: 'white' }} />
          <Typography variant="h4" gutterBottom>
            Stay up-to-date
          </Typography>
          <Typography variant="body1" paragraph>
            You won’t have to worry about missing anything. Every new edition of the newsletter goes directly to your inbox. Just make sure to subscribe!
          </Typography>
          <Divider sx={{ my: 4, borderColor: 'white' }} />
          <Typography variant="h4" gutterBottom>
            Join the crew
          </Typography>
          <Typography variant="body1" paragraph>
            If you have anything that you would like to share on Movie Enthusiast, shoot us an email at contact@movieenthusiast.com. Whether it's a review, an interesting movie fact, or a guest article, we are always looking for contributions from fellow movie lovers.
          </Typography>
          <Divider sx={{ my: 4, borderColor: 'white' }} />
          <Typography variant="h4" gutterBottom>
            People
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Avatar
                alt="Abhishek Soni"
                src={abhishekPhoto}
                sx={{ width: 100, height: 100, margin: '0 auto' }}
              />
              <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                Abhishek Soni
              </Typography>
              <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
                @abhisheksoni
              </Typography>
              <Typography variant="body2" paragraph>
                Passionate about movies, technology, and storytelling. I believe that cinema is a powerful medium that can inspire and connect people from all walks of life. Let's explore the world of movies together!
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'white' }} />
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            We love hearing from our users! If you have any questions, feedback, or suggestions, please don't hesitate to get in touch with us.
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> contact@movieenthusiast.com
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
