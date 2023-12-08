export default function convertUtcToLocal(utcTimeString, targetTimeZone) {
  const utcDate = new Date(utcTimeString);
  const localDateString = utcDate.toLocaleString('en-US', { timeZone: targetTimeZone });
  const localDate = new Date(localDateString);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const formattedLocalDate = localDate.toLocaleString('en-US', options);
  return formattedLocalDate.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, '$3/$1/$2 $4:$5:$6');
}