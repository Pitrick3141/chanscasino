<template>
    <div class="poker-picker">
        <el-button type="primary" icon="Refresh" style="margin: 25px" :disabled="!isSelected" :loading="isLoading" @click="generateRandomAnswer" v-if="isStarted">{{ translations["poker_picker_restart_button"][props.lang]}}</el-button>
        <el-alert v-if="isSelected&&isStarted" :title="alertTitleAns" type="info" style="margin: 10px" />
        <el-alert v-if="isSelected&&isStarted" :title="alertTitle" :type="alertType" style="margin: 10px" />
        <div v-loading="isSelected&&isStarted" :element-loading-text="translations['poker_picker_loading_info'][props.lang]">
            <el-row v-for="typeIndex in [0,1,2,3]" justify="space-evenly" class="poker-row">
                <el-space>
                    {{typesDisplay[props.lang][typeIndex]}}
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
import {inject, ref} from "@vue/runtime-core";

const translations = inject("translation") as Record<string, Array<string>>;
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

const props = defineProps({
    lang: Number
})

const generateRandomAnswer = () =>{
    isLoading.value = true;
    isStarted.value = true;
    correctTypeIndex.value = Math.floor(Math.random() * 4);
    correctType.value = types[correctTypeIndex.value];
    correctValueIndex.value = Math.floor(Math.random() * 13);
    correctValue.value = values[correctValueIndex.value];
    console.log("Random Type: " + typesDisplay[props.lang != null?props.lang:0][correctTypeIndex.value]);
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
            message: translations["poker_picker_message_1"][props.lang!=null?props.lang:0],
            type: 'success',
        });
        alertType.value = "success";
    }
    else if(typeIndex == correctTypeIndex.value) {
        ElMessage({
            message: translations["poker_picker_message_2"][props.lang!=null?props.lang:0],
            type: 'warning',
        });
        alertType.value = "warning";
    }
    else if(valueIndex == correctValueIndex.value){
        ElMessage({
            message: translations["poker_picker_message_3"][props.lang!=null?props.lang:0],
            type: 'warning',
        });
        alertType.value = "warning";
    }
    else{
        ElMessage({
            message: translations["poker_picker_message_4"][props.lang!=null?props.lang:0],
            type: 'error',
        });
        alertType.value = "error";
    }
    isSelected.value = true;
    alertTitleAns.value = translations["poker_picker_display_correct_poker"][props.lang!=null?props.lang:0] + typesDisplay[props.lang != null?props.lang:0][correctTypeIndex.value] + " " + valuesDisplay[correctValueIndex.value];
    alertTitle.value = translations["poker_picker_display_your_choice"][props.lang!=null?props.lang:0] + typesDisplay[props.lang != null?props.lang:0][typeIndex] + " " + valuesDisplay[valueIndex];
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