<template>
    <div class="common-layout">
        <el-container>
            <side-menu @show-instruction="ShowInstruction" @show-user-info="ShowUserInfo"/>
            <el-container>
                <el-header height="auto">
                    <navigation-bar/>
                    <el-image style="width: auto; height: auto" src="\img\title.png" fit="contain" />
                </el-header>
                <el-container>
                    <el-main>
                        <tutorials :section="instructionIndex" @start-basic-game="StartBasicGame"/>
                        <user-info v-if="showUserInfo" />
                        <poker-picker v-if="showPokerPicker" ref="pokerPickerRef"/>
                    </el-main>
                    <el-footer>
                        <el-divider />
                        <scroll-announcement />
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Tutorials from "../components/Tutorials.vue";
import PokerPicker from "../components/PokerPicker.vue";
import UserInfo from "../components/UserInfo.vue";
import ScrollAnnouncement from "../components/SystemAnnouncement.vue";
import SideMenu from "../components/SideMenu.vue";
import { ref } from "vue";
import {useStore} from "vuex";
import {computed} from "@vue/runtime-core";

const instructionIndex = ref(0);
const language = computed(() => useStore().state.appGlobal.language);
const showPokerPicker = ref(true);
const showUserInfo = ref(false);
const pokerPickerRef = ref();

const ShowInstruction = (selectedIndex: string) => {
    console.log("Child Emitted Show Ins#: " + selectedIndex);
    instructionIndex.value = parseInt(selectedIndex);
    showUserInfo.value = false;
};

const ShowUserInfo = () => {
    console.log("Child Emitted Show UserInfo");
    showUserInfo.value = true;
    showPokerPicker.value = false;
    instructionIndex.value = 0;
};

const StartBasicGame = () =>{
    if(showPokerPicker.value == false){
        showPokerPicker.value = true;
        showUserInfo.value = false;
    }
    else if(pokerPickerRef.value.isSelected == true)
    {
        pokerPickerRef.value.generateRandomAnswer();
    }
}
</script>

<style scoped>

</style>