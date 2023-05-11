<template>
    <div>
        <el-alert v-if="this.error_message!==''" :title="this.error_message" type="error" />
        <form v-if="!confirmPassword" class="flex flex-col items-center" @submit.prevent="login">
            <div class="flex flex-col user">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="userName">{{ translations['auth_username'][language] }}</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    v-model="username"
                    id="userName"
                />
            </div>
            <div class="flex flex-col mt-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">{{ translations['auth_password'][language] }}</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    v-model="password"
                />
            </div>
            <!-- eslint-disable -->
            <button class="btn-blue">{{ translations['auth_login'][language] }}</button>
        </form>
        <div v-if="confirmPassword" class="w-4/12 m-auto">
            <h3>{{ translations['auth_confirm_message'][language] }}</h3>
            <div class="flex flex-col mt-2">
                <label class="block text-gray-700 text-sm font-bold" for="password">{{ translations['auth_code'][language] }}</label>
                <input
                    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    v-model="code"
                />
                <button class="btn-blue" @click="confirmSignUp">{{ translations['auth_confirm_signup'][language] }}</button>
            </div>
        </div>
    </div>
</template>

<script>

import {mapActions, useStore} from "vuex";
import {computed} from "@vue/runtime-core";

export default {
    name: "Login",
    data: ()=>({
        username: "",
        password: "",
        email: "",
        error: "",
        error_message: "",
        code: "",
        confirmPassword: false,
    }),
    setup(){
        const language = computed(() => useStore().state.appGlobal.language);
        const translations = computed(() => useStore().state.appGlobal.translations);

        return{
            language, translations
        };
    },
    methods:{
        ...mapActions({
            loginVue: "auth/login",
            getUserInfoQuery: "appGlobal/getUserInfo",
        }),
        async login(){
            this.error_message = '';
            if(!this.username){
                this.error_message = this.translations['error_messages']['enter_username'][this.language];
                return;
            }
            if(!this.password){
                this.error_message = this.translations['error_messages']['enter_password'][this.language];
                return;
            }
            try{
                await this.loginVue({
                    username: this.username,
                    password: this.password
                });
                ElMessage({
                    message: this.translations['login_success_message'][this.language] + ", " + this.username + "!",
                    type: 'success',
                });
                try{
                    const info = await this.$store.dispatch("appGlobal/getUserInfo", this.username);
                    this.$store.dispatch("appGlobal/setUserInfo", info);
                }
                catch (error){
                    const info = error.data.getUserInfo;
                    console.log("returnedInfo", info);
                }
                this.$router.push("/");
            }
            catch (error) {
                this.error = error;
                console.log(error.message);
                this.error_message = this.translations['error_messages'][error.message][this.language];
                if(error.message === "User is not confirmed."){
                    this.confirmPassword = true;
                }
            }
        },

        async confirmSignUp(){
            this.error_message = '';
            if(!this.code){
                this.error_message = this.translations['error_messages']['enter_code'][this.language];
                return;
            }
            try{
                await this.$store.dispatch("auth/confirmSIgnUp", {
                    username: this.username,
                    code: this.code,
                });
                await this.$store.dispatch("auth/login",{
                    username: this.username,
                    password: this.password,
                });
                ElMessage({
                    message: this.translations["confirm_signup_success_message"][this.language],
                    type: 'success',
                });
                this.$router.push("/");
                const userInfo = computed(() => this.$store.state.appGlobal.language).value;
                const newUserInfo = {
                    id: this.username,
                    username: this.username,
                    balance: userInfo.balance,
                    highestBalance: userInfo.highestBalance,
                    gamePlayed: userInfo.gamePlayed,
                    samePokerCnt: userInfo.samePokerCnt,
                    sameValueCnt: userInfo.sameValueCnt,
                    sameColorCnt: userInfo.sameColorCnt,
                    differentCnt: userInfo.differentCnt,
                    gameRecords: userInfo.gameRecords,
                    isEntryPaid: userInfo.isEntryPaid,
                    language: this.language,
                };
                await this.$store.dispatch("appGlobal/createUserInfo", newUserInfo);
            }
            catch (error){
                this.error = error;
                console.log(error.message);
                this.error_message = this.translations['error_messages'][error.message][this.language];
            }
        }
    },

}
</script>

<style scoped>

</style>