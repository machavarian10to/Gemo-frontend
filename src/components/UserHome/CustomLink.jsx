import { useState, useRef, useEffect } from 'react';
import useClickOutside from '@/hook/useClickOutside';
import Button from '@/components/Button';
import PropTypes from 'prop-types';
import { Grow } from '@mui/material';

function CustomLink({
  editorContentRef,
  showCustomLink,
  setShowCustomLink,
  selection,
  inputHandler,
}) {
  useEffect(() => {
    if (showCustomLink) {
      linkUrlRef.current?.focus();
    }
  }, [showCustomLink]);

  const linkUrlRef = useRef();
  const modalRef = useRef();

  useClickOutside(modalRef, () => {
    if (showCustomLink) setShowCustomLink(false);
  });

  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [showInvalidLinkError, setShowInvalidLinkError] = useState(false);

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

    const linkElement = document.createElement('a');
    linkElement.target = '_blank';
    linkElement.rel = 'noopener noreferrer';
    linkElement.href = linkUrl.startsWith('https://')
      ? linkUrl
      : `https://${linkUrl}`;
    linkElement.textContent = linkTitle || linkUrl;
    linkElement.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(linkElement.href, '_blank');
    });

    const editorContent = editorContentRef.current;
    const range = document.createRange();

    if (
      selection &&
      selection.anchorNode &&
      selection.anchorNode.parentNode === editorContent
    ) {
      range.setStart(selection.anchorNode, selection.anchorOffset);
      range.setEnd(selection.anchorNode, selection.anchorOffset);
    } else {
      range.setStart(editorContent, editorContent.childNodes.length);
      range.setEnd(editorContent, editorContent.childNodes.length);
    }

    setShowCustomLink(false);
    if (!showCustomLink) {
      setLinkTitle('');
      setLinkUrl('');
      setShowInvalidLinkError(false);
    }

    editorContent.focus();

    range.insertNode(linkElement);
    range.setStartAfter(linkElement);
    range.setEndAfter(linkElement);
    selection.removeAllRanges();
    selection.addRange(range);

    inputHandler();
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
  editorContentRef: PropTypes.object.isRequired,
  showCustomLink: PropTypes.bool.isRequired,
  setShowCustomLink: PropTypes.func.isRequired,
  selection: PropTypes.object.isRequired,
  inputHandler: PropTypes.func.isRequired,
};

export default CustomLink;
