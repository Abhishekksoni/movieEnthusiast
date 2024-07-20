import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';
import ScrollMagic from 'scrollmagic';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import bombVideo from "../assets/video/bomb.mp4"
import { Link } from 'react-router-dom';
import NavbarHome from './navbar-home';

// Register the ScrollMagic GSAP plugin
ScrollMagicPluginGsap(ScrollMagic, gsap);

const VideoAnimation = () => {
  const videoRef = useRef(null);
  const effectRef = useRef(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    // Initialize ScrollMagic controller
    controllerRef.current = new ScrollMagic.Controller();

    // Create a ScrollMagic scene for pinning the effect
    const pinScene = new ScrollMagic.Scene({
      duration: 2000,
      triggerElement: effectRef.current,
      triggerHook: 0,
    })
      .setPin(effectRef.current)
      .addTo(controllerRef.current);

    // Update header background color based on scroll position

    // Video animation
    let accelamount = 0.05;
    let scrollpos = 0;
    let delay = 0;

    pinScene.on('update', (e) => {
      scrollpos += (e.scrollPos - scrollpos) * 0.1;
      scrollpos = e.scrollPos / 1000;
    });

    setInterval(() => {
      delay += (scrollpos - delay) * accelamount;
      if (videoRef.current) {
        videoRef.current.currentTime = delay;
      }
    }, 33.3);

    pinScene.on('end', () => {
      // Pause the video at the end of the scroll
      if (videoRef.current) {
        videoRef.current.pause();
      }
    });

    // Text animation using GSAP
    const textScene = new ScrollMagic.Scene({
      duration: 3000, // Adjust duration as needed
      triggerElement: effectRef.current,
      triggerHook: 0,
    })
      .addTo(controllerRef.current)
      .on('progress', (e) => {
        gsap.fromTo('.effh', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });
      });

    // Cleanup when the component is unmounted
    return () => {
      pinScene.destroy(true);
      textScene.destroy(true);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1,position:'relative',margin:0,padding:0 }}>
      <NavbarHome /> {/* Include the NavbarHome component */}
      <Box className="main" ref={effectRef} sx={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background:'black' }}>
        {/* Video and Text */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h1" className="effh" sx={{ zIndex: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize:'25px'}}>
            Lights, Camera, Action! Your Ultimate Movie Destination.
          </Typography>
          <video ref={videoRef} src={bombVideo} autoPlay muted style={{ width: '100%', height: '100%' }}></video>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoAnimation;
