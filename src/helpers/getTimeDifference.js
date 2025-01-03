export default function getTimeDifference(createdAt, t) {
  const currentTime = new Date();
  const timeDifference = Math.abs(currentTime - createdAt);
  const secondsDifference = Math.round(timeDifference / 1000);
  const minutesDifference = Math.round(secondsDifference / 60);
  const hoursDifference = Math.round(minutesDifference / 60);
  const daysDifference = Math.round(hoursDifference / 24);

  if (daysDifference > 0) {
    return `${daysDifference} ${
      daysDifference === 1 ? t('time.day_ago') : t('time.days_ago')
    }`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference} ${
      hoursDifference === 1 ? t('time.hour_ago') : t('time.hours_ago')
    }`;
  } else if (minutesDifference > 0) {
    return `${minutesDifference} ${
      minutesDifference === 1 ? t('time.minute_ago') : t('time.minutes_ago')
    }`;
  } else {
    return t('time.now');
  }
}
