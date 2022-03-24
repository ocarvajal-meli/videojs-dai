import React, {useEffect, useRef} from 'react';
import videojs from 'video.js';
import 'videojs-contrib-ads';
import 'videojs-ima';
import 'video.js/dist/video-js.css';
import 'videojs-ima/src/css/videojs.ima.css';

const VideoPlayer = (props: any) => {

  const videoElement: any = useRef();

  useEffect(() => {
    const player: any = videojs(videoElement.current, props.player);

    // add ima options for ima plugin
    player.ima(props.ima);

  }, [props]);

    return <video ref={videoElement} className="video-js" />

}

export default VideoPlayer;