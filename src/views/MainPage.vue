<template>
    <div class="common-layout">
        <el-container>
            <side-menu
                @show-instruction="ShowInstruction"
                @show-user-info="ShowUserInfo"
                @show-game="ShowGame"
                @show-statistics="ShowStatistics"
            />
            <el-container>
                <el-header height="auto">
                    <navigation-bar/>
                    <el-image style="width: auto; height: auto" src="\img\title.png" fit="contain" />
                </el-header>
                <el-container>
                    <el-main>
                        <game-records v-if="showGameRecords"/>
                        <game-statistics v-if="showGameStatistics" />
                        <tutorials :section="instructionIndex" @start-basic-game="ShowGame"/>
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
import ScrollAnnouncement from "../components/SystemAnnouncement.vue";
import GameRecords from "../components/GameRecords.vue";
import GameStatistics from "../components/GameStatistics.vue";
import SideMenu from "../components/SideMenu.vue";
import { ref } from "vue";

const instructionIndex = ref(0);
const showPokerPicker = ref(true);
const showGameRecords = ref(false);
const showGameStatistics = ref(false);
const pokerPickerRef = ref();

const ShowInstruction = (selectedIndex: string) => {
    instructionIndex.value = parseInt(selectedIndex);
    showGameRecords.value = false;
    showGameStatistics.value = false;
};

const ShowUserInfo = () => {
    showGameRecords.value = true;
    showGameStatistics.value = false;
    showPokerPicker.value = false;
    instructionIndex.value = 0;
};

const ShowGame = () =>{
    showPokerPicker.value = true;
    showGameRecords.value = false;
    showGameStatistics.value = false;
}

const ShowStatistics = () => {
    showGameStatistics.value = true;
    showGameRecords.value = false;
    showPokerPicker.value = false;
    instructionIndex.value = 0;
}
</script>

<style scoped>

</style>