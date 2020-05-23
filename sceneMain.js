
// CONSTANTS
const t1 = 0;
const t2 = 1;
const t3 = 2;
const t4 = 3;
const tf = 4;
const SMALL_SPAWN_TIME = 2000;
const MEDIUM_SPAWN_TIME = 6000;
const BIG_SPAWN_TIME = 10000;
const SMALL_SCORE = 1;
const MEDIUM_SCORE = 5;
const BIG_SCORE = 10;
const LURE_TEXT = "lure left: ";
const TRANSITION_TIME = 10500;

// GLOBAL
var lureLeft = 50; // init value
var sceneMainInst;

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
        this.lureText;
        this.gabbles = this.add.group();
        this.gabbleDirection = false;
        this.gabbleEvent;
        this.activeEvents = []; // should contain every single time event

        this.spawnSmall();
        sceneMainInst = this; // for calls from overlap
    }

    addRecurringTimeEvent(delay, callback) {
        var event = this.time.addEvent( {
            delay: delay,
            callback: callback,
            callbackScope: this,
            loop: true
        })
        this.activeEvents.push(event);
    }
    
    
    create() {
        // add background image
        this.add.image(0, 0, 'bg').setOrigin(0,0);

        // add metrics
        const textX = 400;
        this.scoreText = this.add.text(textX, 16, 'fishes: 0', { fontSize: '16px', fill: '#000'});  
        
        this.lureText = this.add.text(textX, 30, LURE_TEXT + lureLeft, { fontSize: '16px', fill: '#000'});

    
        // HOOK
        this.hook = new Hook(this);
         
        this.physics.add.overlap(this.hook, this.fishes, this.overlayHookFish);
        this.physics.add.overlap(this.hook, this.debrises, this.overlayHookDebris);
        this.physics.add.overlap(this.hook, this.gabbles, this.overlayHookDebris);
    }
    
    update(){
        for (var i = 0; i < this.tentacles.getChildren().length; i++) {
            this.tentacles.getChildren()[i].update(this.hook);
        }
    }

    // lets the fish off the hook, it within range of catching, add to score, otherwise it runs away
    letFishGo(){
        if (!this.hook.hasFish()) return; // if nothing on hook, nothing happens
        
        if (this.hook.y <= HOOK_TOP_CLAMP + 30 || this.hook.fish.size == fishSize.BIGGEST) {
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
                        this.endGame(true);
                    },
                    callbackScope: this,
                    loop: false
                });           
        }
    }

    // attaches fish to the hook if no current fish on the hook
    overlayHookFish(hook, fish) {
        if (lureLeft <= 0) {
            // ford: i miscalculated our abilities - should've ripped it into more pieces
            // stan: told ya they'd be a great hit
            // ford: we're throwing paper into the ocean stanley
            sceneMainInst.endGame(false);
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

    // goes to ending scene after a delay
    endGame(isWin) {
        this.time.addEvent({
            delay: BIG_SPAWN_TIME,
            callback: function() {
                if (isWin) {
                    this.scene.start("SceneGameWin");
                } else {
                    this.scene.start("SceneGameLose");
                }
            },
            callbackScope: this,
            loop: false
        });
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
    
    spawnSmall() {
        this.addRecurringTimeEvent(SMALL_SPAWN_TIME,
            function() {
                var fish = new SmallFish(this);
                this.fishes.add(fish);
            })
    }

    spawnMed() {
        this.addRecurringTimeEvent(MEDIUM_SPAWN_TIME, 
            function() {
                var fish = new MediumFish(this);
                this.fishes.add(fish);
            }
        )
    }

    spawnBig() {
        this.addRecurringTimeEvent(BIG_SPAWN_TIME, 
            function() {
                var fish = new BigFish(this);
                this.fishes.add(fish);
        })
    }

    generateDebris() {
        this.addRecurringTimeEvent(BIG_SPAWN_TIME, function() {
            var debris = new Debris(this);
            this.debrises.add(debris);
        })
    }
 
    // starts the gabblewunker chasing
    generateGabble() {
        this.addRecurringTimeEvent(10000, function() {
            var gabble = new GabbleWinker(this, this.gabbleDirection);
            this.gabbleDirection = !this.gabbleDirection; // flip the man!
            this.gabbles.add(gabble);
        })
    }

    // starts the tentacle grabbing
    generateTentacles() {
        this.addRecurringTimeEvent(10500, function() {
            var tent = new Tentacle(this, !this.gabbleDirection);
            this.tentacles.add(tent);
        })
    }

    // adds more fish variety && obstacles
    increasDifficulty() {
        switch (this.level) {
            case 0:
                this.threshhold = t2;
                this.spawnMed();
                this.generateDebris();   
                break;
            case 1:
                this.threshhold = t3;
                this.destroyEvents();
                console.log("SEND IN MCGUCKET");

                setTimeout(()=> {
                    this.spawnSmall();
                    this.spawnMed();
                    this.spawnBig();
                    this.generateGabble();   
                    this.generateDebris(); 
                }, TRANSITION_TIME);
                break;
            case 2:
                this.threshhold = t4;
                this.destroyEvents();
                console.log("The tentacles are coming!");
                
                setTimeout(()=> {
                    this.spawnSmall();
                    this.spawnMed();
                    this.spawnBig();
                    this.generateGabble();  
                    this.generateDebris();  
                }, TRANSITION_TIME);
                this.generateTentacles();
                break;
            case 3:
                this.threshhold = tf;
                this.destroyEvents();
                console.log("durland happens");

                setTimeout(()=> {
                    this.spawnSmall();
                    this.spawnMed();
                    this.spawnBig();
                }, TRANSITION_TIME);

                setTimeout(()=> {
                    this.destroyEvents();
                }, TRANSITION_TIME * 2);

                setTimeout(()=> {
                    var fish = new BiggestFish(this);
                    this.fishes.add(fish);
                }, TRANSITION_TIME * 3);
        } // switch
        this.level++;
    }

    destroyEvents() {
        console.log(this.activeEvents.length);
        
        for (var i = 0; i < this.activeEvents.length; i++) {
            console.log(this.activeEvents[i]);
            console.log(this.activeEvents[i]);
            this.activeEvents[i].destroy();
        }
    }
}

