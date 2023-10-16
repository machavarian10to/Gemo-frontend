import { useState, useRef, useEffect } from 'react';
import Button from '@/components/Button';
import PropTypes from 'prop-types';

function CustomLink({
  execCommand,
  editorContentRef,
  showCustomLink,
  setShowCustomLink,
}) {
  useEffect(() => {
    if (showCustomLink) {
      linkUrlRef.current?.focus();
    }
  }, [showCustomLink]);

  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [showInvalidLinkError, setShowInvalidLinkError] = useState(false);

  const linkUrlRef = useRef();

  function enterKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      createLink();
    }
  }

  function createLink() {
    editorContentRef.current?.focus();

    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!urlRegex.test(linkUrl)) {
      setShowInvalidLinkError(true);
      linkUrlRef.current?.focus();
      return;
    }

    execCommand(
      'insertHTML',
      false,
      `<a onclick="linkPreviewHandler()" target="_blank" rel="noopener noreferrer" href="${
        linkUrl.startsWith('https://') ? linkUrl : `https://${linkUrl}`
      }">${linkTitle || linkUrl}</a>`,
    );

    // const selection = window.getSelection();
    // const range = selection.getRangeAt(0).cloneRange();
    // const linkElement = document.createElement('a');
    // linkElement.href = linkUrl.startsWith('https://')
    //   ? linkUrl
    //   : `https://${linkUrl}`;
    // linkElement.className = 'showCustomLink';
    // linkElement.rel = 'noopener noreferrer';
    // linkElement.addEventListener('click', () => {
    //   window.open(linkElement.href, '_blank');
    //   // linkElement.classList.toggle('show-preview');
    // });
    // linkElement.textContent = linkTitle.length ? linkTitle : linkUrl;
    // range.insertNode(linkElement);
    // range.setEndAfter(linkElement);
    // range.setStartAfter(linkElement);
    // selection.removeAllRanges();
    // selection.addRange(range);

    setShowCustomLink(false);
    if (showCustomLink) {
      setLinkTitle('');
      setLinkUrl('');
      setShowInvalidLinkError(false);
    }
  }

  return (
    <div className='link-inputs-wrapper' onKeyDown={enterKeyPress}>
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
  );
}

CustomLink.propTypes = {
  execCommand: PropTypes.func.isRequired,
  editorContentRef: PropTypes.object.isRequired,
  showCustomLink: PropTypes.bool.isRequired,
  setShowCustomLink: PropTypes.func.isRequired,
};

export default CustomLink;
