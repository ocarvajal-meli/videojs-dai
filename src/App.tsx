import React from 'react';
import VideoPlayer from './VideoPlayer';
import './App.css';

function App() {

  const options = {
    player: {
      controls: true,
      width: 640,
      sources: [{
        src: 'https://mdstrm.com/video/60b14c76b27ac10822c4fa5f.m3u8',
        type: 'application/x-mpegURL'
      }]
    },
    ima: {
      adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpremidpostoptimizedpod&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&cmsid=496&vid=short_onecue&correlator='
    }
  }

  return (
    <>
      <h1>VideoJS with DAI (Client Side)</h1>
      <VideoPlayer {...options} />
    </>
  )
}

export default App;
