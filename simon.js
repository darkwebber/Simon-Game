const levGen = (levelNo) => {
    let arr = [];
    const leng = 2 + levelNo;
    for (let c = 0; c < leng; c++) {
        arr.push(Math.floor(Math.random() * 4) + 1);
    }
    return arr;
};
let transitionSound = new Audio("sounds/transition.wav");
let gameOverSound = new Audio("sounds/gameOver.wav");
let victory = new Audio("sounds/wonGame.wav");
let green = new Audio("sounds/clickSounds/green.mp3");
green.playbackRate = 1.75;
let yellow = new Audio("sounds/clickSounds/yellow.wav");
let red = new Audio("sounds/clickSounds/red.mp3");
let blue = new Audio("sounds/clickSounds/blue.wav");
let clickSounds = [green, green, yellow, yellow];
let i = 0;//Start and Refresh Controller
let j = 0;//Input Controller
let level = 1;//Level Count
const maxLevel = 4;//Level Limit
const tiles = [$("#1"), $("#2"), $("#3"), $("#4")];
let levList = [];
const levMethod = () => {
    $(".tile").unbind();
    let levelList = levGen(level);
    levList = levelList;
    console.log(`level = ${levList}`);
    const showPlayer = () => {
        let travConst = 0;
        const traverse = (list) => {
            let ind = levelList[travConst] - 1;
            tiles[ind].css("opacity", '45%');
            setTimeout(() => { $(tiles[ind]).animate({ opacity: '100%' }) },
                50);
            if (travConst == list.length - 1) {
                travConst = 0;
                clearInterval(show);
                $(".tile").click(function () {
                    let head = $("h1").text();
                    if (head !== "Press A Key to Start" && head !== "Game Over,Press any Key to Restart" && level != maxLevel + 1) {
                        if (j < levList.length) {
                            if (parseInt(this.id) != levList[j]) {
                                levelUp(level, 0);
                            }
                            else {
                                switch (parseInt(this.id)) {
                                    case 1:
                                        green.load();
                                        green.play();
                                        break;
                                    case 2:
                                        red.load();
                                        red.play();
                                        break;
                                    case 3:
                                        yellow.load();
                                        yellow.play();
                                        break;
                                    case 4:
                                        blue.load();
                                        blue.play();
                                        break;


                                }
                                j += 1;
                            }
                        }
                        $(this).css("opacity", '50%');
                        setTimeout(() => { $(this).animate({ opacity: '100%' }) }, 50);
                        if (j == levList.length) {
                            levelUp(level, 1);
                        }
                    }

                });
            }
            else {
                travConst += 1;
            }
        };
        let show = setInterval(() => {
            traverse(levelList);
        }, 700);
    }
    showPlayer();
};

let initHead = $("h1").text();
$(document).keypress((event) => {
    if (i == 0) {
        console.log(event.key);
        $("h1").text("Level 1");
        level = 1;
        setTimeout(
            //showPlayer()
            levMethod()
            , 50);
        i += 1;
    }
});

const levelUp = (levelNo, result) => {
    if (result == 1) {
        if (levelNo == maxLevel) {
            setTimeout(() => { victory.play(); }, 10);
            level += 1;
            $("h1").html("You Won!<span style='position: relative; bottom:0.3ex;'>&#x1F389</span>");
        }
        else {
            transitionSound.play();
            $("h1").text(`Level ${levelNo + 1}`);
            level += 1;
            j = 0;
            levMethod();
        }
    }
    if (result == 0) {
        gameOverSound.play();
        $("h1").text("Game Over,Press any Key to Restart");
        i = 0;
        j = 0;
        $("body").css("background-color", "red");
        setTimeout(
            () => { $("body").css("background-color", "#000030"); }, 40
        );
    }
};

