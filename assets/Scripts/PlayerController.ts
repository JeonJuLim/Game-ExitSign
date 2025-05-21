import { _decorator, Component, Animation, Vec2, input, Input, KeyCode, EventKeyboard, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property
    speed: number = 100;

    @property
    jumpForce: number = 300;

    private anim: Animation = null;
    private rigidBody: RigidBody2D = null;
    private isMoving: boolean = false;
    private isJumping: boolean = false;
    private moveDirection: Vec2 = new Vec2(0, 0);

    start() {
        this.anim = this.getComponent(Animation);
        this.rigidBody = this.getComponent(RigidBody2D);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
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
            case KeyCode.SPACE:
                if (!this.isJumping) {
                    this.isJumping = true;
                    this.rigidBody.applyForceToCenter(new Vec2(0, this.jumpForce), true);
                    this.anim.play('Jump');
                }
                break;
        }

        if (!this.isMoving && (this.moveDirection.x !== 0 || this.moveDirection.y !== 0)) {
            this.isMoving = true;
            if (!this.isJumping) {
                this.anim.play('RunAnim');
            }
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
            if (!this.isJumping) {
                this.anim.stop();
            }
        }
    }

    update(deltaTime: number) {
        if (this.moveDirection.x === 0 && this.moveDirection.y === 0 && !this.isJumping) return;

        let pos = this.node.position;
        let move = new Vec2(this.moveDirection.x, this.moveDirection.y);

        move.multiplyScalar(this.speed * deltaTime);
        this.node.setPosition(pos.x + move.x, pos.y + move.y);

        // Kiểm tra nếu nhân vật chạm đất (dựa vào vận tốc dọc của RigidBody)
        if (this.isJumping && this.rigidBody.linearVelocity.y === 0) {
            this.isJumping = false;
            this.anim.stop();
            if (this.moveDirection.x !== 0 || this.moveDirection.y !== 0) {
                this.isMoving = true;
                this.anim.play('RunAnim');
            }
        }
    }
}