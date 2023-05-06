<template>
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
</template>

<script setup lang="ts">

import PokerImage from "./PokerImage.vue";
import {computed, ref} from "@vue/runtime-core";
import {useStore} from "vuex";

const translations = computed(() => useStore().state.appGlobal.translations).value;
const language = computed(() => useStore().state.appGlobal.language);
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
const isStarted = ref(false);
const isSelected = ref(true);
const isLoading = ref(false);
const alertTitle = ref("");
const alertTitleAns = ref("");
const alertType = ref("success");

const generateRandomAnswer = () =>{
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

    if(typeIndex == correctTypeIndex.value && valueIndex == correctValueIndex.value){
        ElMessage({
            message: translations["poker_picker_message_1"][language.value],
            type: 'success',
        });
        alertType.value = "success";
    }
    else if(typeIndex == correctTypeIndex.value) {
        ElMessage({
            message: translations["poker_picker_message_2"][language.value],
            type: 'warning',
        });
        alertType.value = "warning";
    }
    else if(valueIndex == correctValueIndex.value){
        ElMessage({
            message: translations["poker_picker_message_3"][language.value],
            type: 'warning',
        });
        alertType.value = "warning";
    }
    else{
        ElMessage({
            message: translations["poker_picker_message_4"][language.value],
            type: 'error',
        });
        alertType.value = "error";
    }
    isSelected.value = true;
    alertTitleAns.value = translations["poker_picker_display_correct_poker"][language.value] + typesDisplay[language.value][correctTypeIndex.value] + " " + valuesDisplay[correctValueIndex.value];
    alertTitle.value = translations["poker_picker_display_your_choice"][language.value] + typesDisplay[language.value][typeIndex] + " " + valuesDisplay[valueIndex];
};

const onMouseEnter = (event: any) => {
    event.target.style.border = "2px solid var(--el-border-color)";
};

const onMouseLeave = (event: any) => {
    event.target.style.border = "";
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