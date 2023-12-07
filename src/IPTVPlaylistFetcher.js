import React, { useState, useRef } from 'react';
import axios from 'axios';
import GroupList from './GroupList';
import VideoPlayer from './VideoPlayer';
import IPTVLinkParser from './IPTVLinkParser';

const IPTVPlaylistFetcher = () => {
  const [m3uLink, setM3ULink] = useState('');
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const videoPlayerRef = useRef(null);

  const fetchChannels = async (m3uURL) => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get(m3uURL);
      const data = response.data;
      console.log(data);

      const parsedChannels = parseM3U(data);

      const channelsByGroup = parsedChannels.reduce((acc, channel) => {
        const { groupTitle } = channel;
        if (!acc[groupTitle]) {
          acc[groupTitle] = [];
        }
        acc[groupTitle].push(channel);
        return acc;
      }, {});

      const groupedChannels = Object.entries(channelsByGroup).map(([groupTitle, channels]) => ({
        groupTitle,
        channels,
      }));

      setChannels(groupedChannels);
    } catch (error) {
      console.error('Errore durante il recupero del file M3U', error);
      setError('Errore durante il recupero del file M3U');
    } finally {
      setLoading(false);
    }
  };

  const parseM3U = (m3uContent) => {
    const channels = [];
    const lines = m3uContent.split('\n');

    let currentChannel = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('#EXTINF')) {
        const infoMatches = line.match(/tvg-ID="([^"]*)" tvg-name="([^"]*)" tvg-logo="([^"]*)"/);

        if (infoMatches && infoMatches.length >= 4) {
          const id = infoMatches[1];
          const name = infoMatches[2];
          const logo = infoMatches[3];
          const groupTitleMatches = line.match(/group-title="([^"]*)"/);
          const groupTitle = groupTitleMatches ? groupTitleMatches[1] : '';

          currentChannel = { id, name, logo, groupTitle };
        } else {
          console.warn('Informazioni canale non valide:', line);
        }
      } else if (line.startsWith('http')) {
        if (currentChannel) {
          currentChannel.streamURL = line;
          channels.push(currentChannel);
          currentChannel = null;
        }
      }
    }

    return channels;
  };

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    setShowPlayer(true);

    if (videoPlayerRef && videoPlayerRef.current) {
      videoPlayerRef.current.load(channel.streamURL);
    }
  };

  return (
    <div>
      <h1>IPTV Playlist Fetcher</h1>
      <IPTVLinkParser />
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {channels.map((group) => (
          <GroupList key={group.groupTitle} groupTitle={group.groupTitle} channels={group.channels} onChannelClick={handleChannelClick} />
        ))}
      </div>

      {selectedChannel && showPlayer && (
        <div>
          <h2>{selectedChannel.name}</h2>
          <VideoPlayer ref={videoPlayerRef} streamURL={selectedChannel.streamURL} />
        </div>
      )}
    </div>
  );
};

export default IPTVPlaylistFetcher;
