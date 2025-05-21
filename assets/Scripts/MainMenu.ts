import { _decorator, Component, Button, director, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    @property(Button)
    btnStart: Button = null!;  

    @property(Button)
    btnHowToPlay: Button = null!; 

    @property(Button)
    btnExit: Button = null!; 

    @property(Button)
    btnCup: Button = null!; 

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.btnStart.node.on('click', this.onStartButtonClick, this);
        this.btnHowToPlay.node.on('click', this.onHowToPlayButtonClick, this);
        this.btnExit.node.on('click', this.onExitButtonClick, this);
        this.btnCup.node.on('click', this.onCupButtonClick, this);
    }

    
    onStartButtonClick() {
        director.loadScene('LevelTry'); 
    }

    
    onHowToPlayButtonClick() {
        director.loadScene('HowToPlay'); 
    }

    // Hàm này sẽ được gọi khi bấm nút Exit
    onExitButtonClick() {
        game.end();  // Thoát game
    }

    // Hàm này sẽ được gọi khi bấm nút Cup (ví dụ, bạn có thể làm gì đó với nó)
    onCupButtonClick() {
        console.log("Cup Button Clicked!");  // Ví dụ, in ra một thông báo trong console
        // Bạn có thể thay thế phần này bằng hành động tương ứng với nút Cup
    }
}
