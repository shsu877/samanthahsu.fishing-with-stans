
class SceneMain extends Phaser.Scene {

    constructor() {
      super({ key: "SceneMain"});
    }
      
    preload ()
    {     
        this.load.image('bg', 'assets/bg.png');
        this.load.image('hook', 'assets/fishing-line.png');
        this.load.image('blank', 'assets/hook-fish-hitbox.png')
    
        this.load.image('big', 'assets/big-fish.png');
        this.load.image('medium', 'assets/med-fish.png');
        this.load.image('small', 'assets/small-fish.png');
        
        this.score = 0;
        this.scoreText;
        this.hook;
        this.fishes = this.add.group();
        this.debris = this.add.group();

        // SPAWN THE FISHES!!!
        this.time.addEvent( {
            delay: 1000,
            callback: function() {
                var fish = new Fish(this, 'small');
                this.fishes.add(fish);
            },
            callbackScope: this,
            loop: true
        });
    }
    
    
    create ()
    {
        // add background image
        this.add.image(0, 0, 'bg').setOrigin(0,0);
    
        // HOOK
        this.hook = new Hook(this);

        this.physics.add.overlap(this.hook, this.fishes, this.hookFish);

        // SCORE
        this.scoreText = this.add.text(16, 16, 'fishes: 0', { fontSize: '16px', fill: '#000'});
    }
    
    update ()
    {
        // console.log(this.hook.y)
    }

    // lets the fish off the hook, it within range of catching, add to score, otherwise it runs away
    letFishGo(){
        if (!this.hook.hasFish()) return; // if nothing on hook, nothing happens
        
        if (this.hook.y <= -45) {
            this.score += 1; // gives more fishes for bigger fish
            this.scoreText.setText('fishes: ' + this.score);
            this.hook.removeFish(true);
        } else {
            this.hook.removeFish();
        }
    }

    // attaches fish to the hook if no current fish on the hook
    hookFish(hook, fish) {
        if (!hook.hasFish())
            hook.addFish(fish);
    }
}

