const GAMEWIDTH = 640;
const GAMEHEIGHT = 480;

var config = {
    type: Phaser.AUTO,
    width: GAMEWIDTH,
    height: GAMEHEIGHT,
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