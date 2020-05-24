import React from "react";
// import { makeStyles } from "@material-ui/core";
import Hero from './landing/Hero';
import Gallery from './landing/Gallery';
import Steps from './landing/Steps';
import Profiles from './landing/Profiles';
import Footer from './landing/Footer';

// const useStyles = makeStyles((theme) => ({
//   childrenContainer: {
//   },
// }));

export default function Landing() {
  // const classes = useStyles();

  return (
    <>
      <Hero />
      <Steps />
      <Gallery />
      <Profiles />
      <Footer /> 
      
    </>
  );
}
