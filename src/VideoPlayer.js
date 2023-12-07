import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VmPlayer } from '@vime/core';
import '@vime/core/themes/default.css'; // Assicurati di importare il foglio di stile di default di vime

import './VideoPlayer.css';

const VideoPlayer = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const streamURL = searchParams.get('streamURL');

  // Utilizza useImperativeHandle per esporre la funzione load
  useImperativeHandle(ref, () => ({
    load: (newStreamURL) => {
      setLoading(true);
      setSearchParams({ streamURL: encodeURIComponent(newStreamURL) });
    },
  }), [setSearchParams]);

  useEffect(() => {
    setLoading(false);
  }, [streamURL]);

  return (
    <div className='channelStreamingWrapper'>
      <VmPlayer
        className='player-wrapper'
        controls // Mostra i controlli del player
        autoPlay
        src={window.decodeURIComponent(streamURL) || 'http://iptv.bestitalian.org/get.php?username=aQeP5buBtE&password=Mq9Ga3BWpM&type=m3u_plus&output=mpegts'}
        onBuffer={() => setLoading(true)}
        onBufferEnd={() => setLoading(false)}
        onPlay={() => setLoading(false)}
      />
      {loading && (
        <div className='loaderContainer'>
          <div className='fa-3x'>
            <i className='fas fa-spinner fa-pulse'></i>
          </div>
        </div>
      )}
    </div>
  );
});

export default VideoPlayer;
