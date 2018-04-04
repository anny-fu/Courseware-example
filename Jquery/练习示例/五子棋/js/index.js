/**
 * Created by admin on 2017/3/21.
 */
var chessBoard = [];
var over = false;
//赢法数组，为一个三维数组
var wins =[];
for(var i = 0;i < 15;i++){
    wins[i] =[];
    for(var j = 0;j < 15;j++){
        wins[i][j] =[];
    }
}
//获取弹出框
var popbox = document.getElementsByClassName("popbox")[0],
    h1 = popbox.getElementsByTagName("h1")[0],
    sure = popbox.getElementsByTagName("button")[0],
    cancel = popbox.getElementsByTagName("button")[1];
//赢法统计数组
var mywins =[];
var computerwins =[];
//赢法种类，初始值为0
var count = 0;
//横线赢法
for(var i = 0;i < 15;i++){
    for(var j =0;j < 11;j++){
        for(var k =0; k < 5;k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
}
//竖线赢法
for(var i = 0;i < 15;i++){
    for(var j =0;j < 11;j++){
        for(var k =0; k < 5;k++){
            wins[j+k][i][count] = true;
        }
        count++;
    }
}
//斜线赢法
for(var i = 0;i < 11;i++){
    for(var j =0;j < 11;j++){
        for(var k =0; k < 5;k++){
            wins[i + k][j+k][count] = true;
        }
        count++;
    }
}
//反斜线赢法
for(var i = 0;i < 11;i++){
    for(var j =14;j > 3;j--){
        for(var k =0; k < 5;k++){
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}
/*console.log(count);*/
for(var i =0;i < count;i++){
    mywins[i]=0;
    computerwins[i]=0;
}
//落子
var chessson = true;
for(var i = 0; i < 15;i++){
    chessBoard[i] = [];
    for(var j = 0;j < 15;j++){
        　chessBoard[i][j] = 0;
    }
}
//获取canvas
var chess = document.getElementById("chess");
var cxt = chess.getContext("2d");
cxt.strokeStyle = "#dedede";
var img = new Image();
img.src = 'img/logo2.png';
//画水印
img.onload = function () {
    cxt.drawImage(img,0,0,450,450);
    drawLine();
}
//画棋盘
 function drawLine() {
    for(var i = 0;i < 15;i++){
        cxt.moveTo(15 + i * 30,15);
        cxt.lineTo(15 + i * 30,435);
        cxt.stroke();
        cxt.moveTo(15,15 + i * 30);
        cxt.lineTo(435,15 + i * 30);
        cxt.stroke();
    }
}
//画棋子
function drawChess(i,j,chessson){
    cxt.beginPath();
    cxt.arc(15 + i * 30,15 + j * 30,13,0,2*Math.PI);
    cxt.closePath();
    var gradient = cxt.createRadialGradient(15 + i * 30 + 2,15 + j * 30 - 2,13,15 + i * 30 + 2,15 + j * 30 - 2,0);
    if(chessson){
        gradient.addColorStop(0,"#070707");
        gradient.addColorStop(1,"#242424");
    }else {
        gradient.addColorStop(0,"#fcfcfc");
        gradient.addColorStop(1,"#f7f7f7");
    }
    cxt.fillStyle = gradient;
    cxt.fill();
}
//落子事件
chess.onclick = function (e) {
    if(over){
        return;
    }
    if(!chessson){
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i =  Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if(chessBoard[i][j] == 0){
        drawChess(i,j,chessson);
        chessBoard[i][j] = 1;
        for(var k =0;k < count;k++){
            if(wins[i][j][k]){
                mywins[k]++;
                computerwins[k] = 6;
                if(mywins[k] == 5){
                    /*console.log("你赢了");*/
                    popbox.classList.add("popboxanimate");
                    popbox.style.display = "block";
                    h1.textContent = "恭喜你赢了!"
                    if(popbox.style.display = "block"){
                        sure.onclick = function () {
                            popbox.classList.remove("popboxanimate");
                            popbox.style.display = "none";
                            window.location.reload(true);
                        }
                        cancel.onclick = function () {
                            popbox.classList.remove("popboxanimate");
                            popbox.style.display = "none";
                        }
                    }
                    over = true;
                }
            }
        }
        if(!over){
            chessson = !chessson;
            computerAI();
        }
    }
}
function  computerAI() {
     var myScore =[];
     var computerScore =[];
     var max = 0;
     var u = 0,v = 0;
     for(var i = 0 ;i < 15;i++){
         myScore[i]=[];
         computerScore[i]=[];
         for(var j =0;j < 15;j++){
             myScore[i][j] =0;
             computerScore[i][j]=0;
         }
     }
     for (var i =0;i < 15;i++){
         for(var j = 0; j<15;j++){
             if(chessBoard[i][j] == 0){
                 for(var k = 0; k < count;k++){
                     if(wins[i][j][k]){
                         if(mywins[k] == 1){
                             myScore[i][j] += 200;
                         }else if(mywins[k] == 2){
                             myScore[i][j] += 400;
                         }else if(mywins[k] == 3){
                             myScore[i][j] += 2000;
                         }else if(mywins[k] == 4){
                             myScore[i][j] += 10000;
                         }
                         if(computerwins[k] == 1){
                             computerScore[i][j] += 220;
                         }else if(computerwins[k] == 2){
                             computerScore[i][j] += 420;
                         }else if(computerwins[k] == 3){
                             computerScore[i][j] += 2100;
                         }else if(computerwins[k] == 4){
                             computerScore[i][j] += 20000;
                         }
                     }
                 }
                 if(myScore[i][j] > max){
                     max = myScore[i][j];
                     u = i;
                     v = j;
                 }else if(myScore[i][j] == max){
                      if(myScore[i][j] > computerScore[u][v]){
                          u = i;
                          v = j;
                      }
                 }
                 if(computerScore[i][j] > max){
                     max = computerScore[i][j];
                     u = i;
                     v = j;
                 }else if(computerScore[i][j] == max){
                     if(computerScore[i][j] > myScore[u][v]){
                         u = i;
                         v = j;
                     }
                 }
             }
         }
     }
     drawChess(u,v,false);
    chessBoard[u][v] = 2;
    for(var k =0;k < count;k++){
        if(wins[u][v][k]){
            computerwins[k]++;
            mywins[k] = 6;
            if(computerwins[k] == 5){
                /*console.log("计算机赢了");*/
                popbox.classList.add("popboxanimate");
                popbox.style.display = "block";
                h1.textContent = "对不起你输了!"
                if(popbox.style.display = "block"){
                    sure.onclick = function () {
                        popbox.classList.remove("popboxanimate");
                        popbox.style.display = "none";
                        window.location.reload(true);
                    }
                    cancel.onclick = function () {
                        popbox.classList.remove("popboxanimate");
                        popbox.style.display = "none";
                    }
                }
                over = true;
            }
        }
    }
    if(!over){
        chessson = !chessson;
    }
}