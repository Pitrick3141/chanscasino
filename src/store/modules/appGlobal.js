// noinspection JSUnresolvedReference

import {API, graphqlOperation} from "aws-amplify";
import {createUserInfo as createUserInfoMutation} from "../../graphql/mutations.js";
import {getUserInfo as getUserInfoQuery} from "../../graphql/queries.js";
import {updateUserInfo as updateUserInfoMutation} from "../../graphql/mutations.js";
import {toRaw} from "vue";

export default {
    namespaced: true,
    state() {
        return {
            translations: {
                "side_menu_1":["Instructions", "教程"],
                "side_menu_1_group_1": ["Game Rules", "游戏玩法"],
                "side_menu_1_group_1_item_1": ["How to Play", "游戏规则"],
                "side_menu_1_group_1_item_2": ["How to Score", "得分规则"],
                "side_menu_1_group_2": ["Others", "其他教程"],
                "side_menu_1_group_2_item_1": ["How to View Statistics", "如何查看统计数据"],
                "side_menu_2": ["Info & Records", "信息及记录"],
                "side_menu_3": ["Statistics & Rankings", "统计数据及排行榜"],
                "side_menu_4": ["About", "关于"],
                "side_menu_5": ["Language/语言", "语言/Language"],
                "side_menu_5_English": ["English", "English"],
                "side_menu_5_Chinese": ["简体中文", "简体中文"],
                "side_menu_6": ["Home", "主页"],
                "poker_picker_restart_button": ["Restart Game", "重新开始游戏"],
                "poker_picker_loading_info": ["Please press Restart Game to Restart", "请点击重新开始游戏按钮"],
                "poker_picker_message_1": ["Congratulations! You Have Selected The Correct Poker!", "恭喜！你选中了正确的扑克！"],
                "poker_picker_message_2": ["You Have Selected The Correct Type But Wrong Value", "你选中了正确的花色但是错误的点数"],
                "poker_picker_message_3": ["You Have Selected The Correct Value But Wrong Type", "你选中了正确的点数但是错误的花色"],
                "poker_picker_message_4": ["You Have Neither Selected The Correct Type and Correct Value", "你既没有选中正确的点数也没有选中正确的花色"],
                "poker_picker_display_correct_poker": ["Correct Poker: ", "正确的扑克："],
                "poker_picker_display_your_choice": ["Your Choice: ", "你的选择："],
                "tutorials_classic_game_title": ["Game Instructions", "游戏规则"],
                "tutorials_classic_game_link": ["Try It Now 》", "开一把试试 》"],
                "tutorials_classic_game_content": [
                    "Choose a card from a standard deck and compare it with a randomly determined card.",
                    "从牌堆中选择一张扑克牌并与提前随机选择的扑克牌相比较."
                ],
                "tutorials_extra_game_title": ["Pay-ins and Pay-outs", "得分规则"],
                "tutorials_extra_game_link": ["Try It Now 》", "开一把试试 》"],
                "tutorials_extra_game_content_1": [
                    "Entry Fee: 10 Chanidian Dollars",
                    "入场费：10陈元"
                ],
                "tutorials_extra_game_content_2": [
                    "If your choice is identical to the randomly generated poker: You WIN 100 Chanidian Dollars",
                    "如果你的选择与随机生成的扑克完全相同：你获得100陈元的奖励"
                ],
                "tutorials_extra_game_content_3": [
                    "If your choice has the same value as the randomly generated poker: You WIN 50 Chanidian Dollars",
                    "如果你的选择与随机生成的扑克点数相同：你获得50陈元的奖励"
                ],
                "tutorials_extra_game_content_4": [
                    "If your choice has the same type as the randomly generated poker: You WIN 20 Chanidian Dollars",
                    "如果你的选择与随机生成的扑克花色相同：你获得20陈元的奖励"
                ],
                "tutorials_extra_game_content_5": [
                    "If your choice is totally different from the randomly generated poker: You WIN Nothing",
                    "如果你的选择与随机生成的扑克完全不同：你什么也没得到"
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
                "signup_success_message": ["Signup successfully. Welcome!", "注册成功，欢迎!"],
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
                },
                "user_info_username": ["Current User: ", "当前登录的用户: "],
                "user_info_not_exist": ["Your Info does not exist in database", "您的信息在数据库中不存在"],
                "current_balance": ["Your Current Balance: ", "您当前的余额: "],
                "highest_balance": ["Your History Highest Balance: ", "您的历史最高余额: "],
                "game_played": ["Total Game Played: ", "总计进行的游戏场数: :"],
                "info_user_info": ["User Info", "用户信息"],
                "info_username": ["Username", "用户名"],
                "info_email": ["Email", "电子邮件"],
                "info_id": ["User ID", "用户ID"],
                "info_email_verified": ["Email Verification", "电子邮件验证"],
                "info_game_records": ["Game Records", "游戏记录"],
                "info_time": ["Time", "时间"],
                "info_correct_poker": ["Correct Poker", "正确的扑克"],
                "info_selected_poker": ["Selected Poker", "选择的扑克"],
                "info_description": ["Description", "说明"],
                "info_balance_change": ["Balance Change", "余额变化"],
                "info_new_balance": ["New Balance", "新余额"],
                "balance_change_display": [
                    ["Entry Fee", "开始游戏费用"],
                    ["Win First Prize: Same Poker", "获得一等奖：完全相同"],
                    ["Win Second Prize: Same Value", "获得二等奖：相同的点数"],
                    ["Win Third Prize: Same Colour", "获得三等奖：相同的花色"],
                    ["Win Nothing", "什么也没有获得"],
                ],
                "info_danger_operation":["Danger Operation", "危险操作"],
                "info_show": ["Show", "显示"],
                "info_hide": ["Hide", "隐藏"],
                "info_clear_data": ["Clear User Data", "清除用户数据"],
                "info_clear_confirm": ["Are you sure to clear all user data?", "你确定要清除全部用户数据吗？"],
                "info_clear_cancel": ["Cancel", "取消"],
                "info_clear_clear": ["Clear", "清除"],
                "info_clear_success": ["All user data cleared", "所有用户信息已清除"],
                "info_not_login": ["User Info is unavailable without login", "未登录时用户信息不可用"],
                "info_not_login_record": ["Game Records will be lost upon page refresh without login", "未登录时游戏记录将在页面刷新时丢失"],
                "about_title": ["About", "关于"],
                "about_content": [
                    "This is an online mini game based on Vue3+Vite as frontend, AWS Amplify as hosting, AWS Cognito as authentication, AWS AppSync and DynamoDB as data interface. Developed by Yichen Wang as my Grade 12 Data Management ISP in 2023.",
                    "这是一个前端基于Vue3+Vite，托管于AWS Amplify，使用AWS Cognito进行用户验证，使用AWS AppSync和DynamoDB进行数据接口的在线迷你游戏。由Yichen Wang在2023年作为12年级数据管理课的ISP开发。"
                ],
                "website_title": ["Chan's Casino", "老陈大赌场"],
                "login_title": ["Log In", "登录"],
                "signup_title": ["Sign Up", "注册"],
                "statistics_rankings": ["Rankings", "排行榜"],
                "statistics_last_update": ["Statistics/Rankings Last Updated: ", "统计数据/排行榜上次更新: "],
                "statistics_last_update_ago": ["Ago", "前"],
                "statistics_last_update_hours": ["Hour(s)", "时"],
                "statistics_last_update_minutes": ["Minute(s)", "分"],
                "statistics_last_update_seconds": ["Second(s)", "秒"],
                "statistics_rankings_id": ["User Name", "用户名"],
                "statistics_rankings_highest_balance": ["History Highest Balance", "历史最高余额"],
                "statistics_rankings_balance": ["Current Balance", "当前余额"],
                "statistics_statistics": ["Statistics (Shared By All Players)", "统计数据 (所有玩家共用)"],
                "statistics_game_played": ["Total Game Played", "游戏进行的总次数"],
                "statistics_same_poker": ["Total Same Poker Selected", "选择相同扑克的总次数"],
                "statistics_same_value": ["Total Same Value Selected", "选择相同点数的总次数"],
                "statistics_same_color": ["Total Same Color Selected", "选择相同花色的总次数"],
                "statistics_different": ["Total Different Poker Selected", "选择不同扑克的总次数"],
                "statistics_cost": ["Players' Total Cost", "玩家的总计游戏成本"],
                "statistics_gains": ["Players' Total Gains", "玩家的总计游戏回报"],
                "statistics_profit": ["Chan's Profit", "老陈的利润"],
                "game_records_auto_save": ["Your Game Records have been auto-saved", "您的游戏记录已自动保存"],
                "create_user_start": ["Creating User... Please Wait", "正在为您创建用户，请稍后..."],
                "create_user_done": ["User Created Successfully. Redirecting to the home page...", "成功创建用户，正在跳转到首页..."],

            },
            language: 0,
            userInfo: {
                balance: 100,
                highestBalance: 100,
                gamePlayed: 0,
                samePokerCnt: 0,
                sameValueCnt: 0,
                sameColorCnt: 0,
                differentCnt: 0,
                gameRecords: JSON.stringify([]),
                isEntryPaid: false,
            },
            gameRecords: [],
            gameRates: {
                "entry_fee": 10,
                "same_poker_reward": 100,
                "same_value_reward": 50,
                "same_color_reward": 20,
                "different_reward": 0,
            },
        }
    },
    mutations: {
        changeGlobalLanguage(state, lang){
            state.language = lang;
        },
        changeCurrentBalance(state, val){
            state.userInfo.balance = val;
            if(state.userInfo.balance > state.userInfo.highestBalance){
                state.userInfo.highestBalance = state.userInfo.balance;
            }
        },
        spendBalance(state, val){
            state.userInfo.isEntryPaid = true;
            state.userInfo.balance -= val;
        },
        earnBalance(state, val){
            state.userInfo.isEntryPaid = false;
            state.userInfo.balance += val;
            if(state.userInfo.balance > state.userInfo.highestBalance){
                state.userInfo.highestBalance = state.userInfo.balance;
            }
        },
        recordGame(state, result){
            state.gameRecords.push(result);
            if(result.gameResult === "Entry Fee"){
                state.userInfo.gamePlayed += 1;
            }
            else if(result.gameResult === "Win Nothing"){
                state.userInfo.differentCnt += 1;
            }
            else if(result.gameResult === "Win Third Prize: Same Colour"){
                state.userInfo.sameColorCnt += 1;
            }
            else if(result.gameResult === "Win Second Prize: Same Value"){
                state.userInfo.sameValueCnt += 1;
            }
            else if(result.gameResult === "Win First Prize: Same Poker"){
                state.userInfo.samePokerCnt += 1;
            }

            state.userInfo.gameRecords = JSON.stringify(state.gameRecords);
            console.log("[INFO] Current Game Records: ", toRaw(state.gameRecords));
            console.log("[INFO] Current User Info: ", toRaw(state.userInfo));
        },
        setUserInfo(state, payload){
            state.userInfo.balance = payload.balance;
            state.userInfo.highestBalance = payload.highestBalance;
            state.userInfo.gamePlayed = payload.gamePlayed;
            state.userInfo.samePokerCnt = payload.samePokerCnt;
            state.userInfo.sameValueCnt = payload.sameValueCnt;
            state.userInfo.sameColorCnt = payload.sameColorCnt;
            state.userInfo.differentCnt = payload.differentCnt;
            state.userInfo.gameRecords = payload.gameRecords;
            state.gameRecords = JSON.parse(payload.gameRecords);
            state.userInfo.isEntryPaid = payload.isEntryPaid;
            state.language = payload.language;
        }
    },
    actions: {
        updateGlobalLanguage(context, lang) {
            context.commit("changeGlobalLanguage", lang);
            console.log("[INFO] language changed: " + lang.toString());
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
                const info = await API.graphql(graphqlOperation(createUserInfoMutation, {input: newUserInfo}));
                console.log("[INFO] User Created in backend: ", info.data.createUserInfo);
            }
            catch(error){
                console.log("[Error] Error occurred at createUserInfo: ", error, "with given newUserInfo: ", newUserInfo);
            }
        },
        async getUserInfo(_, userId){
            const info = await API.graphql(graphqlOperation(getUserInfoQuery, {id: userId}))
            console.log("[INFO] User Info fetched from backend: ", info.data.getUserInfo);
            return info.data.getUserInfo;
        },
        async setUserInfo({commit}, info){
            console.log("[INFO] User Info is applied to local: ", info);
            commit("setUserInfo", info);
        },
        async updateUserInfo(_, userInfo){
            try{
                const info = await API.graphql(graphqlOperation(updateUserInfoMutation, {input: userInfo}));
                console.log("[INFO] User Updated in backend: ", info.data.updateUserInfo);
            }
            catch(error){
                console.log("[ERROR] Error occurred at updateUserInfo: ", error, "with given userInfo", userInfo);
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
        },
        gameRates(state){
            return state.gameRates;
        }
    }
}