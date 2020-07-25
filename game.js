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
