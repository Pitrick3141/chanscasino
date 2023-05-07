<template>
    <div class="container flex-col">
        <el-text class="">
            <el-icon><money /></el-icon>
            Your Current Balance: {{currentBalanceDisplay}}
        </el-text>
        <el-text :type="balanceChangeType" tag="b">
            {{ balanceChangeDisplay }}
        </el-text>
        <br>
        <el-text class="">
            <el-icon><trophy /></el-icon>
            Your Highest Balance in History: {{highestBalanceDisplay}}
        </el-text>
        <div class="poker-picker">
            <el-button type="primary" icon="Refresh" style="margin: 25px" :disabled="!isSelected" :loading="isLoading" @click="generateRandomAnswer" v-if="isStarted">{{ translations["poker_picker_restart_button"][language]}}</el-button>
            <el-alert v-if="isSelected&&isStarted" :title="alertTitleAns" type="info" style="margin: 10px" />
            <el-alert v-if="isSelected&&isStarted" :title="alertTitle" :type="alertType" style="margin: 10px" />
            <div v-loading="isSelected&&isStarted" :element-loading-text="translations['poker_picker_loading_info'][language]">
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
import {computed, ref} from "@vue/runtime-core";
import {useStore} from "vuex";
import {Money, Trophy} from "@element-plus/icons-vue";

const translations = computed(() => useStore().state.appGlobal.translations);
const language = computed(() => useStore().state.appGlobal.language);
const currentBalanceDisplay = ref(computed(() => useStore().state.appGlobal.currentBalance).value);
const highestBalanceDisplay = ref(computed(() => useStore().state.appGlobal.highestBalance).value);
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
const isStarted = ref(false);
const isSelected = ref(true);
const isLoading = ref(false);
const alertTitle = ref("");
const alertTitleAns = ref("");
const alertType = ref("success");
const store = useStore();

const generateRandomAnswer = () =>{
    if(currentBalanceDisplay.value < 10){
        ElMessage({
            message: translations.value["not_enough_balance"][language.value],
            type: 'error',
        });
        return;
    }
    if(isStarted.value == true){
        store.dispatch("appGlobal/playGame", 10);
        balanceChangeType.value = "danger";
        balanceChangeDisplay.value = "-10 Start Game Cost";
        updateBalanceDisplay();
    }
    isLoading.value = true;
    isStarted.value = true;
    correctTypeIndex.value = Math.floor(Math.random() * 4);
    correctType.value = types[correctTypeIndex.value];
    correctValueIndex.value = Math.floor(Math.random() * 13);
    correctValue.value = values[correctValueIndex.value];
    console.log("Random Type: " + typesDisplay[language.value][correctTypeIndex.value]);
    console.log("Random Value: " + valuesDisplay[correctValueIndex.value]);
    isLoading.value = false;
    isSelected.value = false;
};

const onSelectPoker = (event: any, typeIndex: number, valueIndex: number) => {
    if(isStarted.value == false){
        generateRandomAnswer();
    }
    if(isSelected.value == true){
        console.log("You have already selected!");
        return;
    }

    selectedType.value = types[typeIndex];
    selectedValue.value = values[valueIndex];

    if(typeIndex == correctTypeIndex.value && valueIndex == correctValueIndex.value){
        winPrize(208, "Win First Prize: Same Poker");
        ElMessage({
            message: translations.value["poker_picker_message_1"][language.value],
            type: 'success',
        });
        alertType.value = "success";
    }
    else if(typeIndex == correctTypeIndex.value) {
        winPrize(13, "Win Third Prize: Same Colour");
        ElMessage({
            message: translations.value["poker_picker_message_2"][language.value],
            type: 'warning',
        });
        alertType.value = "warning";
    }
    else if(valueIndex == correctValueIndex.value){
        winPrize(52, "Win Second Prize: Same Value");
        ElMessage({
            message: translations.value["poker_picker_message_3"][language.value],
            type: 'warning',
        });
        alertType.value = "warning";
    }
    else{
        winPrize(0, "Win Nothing");
        ElMessage({
            message: translations.value["poker_picker_message_4"][language.value],
            type: 'error',
        });
        alertType.value = "error";
    }
    updateBalanceDisplay();
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

const updateBalanceDisplay = () =>{
    currentBalanceDisplay.value = computed(() => store.state.appGlobal.currentBalance).value;
    highestBalanceDisplay.value = computed(() => store.state.appGlobal.highestBalance).value;
}

const winPrize = (prize: Number, explain: String) => {
    const currentTime = new Date(Date.parse(new Date().toString()));
    const gameRecord = {
        currentTime: currentTime,
        gamePlayer: computed(() => store.state.auth.user).value,
        gameResult: explain,
        randomPoker: correctType.value + " " + correctValue.value,
        selectedPoker: selectedType.value + " " + selectedValue.value,
        gamePrize: prize
    };
    console.log(gameRecord);
    store.dispatch("appGlobal/recordGame", gameRecord)
    if(prize == 0){
        balanceChangeDisplay.value = "";
        return;
    }
    store.dispatch("appGlobal/winGame", prize);
    balanceChangeType.value = "success";
    balanceChangeDisplay.value = "+" + prize.toString() + " " + explain;
    ElMessage({
        message: translations.value["win_prize_message"][language.value] + " " + prize.toString() + " " + translations.value["chanidian_dollar"][language.value] + "!",
        type: 'success',
    });
    updateBalanceDisplay();
}

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