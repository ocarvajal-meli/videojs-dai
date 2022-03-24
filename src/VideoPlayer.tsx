import React, { useEffect } from 'react';
import videojs from 'video.js';
import './VideoPlayer.css';
import 'video.js/src/css/vjs.scss';

declare global {
    interface Window {
        player: any;
        google: any;
    }
}

const VideoPlayer = (props: any) => {
    
    const BACKUP_STREAM = props.vod.backupStream;
    const CONTENT_SOURCE_ID = props.vod.contentSourceId;
    const VIDEO_ID = props.vod.videoId;

    let videoElement: any;
    let adUiElement: any;
    let streamManager: any;
    let vodDuration: any;
    let bookmarkTime: any;

    let mediaManifest: string;

    let isAdBreak: boolean;

    const initPlayer = () => {
        videoElement = document.getElementById('content');
        adUiElement = document.getElementById('ad-ui');

        videoElement.addEventListener('pause', onStreamPause);
        videoElement.addEventListener('play', onStreamPlay);

        streamManager = new window.google.ima.dai.api.StreamManager(videoElement, adUiElement);
        streamManager.addEventListener(
            [window.google.ima.dai.api.StreamEvent.Type.LOADED,
            window.google.ima.dai.api.StreamEvent.Type.ERROR,
            window.google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED,
            window.google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED,
            window.google.ima.dai.api.StreamEvent.Type.AD_PROGRESS],
            onStreamEvent,
            false);

        requestVODStream(CONTENT_SOURCE_ID, VIDEO_ID);
    }

    const requestVODStream = (cmsId: string, videoId: string) => {
        let streamRequest = new window.google.ima.dai.api.VODStreamRequest(); 
        streamRequest.contentSourceId = cmsId;
        streamRequest.videoId = videoId;
        streamManager.requestStream(streamRequest);
    }

    const loadUrl = (url: string) => {
        console.log(`Loading: ${url}`);
        
        const meliPlayer = videojs('content', {
            ...props,
            sources: [{
                src: url,
                type: 'application/x-mpegURL'
            }]
        });

        window.player = meliPlayer;
    }

    const onStreamEvent = (e: any) => {
        switch (e.type) {
            case window.google.ima.dai.api.StreamEvent.Type.LOADED:
                console.log('Stream loaded');
                loadUrl(e.getStreamData().url);
                break;
            case window.google.ima.dai.api.StreamEvent.Type.ERROR:
                console.log('Error loading stream, playing backup stream.' + e);
                loadUrl(BACKUP_STREAM);
                break;
            case window.google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED:
                console.log('Ad Break Started');
                isAdBreak = true;
                adUiElement.style.display = 'block';
                vodDuration = window.player.duration();
                window.player.controls(false);
                break;
            case window.google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED:
                console.log('Ad Break Ended');
                isAdBreak = false;
                adUiElement.style.display = 'none';
                window.player.controls(true);
                // window.player.duration(vodDuration);
                break;
            case window.google.ima.dai.api.StreamEvent.Type.AD_PROGRESS:
                window.player.controls(false);
                break;
            default:
                break;
        }
    }

    const onStreamPause = () => {
        console.log('paused');
        bookmarkTime = Math.floor(streamManager.contentTimeForStreamTime(videoElement.currentTime));
        if (isAdBreak) {
            window.player.controls(true);
            adUiElement.style.display = 'none';
        }
    }

    const onStreamPlay = () => {
        console.log('played');
        if (isAdBreak) {
            window.player.controls(true);
            window.player.disableProgress.disable();
            adUiElement.style.display = 'block';
        }
    }

    useEffect(() => {
        initPlayer();
    }, [props]);

    return (
        <>
            <div id='video-player' style={{ position: 'relative' }}>
                <video
                    id='content'
                    className='video-js'
                    {...props}
                />
                <div id="ad-ui"></div>
            </div>
            <div id="progress"></div>
        </>
    )
}

export default VideoPlayer;