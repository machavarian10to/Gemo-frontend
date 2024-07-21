export default function getTimeDifference(createdAt) {
  const currentTime = new Date();
  const timeDifference = Math.abs(currentTime - createdAt);
  const secondsDifference = Math.round(timeDifference / 1000);
  const minutesDifference = Math.round(secondsDifference / 60);
  const hoursDifference = Math.round(minutesDifference / 60);
  const daysDifference = Math.round(hoursDifference / 24);

  if (daysDifference > 0) {
    return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
  } else if (minutesDifference > 0) {
    return `${minutesDifference} minute${
      minutesDifference !== 1 ? 's' : ''
    } ago`;
  } else {
    return `just now`;
  }
}
