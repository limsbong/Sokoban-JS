const checkValue = (mapData) => {
    let emptyPlace = 0;
    let hall = 0;
    let ball = 0;
    let player = 0;
    let wall = 0;

    for (let i = 0; i < mapData.length; i++) {
        if (mapData[i] === "#") {
            wall++;
        } else if (mapData[i] === "O") {
            hall++;
        } else if (mapData[i] === "o") {
            ball++;
        } else if (mapData[i] === " ") {
            emptyPlace++;
        } else {
            player++
        }
    }
    return {
        emptyPlace,
        hall,
        ball,
        player,
        wall
    }
}

const readMap = (map) => {
    const mapDataArray = [];
    map.forEach(mapLine => {
        const mapData = mapLine[0].split("");
        mapData.forEach(cur => {
            mapDataArray.push(cur);
        })
    });
    return mapDataArray;
};

const renderMap = (map, mapInfo, playerLocation) => {
    map.forEach(cur => {
        console.log(cur)
    })
    console.log(`Stage ${stage}`)
    console.log(`가로크기: ${map[0][0].split("").length}`)
    console.log(`세로크기: ${map.length}`)
    console.log(`구멍의 수: ${mapInfo.hall}`)
    console.log(`구멍의 수: ${mapInfo.ball}`)
    console.log(`플레이어 위치: ${playerLocation.column}행 ${playerLocation.row}열`)
}

const getPlayerLocation = (map) => {
    let row = 0;
    let column = 0;

    for (let i = 0; i < map.length; i++) {
        const mapLine = map[i][0];
        for (let j = 0; j < mapLine.length; j++) {
            if (mapLine[j] === "P") {
                row = j + 1;
                column = i + 1;
            }
        }
    }
    return { row, column };
}

const main = (map) => {
    stage++
    const playerLocation = getPlayerLocation(map)
    const mapData = readMap(map);
    const mapInfo = checkValue(mapData);
    renderMap(map, mapInfo, playerLocation);
}
let stage = 0;
const map1 = [["#####"], ["#OoP#"], ["#####"]];
const map2 = [["  #######  "], ["###  O  ###"], ["#    o    #"], ["# Oo P oO #"], ["###  o  ###"], [" #   O  #  "], [" ########  "]];

main(map1);
main(map2);