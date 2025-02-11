import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function InfiniteScroll({ loadMore }) {
  const bottomBoundaryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 },
    );

    observer.observe(bottomBoundaryRef.current);

    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div
      style={{ height: '10px', background: 'transparent' }}
      ref={bottomBoundaryRef}
    />
  );
}

InfiniteScroll.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default InfiniteScroll;
