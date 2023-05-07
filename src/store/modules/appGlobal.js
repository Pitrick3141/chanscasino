import {API, graphqlOperation} from "aws-amplify";
import {createUserInfo as createUserInfoMutation} from "../../graphql/mutations.js";
import {getUserInfo as getUserInfoQuery} from "../../graphql/queries.js";
import {updateUserInfo as updateUserInfoMutation} from "../../graphql/mutations.js";
import {createGameRecord as createGameRecordMutation} from "../../graphql/mutations.js";

export default {
    namespaced: true,
    state() {
        return {
            translations: {
                "side_menu_1":["Instructions", "教程"],
                "side_menu_1_group_1": ["Game Rules", "游戏玩法"],
                "side_menu_1_group_1_item_1": ["Classic Game", "经典模式"],
                "side_menu_1_group_1_item_2": ["Extra Game", "进阶模式"],
                "side_menu_1_group_2": ["Others", "其他教程"],
                "side_menu_1_group_2_item_1": ["How to View Statistics", "如何查看统计数据"],
                "side_menu_2": ["User Info", "用户信息"],
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
                "auth_username": ["User Name", "用户名"],
                "auth_password": ["Password", "密码"],
                "auth_email": ["Email", "邮箱"],
                "auth_code": ["Confirm Code", "验证码"],
                "auth_login": ["Log In", "登录"],
                "auth_signup": ["Sign Up", "注册"],
                "auth_confirm_signup": ["Confirm Sign Up", "确认注册"],
                "auth_confirm_message": ["Please check your email and enter your confirm code", "请检查你的注册邮箱并输入验证码"],
                "signup_success_message": ["Signup successfully, now please confirm your email address", "注册成功，请验证您的邮箱地址"],
                "confirm_signup_success_message": ["Email address confirmed successfully", "邮箱地址验证成功"],
                "login_success_message": ["Welcome back", "欢迎回来"],
                "logout_success_message": ["Goodbye", "再见"],
                "play_as_tourist": ["Currently playing as tourist", "当前正在以游客身份游玩"],
                "win_prize_message": ["You have won", "你赢得了"],
                "chanidian_dollar": ["Chanidian Dollar", "陈元"],
                "not_enough_balance": ["Your balance is not enough to start another game", "您的余额不足，无法开启新的游戏"],
                "error_messages": {
                    "User does not exist.": ["The username you entered does not exist", "你输入的用户名不存在"],
                    "Incorrect username or password.": ["The username and password you entered do not match", "您输入的用户名和密码不匹配"],
                    "enter_password": ["Please enter your password", "请输入密码"],
                    "enter_username": ["Please enter your username", "请输入用户名"],
                    "enter_email": ["Please enter your email", "请输入电子邮件"],
                    "enter_code": ["Please enter your confirmation code", "请输入验证码"],
                    "Password did not conform with policy: Password not long enough": ["Your password has to be more than 8 digits", "您的密码长度必须大于或等于8位"],
                    "User already exists": ["You have already signed up, please log in", "您已经注册过了，请您登录"],
                    "User is not confirmed.": ["You have not confirmed your email yet", "您还没有验证您的电子邮件"],
                },
                "user_info_username": ["Current User: ", "当前登录的用户: "],
                "user_info_not_exist": ["Your Info does not exist in database", "您的信息在数据库中不存在"],
                "current_balance": ["Your Current Balance: ", "您当前的余额: "],
                "highest_balance": ["Your History Highest Balance: ", "您的历史最高余额: "],
                "game_played": ["Total Game Played: ", "总计进行的游戏场数: :"],

            },
            language: 0,
            userInfo: {
                currentBalance: 100,
                highestBalance: 100,
                gamePlayed: 10,
                gameRecords: [],
            }
        }
    },
    mutations: {
        changeGlobalLanguage(state, lang){
            state.language = lang;
        },
        changeCurrentBalance(state, val){
            state.userInfo.currentBalance = val;
            if(state.userInfo.currentBalance > state.userInfo.highestBalance){
                state.userInfo.highestBalance = state.userInfo.currentBalance;
            }
        },
        spendBalance(state, val){
            state.userInfo.currentBalance -= val;
        },
        earnBalance(state, val){
            state.userInfo.currentBalance += val;
            if(state.userInfo.currentBalance > state.userInfo.highestBalance){
                state.userInfo.highestBalance = state.userInfo.currentBalance;
            }
        },
        recordGame(state, result){
            state.userInfo.gameRecords.push(result);
            console.log(state.userInfo.gameRecords);
        },
        setUserInfo(state, payload){
            state.userInfo = payload;
        }
    },
    actions: {
        updateGlobalLanguage(context, lang) {
            context.commit("changeGlobalLanguage", lang);
            console.log("language changed: " + lang.toString());
        },
        playGame(context, cost){
            context.commit("spendBalance", cost);
        },
        winGame(context, prize){
            context.commit("earnBalance", prize);
        },
        recordGame(context, result) {
            context.commit("recordGame", result);
        },
        async createUserInfo(_, newUserInfo){
            try{
                await API.graphql(graphqlOperation(createUserInfoMutation, {input: newUserInfo}));
            }
            catch(error){
                console.log("createUserInfo", error);
            }

        },
        async getUserInfo({commit}, userId){
            return API.graphql(graphqlOperation(getUserInfoQuery, {id: userId}));
        },
        async setUserInfo({commit}, info){
            console.log(info);
            commit("setUserInfo", info);
        },
        async updateUserInfo(_, userInfo){
            try{
                await API.graphql(graphqlOperation(updateUserInfoMutation, {input: userInfo}));
            }
            catch(error){
                console.log("updateUserInfo", error);
            }

        },
        async createGameRecord(_, newGameRecord){
            try{
                const record = await API.graphql(graphqlOperation(createGameRecordMutation, {input: newGameRecord}));
                console.log(record);
            }
            catch(error){
                console.log("createGameRecord", error);
            }

        },
    },
    getters: {
        language(state) {
            return state.language;
        },
        translation(state) {
            return state.translations;
        },
        userInfo(state){
            return state.userInfo;
        }
    }
}