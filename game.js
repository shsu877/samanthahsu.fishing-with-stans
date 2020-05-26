const GAMEWIDTH = 640;
const GAMEHEIGHT = 480;

var config = {
    type: Phaser.AUTO,
    scale: {
        parent	: 'phaser-app',
        mode: Phaser.Scale.FIT,
        width: GAMEWIDTH,
        height: GAMEHEIGHT,
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        }
    },
    scene: [
        SceneMainMenu,
        SceneMain,
        SceneCutsceneStart,
        SceneGameLose,
        SceneGameWin
    ]
};

var game = new Phaser.Game(config);


// function resizeApp ()
// {
//     // Width-height-ratio of game resolution
//     // Replace 360 with your game width, and replace 640 with your game height
//     let game_ratio = 640 / 480;
	
//     // Make div full height of browser and keep the ratio of game resolution
//     let div = document.getElementById('phaser-app');
//     div.style.width = (window.innerHeight * game_ratio) + 'px';
//     div.style.height = window.innerHeight + 'px';
	
//     // Check if device DPI messes up the width-height-ratio
//     let canvas	= document.getElementsByTagName('canvas')[0];
	
//     let dpi_w	= parseInt(div.style.width) / canvas.width;
//     let dpi_h	= parseInt(div.style.height) / canvas.height;		
    
//     let width = window.innerWidth * (dpi_w / dpi_h)
//     // let height	= window.innerHeight * (dpi_w / dpi_h);
//     let height	= width * game_ratio;
	
//     // Scale canvas	
//     canvas.style.width	= width + 'px';
//     canvas.style.height	= height + 'px';
// }

// window.addEventListener('resize', resizeApp);