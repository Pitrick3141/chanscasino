<!--suppress TypeScriptValidateTypes -->
<template>
    <el-alert v-if="user==null&&isSelected" :title="translations['info_not_login_record'][language]" type="error" />
    <div class="container flex-col">
        <el-text class="">
            <el-icon><money /></el-icon>
            {{translations["current_balance"][language] + currentBalanceDisplay}}
        </el-text>
        <el-text :type="balanceChangeType" tag="b">
            {{ balanceChangeDisplay }}
        </el-text>
        <br>
        <el-text class="">
            <el-icon><trophy /></el-icon>
            {{translations["highest_balance"][language] + highestBalanceDisplay}}
        </el-text>
        <div class="poker-picker">
            <el-button type="primary" icon="Refresh" style="margin: 25px" :disabled="isEntryPaid" :loading="isLoading" @click="generateRandomAnswer">{{ translations["poker_picker_restart_button"][language]}}</el-button>
            <el-alert v-if="isSelected" :title="alertTitleAns" type="info" style="margin: 10px" />
            <el-alert v-if="isSelected" :title="alertTitle" :type="alertType" style="margin: 10px" />
            <div v-loading="isSelected||!isEntryPaid" :element-loading-text="translations['poker_picker_loading_info'][language]">
                <el-row v-for="typeIndex in [0,1,2,3]" justify="space-evenly" class="poker-row">
                    <el-space>
                        {{typesDisplay[language][typeIndex]}}
                        <div v-for="valueIndex in [0,1,2,3,4,5,6,7,8,9,10,11,12]" class="poker-item">
                            <poker-image :poker-type=types[typeIndex] :poker-value=values[valueIndex] @click="onSelectPoker($event, typeIndex, valueIndex)" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave"/>
                        </div>
                    </el-space>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import PokerImage from "./PokerImage.vue";
import {computed, ref, watch} from "@vue/runtime-core";
import {useStore} from "vuex";
import {Money, Trophy} from "@element-plus/icons-vue";

const translations = computed(() => useStore().state.appGlobal.translations);
const language = computed(() => useStore().state.appGlobal.language);
const user = ref(computed(() => useStore().state.auth.user).value);
const currentBalanceDisplay = ref(computed(() => useStore().state.appGlobal.userInfo).value.balance);
const highestBalanceDisplay = ref(computed(() => useStore().state.appGlobal.userInfo).value.highestBalance);
const balanceChangeDisplay = ref("");
const balanceChangeType = ref("success");
const values = ['A','2','3','4','5','6','7','8','9','10','11','12','13'];
const valuesDisplay = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const types = ['heart', 'diamond', 'club', 'spade'];
const typesDisplay = [
    ['Heart', 'Diamond', 'Club', 'Spade'],
    ['红桃', '方片', '草花', '黑桃']
]
const correctValueIndex = ref(0);
const correctValue = ref("A");
const correctTypeIndex = ref(0);
const correctType = ref("heart");
const selectedValue = ref("");
const selectedType = ref("");
const isSelected = ref(false);
const isEntryPaid = ref(computed(() => useStore().state.appGlobal.userInfo).value.isEntryPaid);
const isLoading = ref(false);
const alertTitle = ref("");
const alertTitleAns = ref("");
const alertType = ref("success");
const store = useStore();

watch(
    [
        () => computed(() => store.state.appGlobal.userInfo).value.balance,
        () => computed(() => store.state.appGlobal.userInfo).value.isEntryPaid,
    ],
    () => {
        currentBalanceDisplay.value = computed(() => store.state.appGlobal.userInfo).value.balance;
        highestBalanceDisplay.value = computed(() => store.state.appGlobal.userInfo).value.highestBalance;
        isEntryPaid.value = computed(() => store.state.appGlobal.userInfo).value.isEntryPaid;
    }
);


const generateRandomAnswer = () =>{
    if(currentBalanceDisplay.value < 10){
        ElMessage({
            message: translations.value["not_enough_balance"][language.value],
            type: 'error',
        });
        return;
    }
    if(isEntryPaid.value == false){
        store.dispatch("appGlobal/playGame", 10);
        balanceChangeType.value = "danger";
        balanceChangeDisplay.value = translations.value["balance_change_display"][0][language.value];
    }
    isLoading.value = true;
    correctTypeIndex.value = Math.floor(Math.random() * 4);
    correctType.value = types[correctTypeIndex.value];
    correctValueIndex.value = Math.floor(Math.random() * 13);
    correctValue.value = values[correctValueIndex.value];
    console.log("[INFO] Generated Random Poker: ",
        typesDisplay[language.value][correctTypeIndex.value],
        valuesDisplay[correctValueIndex.value]);
    isLoading.value = false;
    isSelected.value = false;
    const gameRecord = {
        time: formatDate(new Date()),
        gameResult: "Entry Fee",
        randomPoker: "",
        selectedPoker: "",
        gamePrize: -10,
        balance: computed(() => store.state.appGlobal.userInfo).value.balance,
    };
    store.dispatch("appGlobal/recordGame", gameRecord);
};

