
// CONSTANTS
const t1 = 5;
const t2 = 20;
const t3 = 60;
const t4 = 80;
const tf = 100;
const SMALL_SPAWN_TIME = 2000;
const MEDIUM_SPAWN_TIME = 6000;
const BIG_SPAWN_TIME = 10000;
const SMALL_SCORE = 1;
const MEDIUM_SCORE = 5;
const BIG_SCORE = 10;

// GLOBAL
var lureLeft = 20; // init value

const fishSize = {
    SMALL: 0,
    MEDIUM: 1,
    BIG: 2,
    BIGGEST: 3
}

const removeFishMode = {
    ESCAPE: 0,
    MATRYOSHKA: 1, // gets eaten by bigger
    CAUGHT: 2,
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
        
        this.load.image('banjo-polish', 'assets/debris-bp.png');
        this.load.image('melodica', 'assets/debris-melodica.png');
        this.load.image('tuba', 'assets/debris-tuba.png');

        this.load.image('gobble', 'assets/gobble.png');
        this.load.image('tentacle', 'assets/tentacle.png');

        // VARIABLES
        this.score = 0;
        this.scoreText;
        this.threshhold = t1;
        this.level = 0;
        this.hook;
        this.fishes = this.add.group();
        this.debrises = this.add.group();
        this.tentacles = this.add.group();
        this.timerText;
        this.smallTimer;
        this.mediumTimer;
        this.bigTimer;
        this.gabbles = this.add.group();
        this.gabbleDirection = false;
        this.gabbleEvent;

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
    }
    
    
    create() {
        // add background image
        this.add.image(0, 0, 'bg').setOrigin(0,0);
    
        // HOOK
        this.hook = new Hook(this);
         
        this.physics.add.overlap(this.hook, this.fishes, this.overlayHookFish);
        this.physics.add.overlap(this.hook, this.debrises, this.overlayHookDebris);
        this.physics.add.overlap(this.hook, this.gabbles, this.overlayHookDebris);

        // SCORE
        this.scoreText = this.add.text(16, 16, 'fishes: 0', { fontSize: '16px', fill: '#000'});  
        
        this.timerText = this.add.text(16, 464, 'Time Left: 0', { fontSize: '16px', fill: '#000'});

        this.tentacles.add(new Tentacle(this, false));

    }
    
    update(){
        for (var i = 0; i < this.tentacles.getChildren().length; i++) {
            this.tentacles.getChildren()[i].update(this.hook);
        }
    }

    // lets the fish off the hook, it within range of catching, add to score, otherwise it runs away
    letFishGo(){
        if (!this.hook.hasFish()) return; // if nothing on hook, nothing happens
        
        if (this.hook.y <= -45) {
            this.increaseScore(this.hook.fish); // gives more fishes for bigger fish
            this.scoreText.setText('fishes: ' + this.score);
            this.hook.removeFish(removeFishMode.CAUGHT);

            if (this.score >= this.threshhold && this.threshhold < tf)
                this.increasDifficulty();
        } else {
            this.hook.removeFish(removeFishMode.ESCAPE);
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
        if (lureLeft <= 0) {
            // ford: i miscalculated our abilities - should've ripped it into more pieces
            // stan: told ya they'd be a great hit
            // ford: we're throwing paper into the ocean stanley
            this.endGame();
        }


        if (fish.size == fishSize.SMALL && !hook.hasFish()) {
            hook.addFish(fish);
        } else if (!hook.hasFish()) {
            return;
        } else if (
            (fish.size == fishSize.MEDIUM && hook.fish.size == fishSize.SMALL) || (fish.size == fishSize.BIG && hook.fish.size == fishSize.MEDIUM) || (fish.size == fishSize.BIGGEST && hook.fish.size == fishSize.BIG)) {
            hook.removeFish(removeFishMode.MATRYOSHKA);
            hook.addFish(fish);
        }
    }


    // if hook has fish and is hit by debris, the fish escapes
    overlayHookDebris(hook, debris) {
        if (hook.hasFish()) {
            hook.removeFish(removeFishMode.ESCAPE);
        }
    }

    // if hook has fish and is eaten by gabble
    overlayHookGabble(hook, gabble) {
        if (hook.fish != null) {
            hook.removeFish(removeFishMode.ESCAPE);
        }
    }
    
    generateDebris() {
        this.debrisEvent = this.time.addEvent({
            delay: BIG_SPAWN_TIME,
            callback: function() {
                var debris = new Debris(this);
                this.debrises.add(debris);
            },
            callbackScope: this,
            loop: true
        });
    }
 
    // starts the gabblewunker chasing
    generateGabble() {
        this.gabbleEvent = this.time.addEvent({
            delay: 10000,
            callback: function() {
                var gabble = new GabbleWinker(this, this.gabbleDirection);
                this.gabbleDirection = !this.gabbleDirection; // flip the man!
                this.gabbles.add(gabble);
            },
            callbackScope: this,
            loop: true
        });
    }


    // starts the tentacle grabbing
    generateTentacles() {
        this.tentEvent = this.time.addEvent({
            delay: 10500,
            callback: function() {
                var tent = new Tentacle(this, !this.gabbleDirection);
                this.tentacles.add(tent);
            },
            callbackScope: this,
            loop: true
        });
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
                this.generateDebris();   
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
                this.generateGabble();    
                break;
            case 2:
                this.threshhold = t4;
                this.generateTentacles();
                break;
            case 3:
                this.threshhold = tf;
                console.log("Biggist Fish!!!");
                this.time.addEvent({
                    delay: BIG_SPAWN_TIME,
                    callback: function() {
                        var fish = new BiggestFish(this);
                        this.fishes.add(fish);
                        this.destroyFishes();
                    },
                    callbackScope: this,
                    loop: false
                });            
        } // switch
        // add more events
        this.level++;
        
    }

    destroyFishes() {
        this.smallTimer.destroy();
        this.mediumTimer.destroy();
        this.bigTimer.destroy();
    }

    destroyEnemies() {
        this.gabbleEvent.destroy();
        this.tentEvent.destroy();

    }
}

