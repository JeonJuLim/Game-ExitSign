import { _decorator, Component, Animation, Vec2, systemEvent, SystemEvent, KeyCode, EventKeyboard } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property
    speed: number = 100;

    private anim: Animation = null;
    private isMoving: boolean = false;
    private moveDirection: Vec2 = new Vec2(0, 0);

    start() {
        this.anim = this.getComponent(Animation);
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                this.moveDirection.x = -1;
                break;
            case KeyCode.ARROW_RIGHT:
                this.moveDirection.x = 1;
                break;
            case KeyCode.ARROW_UP:
                this.moveDirection.y = 1;
                break;
            case KeyCode.ARROW_DOWN:
                this.moveDirection.y = -1;
                break;
        }

        if (!this.isMoving && (this.moveDirection.x !== 0 || this.moveDirection.y !== 0)) {
            this.isMoving = true;
            this.anim.play('RunAnim');
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                if (this.moveDirection.x === -1) this.moveDirection.x = 0;
                break;
            case KeyCode.ARROW_RIGHT:
                if (this.moveDirection.x === 1) this.moveDirection.x = 0;
                break;
            case KeyCode.ARROW_UP:
                if (this.moveDirection.y === 1) this.moveDirection.y = 0;
                break;
            case KeyCode.ARROW_DOWN:
                if (this.moveDirection.y === -1) this.moveDirection.y = 0;
                break;
        }

        if (this.isMoving && this.moveDirection.x === 0 && this.moveDirection.y === 0) {
            this.isMoving = false;
            this.anim.stop();
        }
    }

    update(deltaTime: number) {
        if (this.moveDirection.x === 0 && this.moveDirection.y === 0) return;

        let pos = this.node.position;
        let move = new Vec2(this.moveDirection.x, this.moveDirection.y);

        move.multiplyScalar(this.speed * deltaTime);
        this.node.setPosition(pos.x + move.x, pos.y + move.y);
    }
}