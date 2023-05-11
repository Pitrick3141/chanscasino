<template>
    <el-alert v-if="language==1" title="游戏记录表格内的数据暂不支持翻译为中文，十分抱歉" type="warning" />
    <el-divider content-position="left">{{ translations["info_user_info"][language] }}</el-divider>
    <el-descriptions>
        <el-descriptions-item :label="translations['info_username'][language]">{{ user.username }}</el-descriptions-item>
        <el-descriptions-item :label="translations['info_email'][language]">{{ user.attributes.email }}</el-descriptions-item>
        <el-descriptions-item :label="translations['info_id'][language]">{{ user.id }}</el-descriptions-item>

    </el-descriptions>
    <div class="flex flex-row">
        <el-text>{{ translations["info_danger_operation"][language] }}</el-text>
        <el-switch
            class="ml-2"
            v-model="showDangerOption"
            style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66"
            :active-text="translations['info_show'][language]"
            :inactive-text="translations['info_hide'][language]"
            inline-prompt
        />
        <el-popconfirm
            :confirm-button-text="translations['info_clear_clear'][language]"
            :cancel-button-text="translations['info_clear_cancel'][language]"
            :icon="WarnTriangleFilled"
            icon-color="#ff4949"
            v-if="showDangerOption"
            :title="translations['info_clear_confirm'][language]"
            @confirm="clearUserData"
        >
            <template #reference>
                <el-button type="danger" class="ml-5">{{ translations["info_clear_data"][language] }}</el-button>
            </template>
        </el-popconfirm>
    </div>
    <el-divider content-position="left">{{ translations["info_game_records"][language] }}</el-divider>
    <el-table
        :data="tableData"
        style="width: auto"
        :row-class-name="tableRowClassName"
    >
        <el-table-column prop="time" :label="translations['info_time'][language]" sortable width="180" />
        <el-table-column prop="randomPoker" :label="translations['info_correct_poker'][language]" width="120" />
        <el-table-column prop="selectedPoker" :label="translations['info_selected_poker'][language]" width="130" />
        <el-table-column prop="gameResult" :label="translations['info_description'][language]" width="240" />
        <el-table-column prop="gamePrize" :label="translations['info_balance_change'][language]" sortable width="160" />
        <el-table-column prop="balance" :label="translations['info_new_balance'][language]" width="140" />
    </el-table>
</template>

<script setup lang="ts">
import {useStore} from "vuex";
import {computed, toRaw, watch} from "@vue/runtime-core";
import {ref} from "vue";
import {WarnTriangleFilled} from "@element-plus/icons-vue";
import {API, graphqlOperation} from "aws-amplify";
import {deleteUserInfo as deleteUserInfoMutation} from "../graphql/mutations.js";

const translations = computed(() => useStore().state.appGlobal.translations);
const language = computed(() => useStore().state.appGlobal.language);
const tableData = ref(computed(() =>useStore().state.appGlobal.gameRecords).value);
const user = computed(() =>useStore().state.auth.user).value;
const store = useStore();
const showDangerOption = ref(false);


watch(
    () => computed(() => store.state.appGlobal.gameRecords).value,
    (val, preVal) => {
        tableData.value = computed(() => store.state.appGlobal.gameRecords).value;
    }
);

interface GameRecord {
    time: string,
    gameResult: string,
    randomPoker: string,
    selectedPoker: string,
    gamePrize: number,
    balance: number,
}

const tableRowClassName = ({row, rowIndex,}: { row: GameRecord, rowIndex: number }) => {
    const rowItem = toRaw(row);
    const gameResult = rowItem.gameResult;
    if (gameResult == "Win Nothing"){
        return "error-row"
    }
    else if (gameResult == "Win Second Prize: Same Value" || gameResult == "Win Third Prize: Same Colour") {
        return "warning-row"
    } else if (gameResult == "Win First Prize: Same Poker") {
        return "success-row"
    }
    return ""
};

const clearUserData = async() => {
    await API.graphql(graphqlOperation(deleteUserInfoMutation, {input: {id: user.username}}));
    ElMessage({
        message: translations.value["info_clear_success"][language.value],
        type: 'success',
    });
};

</script>

<style>
.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.el-table .error-row {
    --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
</style>