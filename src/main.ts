import {createApp, ref} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./assets/tailwind.css"
import {Amplify} from "aws-amplify";
import AmplifyVue from '@aws-amplify/ui-vue';

// @ts-ignore
import aws_exports from "./aws-exports";
// @ts-ignore
import store from './store'

Amplify.configure(aws_exports);

const app = createApp(App).use(store)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

const globalTranslationDictionary = {
    "side_menu_1":["Instructions", "教程"],
    "side_menu_1_group_1": ["Game Rules", "游戏玩法"],
    "side_menu_1_group_1_item_1": ["Classic Game", "经典模式"],
    "side_menu_1_group_1_item_2": ["Extra Game", "进阶模式"],
    "side_menu_1_group_2": ["Others", "其他教程"],
    "side_menu_1_group_2_item_1": ["How to View Statistics", "如何查看统计数据"],
    "side_menu_2": ["Settings", "设置"],
    "side_menu_3": ["Statics", "统计数据"],
    "side_menu_4": ["About", "关于"],
    "side_menu_5": ["Language/语言", "语言/Language"],
    "side_menu_5_English": ["English", "English"],
    "side_menu_5_Chinese": ["简体中文", "简体中文"],
    "poker_picker_restart_button": ["Restart Game", "重新开始游戏"],
    "poker_picker_loading_info": ["You have already selected, press Restart Game to Restart", "你已经做出选择，请点击重新开始游戏按钮"],
    "poker_picker_message_1": ["Congratulations! You Have Selected The Correct Poker!", "恭喜！你选中了正确的扑克！"],
    "poker_picker_message_2": ["You Have Selected The Correct Type But Wrong Value", "你选中了正确的花色但是错误的点数"],
    "poker_picker_message_3": ["You Have Selected The Correct Value But Wrong Type", "你选中了正确的点数但是错误的花色"],
    "poker_picker_message_4": ["You Have Neither Selected The Correct Type and Correct Value", "你既没有选中正确的点数也没有选中正确的花色"],
    "poker_picker_display_correct_poker": ["Correct Poker: ", "正确的扑克："],
    "poker_picker_display_your_choice": ["Your Choice: ", "你的选择："],
    "tutorials_classic_game_title": ["Classic Game Instructions", "经典模式教程"],
    "tutorials_classic_game_link": ["Try Regular Game 》", "开始一场经典模式 》"],
    "tutorials_classic_game_content": [
        "Choose a card from a standard deck and compare it with a randomly determined card.",
        "从牌堆中选择一张扑克牌并与提前随机选择的扑克牌相比较."
    ],
    "tutorials_extra_game_title": ["Extra Game Instructions", "进阶模式教程"],
    "tutorials_extra_game_link": ["Try Extra Game 》", "开始一场进阶模式 》"],
    "tutorials_extra_game_content": [
        "Choose a card from a standard deck and compare it with a randomly determined card.",
        "从牌堆中选择一张扑克牌并与提前随机选择的扑克牌相比较."
    ],
    "tutorials_view_statistics_title": ["How to View Statistics", "如何查看统计数据"],
    "tutorials_view_statistics_link": ["View Statistics 》", "查看统计数据 》"],
    "tutorials_view_statistics_content": [
        "Click Statistics button from side menu",
        "在侧面菜单中点击统计数据按钮"
    ],
    "change_language_message": ["Language set to English", "已将语言设置为简体中文"],
    "announcements": [
        ["First Online Casino in Canada is now online!",
            "Handsome dealer Mr. Chan is dealing online",
            "Feel the charm of Data Management!",
            "You can withdraw $0.00000000 everyday!",
            "Whose ISP project is this?",
            "There are also rankings for you to explore!"],
        ["加拿带首家线上赌场上线啦！",
            "帅哥荷官老陈在线发牌！",
            "感受数据管理的魅力！",
            "每日可以提现$0.00000000！",
            "这究竟是谁的ISP?",
            "更有牛马小榜单等你占领！",]
    ],
    "under_construction": ["Too bad that this part is still under construction!", "前面的区域，以后再来探索吧？"],
    "nav_bar_welcome": ["Welcome", "欢迎"],
    "nav_bar_login": ["Login", "登录"],
    "nav_bar_signup": ["Signup", "注册"],
    "nav_bar_logout": ["Logout", "登出"],
}

app.provide("translation", globalTranslationDictionary);
app.config.globalProperties.translation = globalTranslationDictionary;
app.config.globalProperties.language = ref(0);
app.use(AmplifyVue);
app.use(router).mount('#app');
