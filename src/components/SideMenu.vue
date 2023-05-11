<template>
    <el-aside width="200px">
        <el-menu
                default-active="1"
                class="el-menu-vertical"
                @select="handleSelect"
        >
            <el-menu-item index="6">
                <el-icon><house /></el-icon>
                <span>{{ translations['side_menu_6'][language] }}</span>
            </el-menu-item>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><question-filled /></el-icon>
                    <span>{{ translations['side_menu_1'][language] }}</span>
                </template>
                <el-menu-item-group :title="translations['side_menu_1_group_1'][language]">
                    <el-menu-item index="1-1">{{ translations['side_menu_1_group_1_item_1'][language] }}</el-menu-item>
                    <el-menu-item index="1-2">{{ translations['side_menu_1_group_1_item_2'][language] }}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group :title="translations['side_menu_1_group_2'][language]">
                    <el-menu-item index="1-3">{{ translations['side_menu_1_group_2_item_1'][language] }}</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="2">
                <el-icon><memo /></el-icon>
                <span>{{ translations['side_menu_2'][language] }}</span>
            </el-menu-item>
            <el-menu-item index="3">
                <el-icon><data-line /></el-icon>
                <span>{{ translations['side_menu_3'][language] }}</span>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon><info-filled /></el-icon>
                <span>{{ translations['side_menu_4'][language] }}</span>
            </el-menu-item>
            <el-divider></el-divider>
            <el-sub-menu index="5">
                <template #title>
                    <el-icon><chat-dot-round /></el-icon>
                    <span>{{ translations['side_menu_5'][language] }}</span>
                </template>
                <el-menu-item index="5-1">{{ translations['side_menu_5_English'][language] }}</el-menu-item>
                <el-menu-item index="5-2">{{ translations['side_menu_5_Chinese'][language] }}</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script lang="ts" setup>
import {
    InfoFilled,
    House,
    QuestionFilled,
    DataLine,
    ChatDotRound,
    Memo,
} from '@element-plus/icons-vue';
import {useStore} from "vuex";
import {computed} from "@vue/runtime-core";
const store = useStore();
const language = computed(() => store.state.appGlobal.language);
const translations = computed(() => store.state.appGlobal.translations);

const handleSelect = (key: string, keyPath: string[]) => {
    if(key[0] == '1'){
        emit("showInstruction", key[2]);
    }
    else if(key[0] == '2')
    {
        emit("showUserInfo");
    }
    else if(key[0] == '3')
    {
        ElMessage({
            message: translations.value["under_construction"][language.value],
            type: 'info',
        });
    }
    else if(key[0] == '4')
    {
        ElMessage({
            message: translations.value["under_construction"][language.value],
            type: 'info',
        });
    }
    else if(key[0] == '5'){
        store.dispatch("appGlobal/updateGlobalLanguage", parseInt(key[2]) - 1);
    }
    else if(key[0] == '6'){
        emit("showGame");
    }
}

const emit = defineEmits(["showInstruction", "showUserInfo", "showGame"]);
</script>

<style scoped>

</style>