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
    {name: 'name', label: 'dossard', unic: true, type: 'string'},
    {name: 'famillyName', label: 'dossard', unic: true, type: 'string'},
    {name: 'time', label: 'time', unic: true, type: 'time'},
  ]
}

const dummyNames = 'GABRIEL RAPHAËL LOUIS LÉO NOAH ARTHUR ADAM JULES'.split` `
const dummyFamillyNames = 'Lero Petit Durand Dubois MOreau Lefevre Mercier Aubry Garnier Perrin Blanc Muller'.split` `

const generateDummyData = (model, numOfData = 200) => {
  // need to check model validity
  const res = Array(numOfData).fill('').map((v, i) => {
    const line = {};
    model.forEach((att) => {
      if (att.unic) {
        line[att.name] = i;
      }
      if (att.name === 'name') {
        line[att.name] = getRandomValuesFromEnum(dummyNames);
      }
      if (att.name === 'famillyName') {
        line[att.name] = getRandomValuesFromEnum(dummyFamillyNames);
      }
      if (att.name === 'time') {
        line[att.name] = getRandomInt(1000);
      }
    })
  });

  return res;
}

export { defaultModel, generateDummyData}