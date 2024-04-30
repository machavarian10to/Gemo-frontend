// import { useState } from 'react';
// import Fade from '@mui/material/Fade';

// function UserGemFooter() {
//   return (
//     <div className='user-gem__footer'>
//       <div
//         className={`user-gem__footer-container ${
//           showEmojis ? 'active-section' : ''
//         }`}
//         onClick={() => setShowEmojis((prev) => !prev)}
//       >
//         <AddReactionOutlinedIcon style={{ fontSize: '19px' }} />
//         <span>React</span>
//         <span>{emojiCount}</span>
//       </div>
//       <div
//         className={`user-gem__footer-container ${
//           showCommentSection ? 'active-section' : ''
//         }`}
//         onClick={() => setShowCommentSection((prev) => !prev)}
//       >
//         <SmsOutlinedIcon style={{ fontSize: '19px' }} />
//         <span>Comment</span>
//         <span>{commentList.length}</span>
//       </div>
//       <div className='user-gem__footer-container'>
//         <AutorenewOutlinedIcon style={{ fontSize: '19px' }} />
//         <span>Share</span>
//         <span>0</span>
//       </div>
//       <div className='user-gem__footer-container'>
//         <ForwardToInboxOutlinedIcon style={{ fontSize: '20px' }} />
//         <span>Send</span>
//         <span>0</span>
//       </div>
//       <div className='user-gem__footer-container' title='Add to favorites'>
//         <StarBorderOutlinedIcon style={{ fontSize: '19px' }} />
//       </div>

//       {showEmojis && (
//         <div className='user-gem__emoji-picker-wrapper' ref={emojiPickerRef}>
//           <EmojiPicker
//             onEmojiClick={(emoji) => addEmoji(emoji)}
//             previewConfig={{ showPreview: false }}
//             autoFocusSearch={false}
//             emojiStyle='native'
//             theme='light'
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserGemFooter;
