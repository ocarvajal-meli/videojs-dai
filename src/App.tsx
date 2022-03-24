import React from 'react';
import './App.css';
import VideoPlayer from './VideoPlayer';

function App() {
  const playerRef = React.useRef(null);

  const videoJsOptions = { // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://mdstrm.com/video/60b14c76b27ac10822c4fa5f.m3u8', // video server by our Media Stream account
      type: 'application/x-mpegURL'
    }]
  }

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  return (
    <>
      <h1>VideoJS with DAI (Client Side)</h1>
      <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  )
}

export default App;
