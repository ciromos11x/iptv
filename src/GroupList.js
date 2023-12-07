import React, { useState } from 'react';
import ChannelLink from './ChannelLink';

const GroupList = ({ groupTitle, channels, onChannelClick }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div>
      <h3 onClick={handleToggle}>{groupTitle}</h3>
      {isExpanded && (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {channels.map((channel) => (
            <ChannelLink key={channel.logo}
             channel={channel} 
             onChannelClick={onChannelClick}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupList;
