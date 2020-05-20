
// CONSTANTS
const t1 = 2;
const t2 = 5;
const t3 = 30;
const tf = 60;
const SMALL_SPAWN_TIME = 2000;
const MEDIUM_SPAWN_TIME = 4000;
const BIG_SPAWN_TIME = 8000;
const SMALL_SCORE = 1;
const MEDIUM_SCORE = 5;
const BIG_SCORE = 10;

const fishSize = {
    SMALL: 0,
    MEDIUM: 1,
    BIG: 2,
    BIGGEST: 3
}

class SceneMain extends Phaser.Scene {

    constructor() {
      super({ key: "SceneMain"});
    }
      
    preload ()
    {     
        this.load.image('bg', 'assets/bg.png');
        this.load.image('hook', 'assets/fishing-line.png');
        this.load.image('blank', 'assets/hook-fish-hitbox.png')

        this.load.image('voidfish', 'assets/voidfish.png');
        this.load.image('biggest', 'assets/biggest-fish.png');
        this.load.image('big', 'assets/big-fish.png');
        this.load.image('medium', 'assets/med-fish.png');
        this.load.image('small', 'assets/small-fish.png');
        

        // VARIABLES
        this.score = 0;
        this.scoreText;
        this.threshhold = t1;
        this.level = 0;
        this.hook;
        this.fishes = this.add.group();
        this.debris = this.add.group();
        this.timerText;
        this.smallTimer;
        this.mediumTimer;
        this.bigTimer;

        // SPAWN THE FISHES!!!
        this.smallTimer = this.time.addEvent( {
            delay: SMALL_SPAWN_TIME,
            callback: function() {
                var fish = new SmallFish(this);
                this.fishes.add(fish);
            },
            callbackScope: this,
            loop: true
        });

        this.globalTimer = this.time.addEvent({
            delay: 1000,
            callback: function() {
                // this.timerText.setText("Time Left: " + time);
            }
        });
    }
    
    
    create() {
        // add background image
        this.add.image(0, 0, 'bg').setOrigin(0,0);
    
        // HOOK
        this.hook = new Hook(this);
        this.physics.add.overlap(this.hook, this.fishes, this.overlayHookFish);

        // SCORE
        this.scoreText = this.add.text(16, 16, 'fishes: 0', { fontSize: '16px', fill: '#000'});  
        
        this.timerText = this.add.text(16, 464, 'Time Left: 0', { fontSize: '16px', fill: '#000'});

        new BiggestFish(this);
    }
    
    update(){
        console.log(this.threshhold);
    }

    // lets the fish off the hook, it within range of catching, add to score, otherwise it runs away
    letFishGo(){
        if (!this.hook.hasFish()) return; // if nothing on hook, nothing happens
        
        if (this.hook.y <= -45) {
            this.increaseScore(this.hook.fish); // gives more fishes for bigger fish
            this.scoreText.setText('fishes: ' + this.score);
            this.hook.removeFish(true);

            if (this.score >= this.threshhold && this.threshhold < tf)
                this.increasDifficulty();

        } else {
            this.hook.removeFish();
        }
    }
   
    
    // adds to current score based on fish size
    increaseScore(fish) {
        switch (fish.size) {
            case fishSize.SMALL:
                this.score += SMALL_SCORE;
                break;
            case fishSize.MEDIUM:
                this.score += MEDIUM_SCORE;
                break;
            case fishSize.BIG:
                this.score += BIG_SCORE;
                break;
            case fishSize.BIGGEST:
                // stan: what why ain't the counter going up? Better not be like on of those dumb money suckling arcade games >:[
                    this.time.addEvent({
                        delay: BIG_SPAWN_TIME,
                        callback: function() {
                            this.add.image(0, 0, 'voidfish').setOrigin(0, 0);
                            this.endGame();
                        },
                        callbackScope: this,
                        loop: false
                    });           
        }
    }

    endGame() {
        this.time.addEvent({
            delay: BIG_SPAWN_TIME,
            callback: function() {
                this.scene.start("SceneGameOver");
            },
            callbackScope: this,
            loop: false
        });
    }

    // attaches fish to the hook if no current fish on the hook
    overlayHookFish(hook, fish) {

        if (fish.size == fishSize.SMALL && !hook.hasFish()) {
            hook.addFish(fish);
        } else if (!hook.hasFish()) {
            return;
        } else if (fish.size == fishSize.MEDIUM && hook.fish.size == fishSize.SMALL) {
            hook.removeFish(false);
            hook.addFish(fish);
        } else if (fish.size == fishSize.BIG && hook.fish.size == fishSize.MEDIUM) {
            hook.removeFish(false);
            hook.addFish(fish);
        } else if (fish.size == fishSize.BIGGEST && hook.fish.size == fishSize.BIG) {
            hook.removeFish(false);
            hook.addFish(fish);
        }
    }
 
    // adds more fish variety && obstacles
    increasDifficulty() {
        console.log("next threshhold " + this.threshhold);
        switch (this.level) {
            case 0:
                this.threshhold = t2;
                this.mediumTimer = this.time.addEvent( {
                    delay: MEDIUM_SPAWN_TIME,
                    callback: function() {
                        var fish = new MediumFish(this);
                        this.fishes.add(fish);
                    },
                    callbackScope: this,
                    loop: true
                });        
                this.level++;
                break;
            case 1:
                this.threshhold = t3;
                this.bigTimer = this.time.addEvent( {
                    delay: BIG_SPAWN_TIME,
                    callback: function() {
                        var fish = new BigFish(this);
                        this.fishes.add(fish);
                    },
                    callbackScope: this,
                    loop: true
                });        
                this.level++;
                break;
            case 2:
                this.threshhold = tf;
                this.smallTimer.destroy();
                this.mediumTimer.destroy();
                this.bigTimer.destroy();
                console.log("Biggist Fish!!!");
                this.time.addEvent({
                    delay: BIG_SPAWN_TIME,
                    callback: function() {
                        var fish = new BiggestFish(this);
                        this.fishes.add(fish);
                    },
                    callbackScope: this,
                    loop: false
                });
        }   
    }
}

