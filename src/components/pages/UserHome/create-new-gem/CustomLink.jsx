import { useState, useRef, useEffect } from 'react';
import useClickOutside from '@/hook/useClickOutside';
import Button from '@/components/UI/Button';
import PropTypes from 'prop-types';
import { Grow } from '@mui/material';

function CustomLink({
  showCustomLink,
  setShowCustomLink,
  cursorPosition,
  inputHandler,
}) {
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [showInvalidLinkError, setShowInvalidLinkError] = useState(false);

  const linkUrlRef = useRef();
  const modalRef = useRef();

  useEffect(() => {
    if (showCustomLink) {
      linkUrlRef.current?.focus();
    }
  }, [showCustomLink]);

  useClickOutside(modalRef, () => {
    if (showCustomLink) setShowCustomLink(false);
  });

  function enterKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      createLink();
    }
  }
  function createLink() {
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!urlRegex.test(linkUrl)) {
      setShowInvalidLinkError(true);
      linkUrlRef.current?.focus();
      return;
    }

    if (cursorPosition) {
      const linkElement = document.createElement('a');
      linkElement.target = '_blank';
      linkElement.rel = 'noopener noreferrer';
      linkElement.href = linkUrl.startsWith('https://')
        ? linkUrl
        : `https://${linkUrl}`;
      linkElement.textContent = linkTitle || linkUrl;
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(cursorPosition);

      document.execCommand('insertHTML', false, linkElement.outerHTML);

      setShowCustomLink(false);
      setLinkTitle('');
      setLinkUrl('');
      setShowInvalidLinkError(false);
      inputHandler();
    }
  }

  return (
    <Grow in={showCustomLink}>
      <div
        className='link-inputs-wrapper'
        onKeyDown={enterKeyPress}
        ref={modalRef}
      >
        <div className='link-inputs'>
          <input
            value={linkTitle}
            onChange={(e) => setLinkTitle(e.target.value)}
            tabIndex='2'
            placeholder='Enter the title of link'
          />
          <input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            ref={linkUrlRef}
            tabIndex='1'
            placeholder='Enter the URL'
          />
          {showInvalidLinkError && (
            <p className='not-valid-link'>Link is not valid!</p>
          )}
        </div>
        <Button
          label='Add'
          size='extra-small'
          state={linkUrl.length ? 'active' : 'inactive'}
          clickHandler={createLink}
        />
      </div>
    </Grow>
  );
}

CustomLink.propTypes = {
  showCustomLink: PropTypes.bool.isRequired,
  setShowCustomLink: PropTypes.func.isRequired,
  cursorPosition: PropTypes.object.isRequired,
  inputHandler: PropTypes.func.isRequired,
};

export default CustomLink;
