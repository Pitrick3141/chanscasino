<template>
    <div class="flex flex-col">
        <el-text v-if="user" type="primary" size="large" tag="b">{{ translations["user_info_username"][language] + user.username }}</el-text>
        <div class="flex-auto mt-2">
            <el-button type="primary" @click="getCurrentUser(user)">Current User Info</el-button>
        </div>
        <el-text v-if="this.isInfoFetched&&this.isUserExist" type="primary" size="large" tag="b">{{ translations["current_balance"][language] + currentUserInfo.balance + " " + translations["chanidian_dollar"][language]}}</el-text>
        <el-text v-if="this.isInfoFetched&&this.isUserExist" type="primary" size="large" tag="b">{{ translations["highest_balance"][language] + currentUserInfo.highestBalance + " " + translations["chanidian_dollar"][language]}}</el-text>
        <el-text v-if="this.isInfoFetched&&this.isUserExist" type="primary" size="large" tag="b">{{ translations["game_played"][language] + currentUserInfo.gamePlayed }}</el-text>
        <el-text v-if="!this.isUserExist" type="danger" size="large" tag="b">{{ translations["user_info_not_exist"][language] }}</el-text>
        <div class="flex-auto mt-2">
            <el-button type="primary" @click="createUserInfo(user)">Create cloud User Info</el-button>
        </div>
        <div class="flex-auto mt-2">
            <el-button type="primary" @click="setUserInfo(currentUserInfo)">Set User Info to local</el-button>
        </div>
        <div class="flex-auto mt-2">
            <el-button type="primary" @click="updateUserInfo">Update local User Info to cloud</el-button>
        </div>
    </div>
</template>

<script>
import {mapGetters, useStore} from "vuex";
import {computed} from "@vue/runtime-core";

export default {
    name: "UserInfo",
    computed: {
        ...mapGetters({
            user: "auth/user",
        }),
    },
    setup() {
        const translations = computed(() => useStore().state.appGlobal.translations);
        const language = computed(() => useStore().state.appGlobal.language);
        return{
            language,
            translations
        };
    },
    methods:{
        async getCurrentUser(user){
            try{
                this.currentUserInfo = await this.$store.dispatch("appGlobal/getUserInfo", user.username)
            }
            catch (error){
                console.log(error);
                this.currentUserInfo = error.data.getUserInfo;
            }
            console.log(this.currentUserInfo);
            this.isInfoFetched = true;
            if(this.currentUserInfo == null){
                this.isUserExist = false;
            }
        },
        async createUserInfo(user) {
            const newUserInfo = {
                id: user.username,
                username: user.username,
                balance: 100,
                highestBalance: 100,
                gamePlayed: 20
            };
            this.$store.dispatch("appGlobal/createUserInfo", newUserInfo);
        },
        async setUserInfo(info) {
            this.$store.dispatch("appGlobal/setUserInfo", info);
        },
        async updateUserInfo() {
            const balance = computed(() => useStore().state.appGlobal.currentBalance).value;
            const highestBalance = computed(() => useStore().state.appGlobal.highestBalance).value;
            const gameRecords = computed(() => useStore().state.appGlobal.gameRecords).value;
            const gamePlayed = computed(() => useStore().state.appGlobal.gamePlayed).value
            const info = {
                balance: balance,
                highestBalance: highestBalance,
                gameRecords: gameRecords,
                gamePlayed: gamePlayed,
            };
            console.log(info);
            try{
                this.$store.dispatch("appGlobal/updateUserInfo", info);
            }
            catch (error){
                console.log(error);
            }
        },
    },
    data: () => ({
        isUserExist: true,
        isInfoFetched: false,
        currentUserInfo: null,
    }),
}
</script>

<style scoped>

</style>