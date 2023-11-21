# Sokoban

- 1단계: 맵 정보를 객체로 저장 및 출력하기
---------------------

## 실행화면
<img width="514" alt="스크린샷 2023-11-21 오후 11 07 30" src="https://github.com/limsbong/Sokoban-JS/assets/126482821/cec1a936-c2b6-4b03-b348-39676d18fc35">


---------------------
## Content
1. main함수
2. 2차원 배열을 1차원 배열로 펼치기
3. 맵 정보를 읽어와 객체로 넘겨주기
4. 플레이어 위치 가져오기
5. 출력하기

---------------------
## 1. main함수
- map을 2차원 배열로 만들고 main함수에 인수로 넣어주어 처리한다.
- main함수가 실행되면 stage가 1씩 올라가고 아래의 함수로 map의 정보와 플레이어의 위치를 얻어와 renderMap으로 출력한다.
```
- const playerLocation = 플레이어의 위치 값(row, column)

- const mapData = 2차원 배열을 펼쳐 1차원 배열에 넣어준 값 
(예: [["#####"], ["#OoP#"], ["#####"]] >>> 
["#, "#", "#", "#", "#", "#", "O", "o", "P", "#", #, "#", "#", "#", "#"])

- const mapInfo = checkValue(mapData) = #, O, o, p가 몇개 있는지 확인해 값을 객체로 넣어줌

- renderMap(map, mapInfo, playerLocation); map, map의 정보, 플레이어의 위치를 받아와 출력
```  
```
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
```

---------------------
## 2. 2차원 배열을 1차원 배열로 펼치기
- 2차원 배열의 map을 넘겨주어 forEach로 각각의 배열 mapLine 를 받아온다. // ["#####"]
- mapLine[0] // "#####" 이 출력된다.
- mapLine[0].split("") // ["#", "#", "#", "#", "#"] 배열을 만들어 각각의 값을 mapDataArray에 넣어주어 1차원 배열로 펼쳐주고 mapDataArray을 리턴헤 mapData에 넣어준다.
```
const mapData = readMap(map);

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
```

---------------------
## 3. 맵 정보를 읽어와 객체로 넘겨주기
- 1차원 배열로 펼쳐진 mapData를 checkValue 함수의 인자로 넘겨준다.
- 문자마다 변수를 지정해주고 mapData를 순회해 각 문자가 나오면 ++해준다.
- 그 값을 객체로 리턴해 mapInfo에 넣어주었다. 
```
const mapInfo = checkValue(mapData);

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
```

---------------------
## 4. 플레이어 위치 가져오기
```
const playerLocation = getPlayerLocation(map)

const getPlayerLocation = (map) => {
    let row = 0;
    let column = 0;

    for (let i = 0; i < map.length; i++) {
        const mapLine = map[i][0]; // "#####"
        for (let j = 0; j < mapLine.length; j++) {
            if (mapLine[j] === "P") {
                row = j + 1;
                column = i + 1;
            }
        }
    }
    return { row, column };
}
```

## 5. 출력하기
- 얻어온 정보를 renderMap에 넣어주어 필요한 값을 출력해주었다.
```
renderMap(map, mapInfo, playerLocation);

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
```