const onSelectPoker = (event: any, typeIndex: number, valueIndex: number) => {
    if(isSelected.value == true){
        console.log("You have already selected!");
        return;
    }
    selectedType.value = types[typeIndex];
    selectedValue.value = values[valueIndex];

    if(typeIndex == correctTypeIndex.value && valueIndex == correctValueIndex.value){
        winPrize(208, 1);
        ElMessage({
            message: translations.value["poker_picker_message_1"][language.value],
            type: 'success',
        });
        alertType.value = "success";
    }
    else if(typeIndex == correctTypeIndex.value) {
        winPrize(13, 3);
        ElMessage({
            message: translations.value["poker_picker_message_2"][language.value],
            type: 'warning',
        });
        alertType.value = "warning";
    }
    else if(valueIndex == correctValueIndex.value){
        winPrize(52, 2);
        ElMessage({
            message: translations.value["poker_picker_message_3"][language.value],
            type: 'warning',
        });
        alertType.value = "warning";
    }
    else{
        winPrize(0, 4);
        ElMessage({
            message: translations.value["poker_picker_message_4"][language.value],
            type: 'error',
        });
        alertType.value = "error";
    }
    updateUserInfo();
    isSelected.value = true;
    alertTitleAns.value = translations.value["poker_picker_display_correct_poker"][language.value] + typesDisplay[language.value][correctTypeIndex.value] + " " + valuesDisplay[correctValueIndex.value];
    alertTitle.value = translations.value["poker_picker_display_your_choice"][language.value] + typesDisplay[language.value][typeIndex] + " " + valuesDisplay[valueIndex];

};

const onMouseEnter = (event: any) => {
    event.target.style.border = "2px solid var(--el-border-color)";
};

const onMouseLeave = (event: any) => {
    event.target.style.border = "";
};

const winPrize = (prize: number, explain: number) => {
    store.dispatch("appGlobal/winGame", prize);
    balanceChangeType.value = "success";
    balanceChangeDisplay.value = "+" + prize.toString() + " " + translations.value["balance_change_display"][explain][language.value];
    const gameRecord = {
        time: formatDate(new Date()),
        gameResult: translations.value["balance_change_display"][explain][0],
        randomPoker: correctType.value + " " + correctValue.value,
        selectedPoker: selectedType.value + " " + selectedValue.value,
        gamePrize: prize,
        balance: computed(() => store.state.appGlobal.userInfo.balance).value,
    };
    store.dispatch("appGlobal/recordGame", gameRecord);
    if(prize == 0){
        balanceChangeDisplay.value = "";
    }
};

const formatDate = (date: Date) => {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
};

const padTo2Digits = (num: Number) => {
    return num.toString().padStart(2, '0');
};

const updateUserInfo = () => {
    user.value = computed(() => store.state.auth.user).value;
    const userInfo = computed(() => store.state.appGlobal.userInfo).value;
    if(user.value == null){
        console.log("[ERROR] Not Logged in, skipping update");
        return;
    }
    const info = {
        id: user.value.username,
        username: user.value.username,
        balance: userInfo.balance,
        highestBalance: userInfo.highestBalance,
        gamePlayed: userInfo.gamePlayed,
        samePokerCnt: userInfo.samePokerCnt,
        sameValueCnt: userInfo.sameValueCnt,
        sameColorCnt: userInfo.sameColorCnt,
        differentCnt: userInfo.differentCnt,
        gameRecords: userInfo.gameRecords,
        isEntryPaid: userInfo.isEntryPaid,
        language: language.value,
    };
    try{
        store.dispatch("appGlobal/updateUserInfo", info);
    }
    catch (error){
        console.log(error);
    }
};

defineExpose({isSelected, generateRandomAnswer});

</script>

<style scoped>
.poker-picker .poker-row{
    margin: 10px;
    align-items: center;
}

.poker-item{
    height: auto;
    width: 50px;
    border: 1px solid var(--el-border-color);
    border-radius: 5px;
    margin: 5px;
    box-shadow: var(--el-box-shadow);
}
</style>