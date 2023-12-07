import React, { useRef } from 'react';
import ReactPlayer from 'react-player';

const ChannelLink = ({ channel, onChannelClick }) => {
  const handleLinkClick = async () => {
    onChannelClick(channel);
  };

  return (
    <button onClick={handleLinkClick} style={{ cursor: 'pointer' }}>
      <img src={channel.logo} alt={channel.name} />
      <p>{channel.name}</p>
    </button>
  );
};


export default ChannelLink;
