const getRandom = (max) => Math.max(1, Math.floor(Math.random() * max));
const getRandomChar = () => {
  const chrs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return chrs.charAt(Math.floor(Math.random() * chrs.length));
};
const getRandomInt = (maxInteger) => Math.floor(Math.random() * maxInteger);
const getRandomValuesFromEnum = (values) => values[getRandomInt(getRandomInt(values.length + 1))];

const defaultModel = {
  keys: [
    {name: 'dos', label: 'dossard', unic: true, type: 'number'},
    {name: 'cat', label: 'cathegorie', unic: false, type: 'string'},
    {name: 'name', label: 'dossard', unic: false, type: 'string'},
    {name: 'famillyName', label: 'dossard', unic: false, type: 'string'},
    {name: 'time', label: 'time', unic: false, type: 'time'},
  ]
}

const dummyCategoris = Array(5).fill('').map((v,i) => 'MF'.split``.map((s) => s + '_' + i)).flat()
const dummyNames = 'GABRIEL RAPHAËL LOUIS LÉO NOAH ARTHUR ADAM JULES'.split` `
const dummyFamillyNames = 'Leroy Petit Durand Dubois MOreau Lefevre Mercier Aubry Garnier Perrin Blanc Muller'.split` `

function generateAthleteTimes(startTime = "16:00:00", minSeconds = 3600, maxSeconds = 14400) {
  // Convert startTime to a Date object
  const [hours, minutes, seconds] = startTime.split(":").map(Number);
  const startDate = new Date();
  startDate.setHours(hours, minutes, seconds, 0);
  
  const duration = Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;
  const arrivalDate = new Date(startDate.getTime() + duration * 1000);

  return {
    startTime: startDate.toTimeString().split(" ")[0],
    duration: new Date(duration * 1000).toISOString().substr(11, 8),
    arrivalTime: arrivalDate.toTimeString().split(" ")[0]
  }
}


const generateDummyData = (model, numOfData = 200) => {
  // need to check model validity
  const res = Array(numOfData).fill('').map((v, i) => {
    const line = {};
    model.keys.forEach((att) => {
      if (att.unic) {
        line[att.name] = i;
      }
      if (att.name === 'cat') {
        line[att.name] = getRandomValuesFromEnum(dummyCategoris);
      }
      if (att.name === 'name') {
        line[att.name] = getRandomValuesFromEnum(dummyNames);
      }
      if (att.name === 'famillyName') {
        line[att.name] = getRandomValuesFromEnum(dummyFamillyNames);
      }
      const times = generateAthleteTimes();
      Object.entries(times).forEach((e) => {
        line[e[0]] = e[1];
      })
    })
    return line;
  });

  return res;
}

export { defaultModel, generateDummyData}