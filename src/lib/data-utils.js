function parseDurationToSeconds(durationStr) {
  const [h, m, s] = durationStr.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}

function formatSecondsToHMS(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map(v => String(v).padStart(2, "0")).join(":");
}

function groupDurationsByPercentile(durations) {
  const durationsSec = durations.map(parseDurationToSeconds);
  const min = Math.min(...durationsSec);
  const max = Math.max(...durationsSec);
  const range = max - min;

  const bins = Array.from({ length: 11 }, (_, i) => min + i * range / 10);
  const counts = Array(10).fill(0);

  durationsSec.forEach(sec => {
    for (let i = 0; i < 10; i++) {
      if (sec >= bins[i] && sec < bins[i + 1]) {
        counts[i]++;
        break;
      } else if (sec === max && i === 9) {
        counts[i]++;
        break;
      }
    }
  });

  return counts.map((count, i) => ({
    range: `${formatSecondsToHMS(bins[i])} - ${formatSecondsToHMS(bins[i + 1])}`,
    categories: (i+1)*10 + "%",
    count
  }));
}


const getCountryFlagFromCode = (code) => {
  const flagEmoji = code
    .toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt()))
    .join('');
  return flagEmoji;
}


// const getCountryFlagFromCodeToTest = (code) => {
//   const url = `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;
//   return <img src={url} alt={`Flag of ${code}`} width="24" height="18" />;
// }



export { groupDurationsByPercentile, parseDurationToSeconds, getCountryFlagFromCode }