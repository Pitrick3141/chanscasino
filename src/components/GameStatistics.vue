<template>
    <el-alert :title='translations["statistics_last_update"][language]
        + hours + " " + translations["statistics_last_update_hours"][language] + " "
        + minutes + " " + translations["statistics_last_update_minutes"][language] + " "
        + seconds + " " + translations["statistics_last_update_seconds"][language] + " "
        + translations["statistics_last_update_ago"][language]'
              type="info"
    />
    <el-divider content-position="left">{{ translations["statistics_statistics"][language] }}</el-divider>
    <el-descriptions>
        <el-descriptions-item :label="translations['statistics_game_played'][language]">{{ gamePlayed }}</el-descriptions-item>
        <el-descriptions-item :label="translations['statistics_same_poker'][language]">{{ samePokerCnt }} ({{Math.round(samePokerCnt/gamePlayed*100)}}%)</el-descriptions-item>
        <el-descriptions-item :label="translations['statistics_same_value'][language]">{{ sameValueCnt }} ({{Math.round(sameValueCnt/gamePlayed*100)}}%)</el-descriptions-item>
        <el-descriptions-item :label="translations['statistics_same_color'][language]">{{ sameColorCnt }} ({{Math.round(sameColorCnt/gamePlayed*100)}}%)</el-descriptions-item>
        <el-descriptions-item :label="translations['statistics_different'][language]">{{ differentCnt }} ({{Math.round(differentCnt/gamePlayed*100)}}%)</el-descriptions-item>
        <el-descriptions-item :label="translations['statistics_cost'][language]">{{ totalCost }} {{translations['chanidian_dollar'][language]}}</el-descriptions-item>
        <el-descriptions-item :label="translations['statistics_gains'][language]">{{ totalGains }} {{translations['chanidian_dollar'][language]}}</el-descriptions-item>
        <el-descriptions-item :label="translations['statistics_profit'][language]">{{ totalCost - totalGains }} {{translations['chanidian_dollar'][language]}}</el-descriptions-item>
    </el-descriptions>
    <el-divider content-position="left">{{ translations["statistics_rankings"][language] }}</el-divider>
    <el-table
        :data="tableData"
        style="width: auto"
    >
        <el-table-column prop="id" :label="translations['statistics_rankings_id'][language]"/>
        <el-table-column prop="highestBalance" :label="translations['statistics_rankings_highest_balance'][language]" sortable/>
        <el-table-column prop="balance" :label="translations['statistics_rankings_balance'][language]" sortable/>
    </el-table>
</template>

<script setup lang="ts">
import {Storage} from "aws-amplify";
import {onMounted, ref} from "vue";
import {computed} from "@vue/runtime-core";
import {useStore} from "vuex";

const translations = computed(() => useStore().state.appGlobal.translations);
const language = computed(() => useStore().state.appGlobal.language);
const gameRates = computed(() => useStore().state.appGlobal.gameRates).value;
const tableData = ref([{}]);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const gamePlayed = ref(0);
const samePokerCnt = ref(0);
const sameColorCnt = ref(0);
const sameValueCnt = ref(0);
const differentCnt = ref(0);
const totalCost = ref(0);
const totalGains = ref(0);


const fetchData = async() => {
    await getRankings();
    await getStatistics();
}
const getRankings = async() =>{
    const rankingData = await Storage.get('rankings.json',
        {
            validateObjectExistence: true,
            download: true,
            contentType: 'text/plain',
        });
    console.log("[INFO] Ranking Data Fetched from backend: ", rankingData);
    if(rankingData.LastModified != null){
        const timeDifference = new Date().getTime() - rankingData.LastModified.getTime();
        hours.value = Math.floor(timeDifference / (1000 * 60 * 60));
        minutes.value = Math.floor((timeDifference / (1000 * 60)) % 60);
        seconds.value = Math.floor((timeDifference / 1000) % 60);
    }
    if(rankingData.Body != null) {
        const fetchedData = await rankingData.Body.text();
        let jsonData = JSON.parse(fetchedData);
        let trimmedData = [];
        console.log("[INFO] Parsed Ranking JSON Data: ", jsonData);
        for(const index in jsonData.Items)
        {
            if(!jsonData.Items[index].id.includes('removed')){
                trimmedData.unshift(jsonData.Items[index]);
            }
        }
        tableData.value = trimmedData.sort((a: any, b: any) => (a.highestBalance < b.highestBalance) ? 1 : -1);
    }
}

const getStatistics = async() => {
    gamePlayed.value = 0;
    samePokerCnt.value = 0;
    sameColorCnt.value = 0;
    sameValueCnt.value = 0;
    differentCnt.value = 0;
    const statisticsData = await Storage.get('statistics.json',
        {
            validateObjectExistence: true,
            download: true,
            contentType: 'text/plain',
        });
    console.log("[INFO] Statistics Data Fetched from backend: ", statisticsData);
    if(statisticsData.Body != null) {
        const fetchedData = await statisticsData.Body.text()
        const jsonData = JSON.parse(fetchedData)
        console.log("[INFO] Parsed Statistics JSON Data: ", jsonData);
        for(const index in jsonData.Items){
            const item = jsonData.Items[index];
            gamePlayed.value += item.gamePlayed;
            samePokerCnt.value += item.samePokerCnt;
            sameColorCnt.value += item.sameColorCnt;
            sameValueCnt.value += item.sameValueCnt;
            differentCnt.value += item.differentCnt;
        }
    }
    totalCost.value = gamePlayed.value * gameRates['entry_fee'];
    totalGains.value = samePokerCnt.value * gameRates['same_poker_reward']
        + sameValueCnt.value * gameRates['same_value_reward']
        + sameColorCnt.value * gameRates['same_color_reward']
        + differentCnt.value * gameRates['different_reward'];
}

onMounted(fetchData);

</script>

<style scoped>

</style>