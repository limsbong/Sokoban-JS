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

const movePlayer = (playerIdx, emptyIdx) => {
    const temp = map[playerIdx];
    map.splice(playerIdx, 1, map[emptyIdx]);
    map.splice(emptyIdx, 1, temp);
}

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

const map = [
    " ", " ", "#", "#", "#", "#", "#", "#", "#", " ", " ",
    "#", "#", "#", " ", " ", "O", " ", " ", "#", "#", "#",
    "#", " ", " ", " ", " ", "o", " ", " ", " ", " ", "#",
    "#", " ", "O", "o", " ", "P", " ", "o", "O", " ", "#",
    "#", "#", "#", " ", " ", "o", " ", " ", "#", "#", "#",
    " ", "#", " ", " ", " ", "O", " ", " ", "#", " ", " ",
    " ", "#", "#", "#", "#", "#", "#", "#", "#", " ", " "
];

startGame()