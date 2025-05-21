import { _decorator, Component, Button, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HowToPlayController')
export class HowToPlayController extends Component {
    @property(Button)
    btnBack: Button = null!;  // Nút Back

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // Kiểm tra xem nút btnBack có được gán đúng chưa
        if (this.btnBack) {
            // Gán sự kiện click cho nút Back
            this.btnBack.node.on('click', this.onBackButtonClick, this);
        } else {
            console.error('btnBack không được gán đúng!');
        }
    }

    // Hàm này sẽ được gọi khi bấm nút Back
    onBackButtonClick() {
        console.log('Back button clicked!');  // Thêm log để kiểm tra sự kiện

        // Đảm bảo rằng bạn đã thêm MainMenu vào Build Settings
        director.loadScene('MainMenu');  // Chuyển về scene MainMenu
    }
}
