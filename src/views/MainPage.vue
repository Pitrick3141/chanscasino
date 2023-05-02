<template>
    <div class="common-layout">
        <el-container>
            <side-menu @show-instruction="ShowInstruction" @change-language="ChangeLanguage" :lang="language"/>
            <el-container>
                <el-header height="auto">
                    <el-image style="width: auto; height: auto" src="\img\title.png" fit="contain" />
                </el-header>
                <el-container>
                    <el-main>
                        <tutorials :section="instructionIndex" :lang="language" @start-basic-game="StartBasicGame"/>
                        <poker-picker :lang="language" v-if="showPokerPicker" ref="pokerPickerRef"/>
                    </el-main>
                    <el-footer>
                        <el-divider />
                        <scroll-announcement ref="announcementRef"/>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Tutorials from "../components/Tutorials.vue";
import PokerPicker from "../components/PokerPicker.vue";
import ScrollAnnouncement from "../components/SystemAnnouncement.vue";
import SideMenu from "../components/SideMenu.vue";
import { ref } from "vue";
import {inject} from "@vue/runtime-core";

const instructionIndex = ref(0);
const language = ref(0);
const translations = inject("translation") as Record<string, Array<string>>;
const showPokerPicker = ref(true);
const announcementRef = ref();
const pokerPickerRef = ref();

const ShowInstruction = (selectedIndex: string) => {
    console.log("Child Emitted Show Ins#: " + selectedIndex);
    instructionIndex.value = parseInt(selectedIndex);
};

const ChangeLanguage = (selectedIndex: string) => {
    console.log("Child Emitted Change Lang#: " + selectedIndex);
    language.value = parseInt(selectedIndex) - 1;
    ElMessage({
        message: translations["change_language_message"][language.value],
        type: 'success',
    });
    announcementRef.value.SwitchLanguage(language.value);
};

const StartBasicGame = () =>{
    if(showPokerPicker.value == false){
        showPokerPicker.value = true;
    }
    else if(pokerPickerRef.value.isSelected == true)
    {
        pokerPickerRef.value.generateRandomAnswer();
    }
}
</script>

<style scoped>

</style>