import { useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif, Grid } from '@giphy/react-components';
import Fade from '@mui/material/Fade';

function GifTabContent() {
  const [width, setWidth] = useState(window.innerWidth);
  const [modalGif, setModalGif] = useState();

  const giphyFetch = new GiphyFetch('AOMEuXbNwj4VFOR8NgvKyAUyNVrEDtT2');
  const fetchGifs = () => {
    giphyFetch.trending({ offset: 25, limit: 10 });
  };

  const onGifClick = (gif, e) => {
    console.log('gif', gif);
    e.preventDefault();
    setModalGif(gif);
  };

  return (
    <Fade in={true} timeout={400}>
      <div className='gif-container'>
        <Grid
          onGifClick={onGifClick}
          fetchGifs={fetchGifs}
          width={width}
          columns={3}
          gutter={6}
        />

        {modalGif && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(0, 0, 0, .8)',
            }}
            onClick={(e) => {
              e.preventDefault();
              setModalGif(undefined);
            }}
          >
            <Gif gif={modalGif} width={200} />
          </div>
        )}
      </div>
    </Fade>
  );
}

export default GifTabContent;
