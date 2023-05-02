<template>
    <el-aside width="200px">
        <el-menu
                default-active="1"
                class="el-menu-vertical"
                @select="handleSelect"
        >
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><question-filled /></el-icon>
                    <span>{{ translations['side_menu_1'][props.lang] }}</span>
                </template>
                <el-menu-item-group :title="translations['side_menu_1_group_1'][props.lang]">
                    <el-menu-item index="1-1">{{ translations['side_menu_1_group_1_item_1'][props.lang] }}</el-menu-item>
                    <el-menu-item index="1-2">{{ translations['side_menu_1_group_1_item_2'][props.lang] }}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group :title="translations['side_menu_1_group_2'][props.lang]">
                    <el-menu-item index="1-3">{{ translations['side_menu_1_group_2_item_1'][props.lang] }}</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>{{ translations['side_menu_2'][props.lang] }}</span>
            </el-menu-item>
            <el-menu-item index="3">
                <el-icon><data-line /></el-icon>
                <span>{{ translations['side_menu_3'][props.lang] }}</span>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon><info-filled /></el-icon>
                <span>{{ translations['side_menu_4'][props.lang] }}</span>
            </el-menu-item>
            <el-divider></el-divider>
            <el-sub-menu index="5">
                <template #title>
                    <el-icon><chat-dot-round /></el-icon>
                    <span>{{ translations['side_menu_5'][props.lang] }}</span>
                </template>
                <el-menu-item index="5-1">{{ translations['side_menu_5_English'][props.lang] }}</el-menu-item>
                <el-menu-item index="5-2">{{ translations['side_menu_5_Chinese'][props.lang] }}</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script lang="ts" setup>
import {
    InfoFilled,
    Menu as IconMenu,
    QuestionFilled,
    DataLine,
    ChatDotRound
} from '@element-plus/icons-vue';
import {inject} from "@vue/runtime-core";
const translations = inject("translation") as Record<string, Array<string>>;

const props = defineProps({
    lang: Number
});

const handleSelect = (key: string, keyPath: string[]) => {
    console.log("Side Menu Select Key: " + key);

    if(key[0] == '1'){
        if(key[2]!='1'){
            ElMessage({
                message: translations["under_construction"][props.lang!=null?props.lang:0],
                type: 'info',
            });
        }
        emit("showInstruction", key[2])
    }
    else if(key[0] == '2')
    {
        ElMessage({
            message: translations["under_construction"][props.lang!=null?props.lang:0],
            type: 'info',
        });
    }
    else if(key[0] == '3')
    {
        ElMessage({
            message: translations["under_construction"][props.lang!=null?props.lang:0],
            type: 'info',
        });
    }
    else if(key[0] == '4')
    {
        ElMessage({
            message: translations["under_construction"][props.lang!=null?props.lang:0],
            type: 'info',
        });
    }
    else if(key[0] == '5'){
        emit("changeLanguage", key[2])
    }
}

const emit = defineEmits(["showInstruction", "changeLanguage"]);
</script>

<style scoped>

</style>