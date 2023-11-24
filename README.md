# Sokoban

- 2단계: 플레이어 이동 구현하기
---------------------

## 실행화면
https://github.com/limsbong/Sokoban-JS/assets/126482821/f998de01-4d53-428a-bd14-e36090ec462a

---------------------
## Content
1. 맵 그리기
2. keydown handler
3. 이동방향 check 및 배열 바꾸기

---------------------
## 1. 맵 그리기
- map을 1차원 배열로 만들고 전역변수로 선언하여 다른 함수에서 사용할 수 있도록 했다.
```
const map = [
    " ", " ", "#", "#", "#", "#", "#", "#", "#", " ", " ",
    "#", "#", "#", " ", " ", "O", " ", " ", "#", "#", "#",
    "#", " ", " ", " ", " ", "o", " ", " ", " ", " ", "#",
    "#", " ", "O", "o", " ", "P", " ", "o", "O", " ", "#",
    "#", "#", "#", " ", " ", "o", " ", " ", "#", "#", "#",
    " ", "#", " ", " ", " ", "O", " ", " ", "#", " ", " ",
    " ", "#", "#", "#", "#", "#", "#", "#", "#", " ", " "
];
```
-  li의 크키를 부모요소인 ul태그 width 100%의 11 크기로 맞추어 맵의 줄마다 넘겨주도록 했다.
```
<div class="main-box">
            <ul class="map" id="map">
            </ul>
    </div>
```
```  
.main-box ul li {
    width: calc(100% / 11);
}
```
- createElement로 li태그를 만들고 그안에 map 배열을 순서대로 불러와 텍스트로 넣어준다음 mapBox의 자식요소로 넣어줬다.
```
const startGame = () => {
    renderMap();
}
startGame()

const renderMap = () => {
    const mapBox = document.querySelector(".map");
    mapBox.innerHTML = "";

    for (let i = 0; i < 77; i++) {
        const addMapList = document.createElement("li");
        const mapDataNode = document.createTextNode(map[i]);
        addMapList.appendChild(mapDataNode);
        mapBox.appendChild(addMapList);
    }
}
```


---------------------
## 2. keydown handler 
- prompt로 값을 받아서 player를 움직이는 방법 대신 키보드 방향키를 이용해 player를 움직이는 방법을 생각했다.
- player가 움직이려하는 방향에 물체가 있는지 확인하는 checkUpLocation()함수를 실행한다.
- 움직이려하는 방향에 물체가 없다면 배열을 바꿔주고 맵을 다시 그렸다.
```
const startGame = () => {
    renderMap();

    const keyDownHandler = (event) => {
        if (event.key === "ArrowUp") {
            checkUpLocation();
            renderMap()
        } else if (event.key === "ArrowRight") {
            checkRightLocation();
            renderMap()
        } else if (event.key === "ArrowLeft") {
            checkLeftLocation();
            renderMap()
        } else if (event.key == "ArrowDown") {
            checkDownLocation();
            renderMap()
        }
    }
    document.addEventListener("keydown", keyDownHandler);
}
```

---------------------
## 3. 이동방향 check 및 배열 바꾸기
- 각 키마다 이동 하려는 방향의 index는 P index의 -11(Up), +1(Right), -1(Left), +11(Down)일테니 각 상황마다 함수를 만들어 빈텍스트라면 movePlayer함수에 P index와 각 방향의 index를 넘겨주어 값을 바꿔주었다.
- 빈 텍스트가 아니라면 alert로 경고창을 띄워줬다.
```
const checkUpLocation = () => {
    const playerIdx = map.indexOf("P");
    const emptyIdx = playerIdx - 11;

    if (map[emptyIdx] === " ") {
        movePlayer(playerIdx, emptyIdx)
    } else {
        alert("(경고!) 해당 명령을 수행할 수 없습니다!")
    }
}

const checkRightLocation = () => {
    const playerIdx = map.indexOf("P");
    const emptyIdx = playerIdx + 1;

    if (map[emptyIdx] === " ") {
        movePlayer(playerIdx, emptyIdx)
    } else {
        alert("(경고!) 해당 명령을 수행할 수 없습니다!")
    }
}

const checkLeftLocation = () => {
    const playerIdx = map.indexOf("P");
    const emptyIdx = playerIdx - 1;

    if (map[emptyIdx] === " ") {
        movePlayer(playerIdx, emptyIdx)
    } else {
        alert("(경고!) 해당 명령을 수행할 수 없습니다!")
    }
}

const checkDownLocation = () => {
    const playerIdx = map.indexOf("P");
    const emptyIdx = playerIdx + 11;

    if (map[emptyIdx] === " ") {
        movePlayer(playerIdx, emptyIdx)
    } else {
        alert("(경고!) 해당 명령을 수행할 수 없습니다!")
    }
}
```
```
const movePlayer = (playerIdx, emptyIdx) => {
    const temp = map[playerIdx];
    map.splice(playerIdx, 1, map[emptyIdx]);
    map.splice(emptyIdx, 1, temp);
}
```