export default function getTimeDifference(createdAt, t) {
  const currentTime = new Date();
  const timeDifference = Math.abs(currentTime - createdAt);
  const secondsDifference = Math.round(timeDifference / 1000);
  const minutesDifference = Math.round(secondsDifference / 60);
  const hoursDifference = Math.round(minutesDifference / 60);
  const daysDifference = Math.round(hoursDifference / 24);

  if (daysDifference > 0) {
    return `${t('time.days', { count: daysDifference })} ago`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference} ${t('time.hours', {
      count: hoursDifference,
    })} ago`;
  } else if (minutesDifference > 0) {
    return `${minutesDifference} ${t('time.minutes', {
      count: minutesDifference,
    })} ago`;
  } else {
    return t('time.now');
  }
}
