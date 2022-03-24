import React from 'react';
import VideoPlayer from './VideoPlayer';

function App() {

  const videoPlayerOptions = {
    width: 640,
    controls: true,
    autoPlay: true,
    vod: {
      contentSourceId: '2528370',
      videoId: 'tears-of-steel',
      backupStream: 'https://storage.googleapis.com/interactive-media-ads/media/bbb.m3u8'
    }
  };
  
  return (
    <>
      <h1>VideoJS with DAI (Server Side)</h1>
      <VideoPlayer {...videoPlayerOptions} />
    </>
  );
}

export default App;
