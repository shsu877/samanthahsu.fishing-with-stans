class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this); // add to scene
        this.scene.physics.world.enableBody(this, 0); // instantiate to rendering queue
        this.setData("type", type);
        this.setData("isDead", false);
    }
}

const HOOK_TOP_CLAMP = -150;
const HOOK_BOT_CLAMP = 230;

class Hook extends Entity {
    constructor(scene)
    {
        super(scene, 320, 240, 'hook');
        this.setImmovable();
        this.setCircle(10, -5, 460);

        this.fish = null;

        scene.input.on('pointermove', function(pointer) {
            this.y = Phaser.Math.Clamp(pointer.y - 230, HOOK_TOP_CLAMP, HOOK_BOT_CLAMP);
            if (this.hasFish())
                this.setFishY();
        }, this);
        scene.input.on('pointerdown', function(pointer) 
        {
            scene.letFishGo();  
        }, this);  
            }

    // returns true if there is fish on hook
    hasFish() {
        return this.fish != null;
    }

    setFishY() { this.fish.y = Phaser.Math.Clamp(this.y + 250, -50, 500);}

    addFish(fish) {
        this.fish = fish;
        this.fish.setVelocity(0);
        this.fish.x = 320;
        this.setFishY(fish);
        this.fish.setRotation(-Math.PI/2);
    }

    removeFish(mode) {
        switch (mode) {
            case removeFishMode.CAUGHT:
                this.fish.destroy();
                lureLeft--;
                break;
            case removeFishMode.MATRYOSHKA:
                this.fish.destroy();
                break;
            case removeFishMode.ESCAPE:
                this.fish.flee(); 
                lureLeft--;
        }
        this.fish = null;
        this.scene.lureText.setText(LURE_TEXT + lureLeft); 
    }
}


// makes random debris appear
class Debris extends Entity {
    constructor(scene) {
        var x = Phaser.Math.Between(680, 700);
        var y = Phaser.Math.Between(200, 470);

        var texture;
        switch(Phaser.Math.Between(0, 2)) {
            case 0:
                texture = 'banjo-polish'
                break;
            case 1:
                texture = 'melodica'
                break;
            case 2:
                texture = 'tuba'    
        }

        super(scene, x, y, texture);
        var speed = 50;
        this.setVelocity(-speed, 0);
        this.setScale(0.5);
        this.setRotation(Phaser.Math.Between(0, Math.PI/2));
        this.setDepth(1);
    }

    update() {
        if (this.x < -150) {
            this.destroy();
        }
    }
}

class GabbleWinker extends Entity {

    constructor(scene, isLeft) {
        var x;
        var y;
        var speed;
        if (isLeft) {
            x = -300;
        } else {
            x = 640 + 300;
        }
        var y = Phaser.Math.Between(200, 470);
        super(scene, x, y, 'gobble');
        
        if (isLeft) {
            speed = 150;
            this.setCircle(60, 520, 40);
            this.setFlip(isLeft);
        } else {
            speed = -150;
            this.setCircle(60, -20, 40);
        }
        this.setVelocity(speed, 0);
    }

    update() {
        if (this.x < -300 || this.x > 300 + 640) {
            this.destroy();
        }
    }
}

const TENT_Y = 150;
const TENT_V = 50;
const TENT_LMAX = 160;
const TENT_RMAX = 500;
const TENT_VAR = 20;
class Tentacle extends Entity {

    constructor(scene, isLeft) {
        if (isLeft) {
            super(scene, 0, TENT_Y, 'tentacle');
            this.setVelocityX(TENT_V);
        } else {
            super(scene, 640, TENT_Y, 'tentacle');
            this.setVelocityX(-TENT_V);
            this.setFlip(true);
        }
        this.isLeft = isLeft;
        this.scene = scene;
    }

    update(hook) { 
        if (this.isLeft) {
            if ( hook.hasFish() && this.x >= TENT_LMAX - TENT_VAR &&
                hook.y >= HOOK_TOP_CLAMP + TENT_VAR)
                hook.removeFish(removeFishMode.MATRYOSHKA);
            if (this.x >= TENT_LMAX) {
                this.setVelocityX(-TENT_V);
            }
        } else {
            if (hook.hasFish() && this.x <= TENT_RMAX + TENT_VAR && hook.y >= HOOK_TOP_CLAMP + TENT_VAR)
                hook.removeFish(removeFishMode.MATRYOSHKA);
            if (this.x <= TENT_RMAX)
                this.setVelocityX(TENT_V);
        }

        if (this.x < -300 || this.x > 200 + 640) {
            this.destroy();
        }
    }
}
