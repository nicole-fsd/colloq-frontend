import React from "react";
import Hero from './landing/Hero';
import Gallery from './landing/Gallery';
import Steps from './landing/Steps';
import Profiles from './landing/Profiles';
import Footer from './landing/Footer';

export default function Landing() {

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
