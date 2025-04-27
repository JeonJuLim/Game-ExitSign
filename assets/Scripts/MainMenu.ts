import { _decorator, Component, director } from 'cc';
const { ccclass } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    // Hàm này sẽ được gọi khi bấm nút Play
    onPlayButtonClick() {
        director.loadScene('LevelTry'); // Thay 'Level1' đúng tên scene của bạn
    }
}

