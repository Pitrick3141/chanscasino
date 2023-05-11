<script>
import {mapActions} from "vuex";
import {computed} from "@vue/runtime-core";

export default {
    async mounted() {
        const info = await this.authAction();
        console.log("[INFO] Auto Logged In: ", info);
        if(info!= null){
            const userInfo = await this.getUserInfo(info.username);
            if(userInfo != null){
                await this.setUserInfo(userInfo);
            }
            else {
                const userInfo = computed(() => this.$store.state.appGlobal.userInfo).value;
                const newUserInfo = {
                    id: info.username,
                    username: info.username,
                    balance: userInfo.balance,
                    highestBalance: userInfo.highestBalance,
                    gamePlayed: userInfo.gamePlayed,
                    samePokerCnt: userInfo.samePokerCnt,
                    sameValueCnt: userInfo.sameValueCnt,
                    sameColorCnt: userInfo.sameColorCnt,
                    differentCnt: userInfo.differentCnt,
                    gameRecords: userInfo.gameRecords,
                    isEntryPaid: userInfo.isEntryPaid,
                    language: computed(() => this.$store.state.appGlobal.userInfo).value,
                };
                await this.$store.dispatch("appGlobal/createUserInfo", newUserInfo);
            }
        }
    },
    methods: {
        ...mapActions("auth", ["authAction"]),
        ...mapActions("appGlobal", ["getUserInfo", "setUserInfo"]),
    },
}
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped>

</style>
