const axios = require("axios");

// // console.log(findCoords(dataCoords))

// // // console.log(coords);

// // let width = coords.maxLat - coords.minLat;
// // let height = coords.maxLng - coords.minLng;

// // let gridWidth = width / n;
// // let gridHeight = height / n;

// const getCoords = (lng, lat) => {
//   let coords = findCoords(data.map(n => n.location.coordinates));
//   let n = 20;

//   let height = coords.maxLat - coords.minLat;
//   let width = coords.maxLng - coords.minLng;

//   let gridWidth = width / n;
//   let gridHeight = height / n;
//   let x = lng - coords.minLng;
//   let y = lat - coords.minLat;

//   let newX = Math.floor(x / gridWidth);
//   let newY = Math.floor(y / gridHeight);
//   return [newX, newY];
// };

// // dataCoords.forEach(n => {
// //   console.log(getCoords(n[0], n[1]));
// // });

// let newPharms = data.reduce((acc, n) => {
//   let gridSquare = getCoords(...n.location.coordinates);
//   if (!acc.some(el => getCoords(...el.location.coordinates) == gridSquare)) {
//     return [...acc, n];
//   }
//   return acc;
// }, []);

// console.log(newPharms.length, "out of", data.length);
// console.log(getCoords(-73.87718672, 40.73644836))

axios("https://data.cityofnewyork.us/resource/inaf-e6a5.json").then(res => {

const findCoords = arr => {
  let lats = [];
  let lngs = [];
  arr.forEach(n => {
    lngs.push(n[0]);
    lats.push(n[1]);
  });
  let maxLat = Math.max(...lats);
  let minLat = Math.min(...lats);
  let maxLng = Math.max(...lngs);
  let minLng = Math.min(...lngs);
  return { maxLat, minLat, maxLng, minLng };
};
  const data = res.data;
  const getCoords = (lng, lat) => {
    let coords = findCoords(data.map(n => n.location.coordinates));
    let n = 20;

    let height = coords.maxLat - coords.minLat;
    let width = coords.maxLng - coords.minLng;

    let gridWidth = width / n;
    let gridHeight = height / n;
    let x = lng - coords.minLng;
    let y = lat - coords.minLat;

    let newX = Math.floor(x / gridWidth);
    let newY = Math.floor(y / gridHeight);
    return [newX, newY];
  };

  // dataCoords.forEach(n => {
  //   console.log(getCoords(n[0], n[1]));
  // });

  let newPharms = data.reduce((acc, n) => {
    let gridSquare = getCoords(...n.location.coordinates);
    if (!acc.some(el => {
      let oldGridSquare = getCoords(...el.location.coordinates)
      return oldGridSquare[0] === gridSquare[0] && oldGridSquare[1] === gridSquare[1]
    })) {
      return [...acc, n];
    }
    return acc;
  }, []);
  console.log(newPharms.length , "out of" , data.length)
});
