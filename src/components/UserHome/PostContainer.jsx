import ImageIcon from '@mui/icons-material/Image';
import GifBoxIcon from '@mui/icons-material/GifBox';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

function PostContainer() {
  return (
    <div className='post-container'>
      <div className='post-container-header'>
        <div className='post-container-avatar'>
          <img
            src='https://scontent.ftbs5-3.fna.fbcdn.net/v/t1.6435-1/31732324_878502372337372_8444703090384306176_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeHLL9eHBEgIA6pijxUYA3TXbIHL1KnP--FsgcvUqc_74TXxWbsxZ9yN8dhhUzG7_3g2o7-tQma62Sl2E_KxabeR&_nc_ohc=wvpxxEUgnF8AX-o3hWN&_nc_ht=scontent.ftbs5-3.fna&oh=00_AfApaUGaKx3BsVYDRRyPKnVeUp3EZjo967TExyRG9ZONHQ&oe=6525263D'
            alt='user avatar'
          />
        </div>
        <div className='post-container-placeholder'>What should I eat?</div>
      </div>

      <div className='post-container-footer'>
        <ImageIcon fontSize='10' style={{ color: '#F9A109', opacity: '0.8' }} />
        <GifBoxIcon
          fontSize='10'
          style={{ color: '#F9A109', opacity: '0.8' }}
        />
        <EmojiEmotionsIcon
          fontSize='10'
          style={{ color: '#F9A109', opacity: '0.8' }}
        />
      </div>
    </div>
  );
}

export default PostContainer;
