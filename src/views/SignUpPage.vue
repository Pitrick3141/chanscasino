<template>
    <div>
        <el-alert v-if="this.error_message!==''" :title="this.error_message" type="error" />
        <form class="flex flex-col items-center" @submit.prevent="signUp">
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
                        id="password"
                        v-model="password"
                />
            </div>
            <div class="flex flex-col mt-2">
                <label class="block text-gray-700 text-sm font-bold" for="email">{{ translations['auth_email'][language] }}</label>
                <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        id="email"
                        v-model="email"
                />
            </div>
            <button class="btn-blue">{{ translations['auth_signup'][language] }}</button>
        </form>
    </div>
</template>

<script>
import {computed} from "@vue/runtime-core";
import {useStore} from "vuex";

export default {
    name: "SignUpPage",
    data: () => ({
        username: '',
        password: '',
        email: '',
        error: '',
        error_message: '',
        code: '',
    }),
    methods:{
        async signUp(){
            this.error_message = '';
            if(!this.username){
                this.error_message = this.translations['error_messages']['enter_username'][this.language];
                return;
            }
            if(!this.password){
                this.error_message = this.translations['error_messages']['enter_password'][this.language];
                return;
            }
            if(!this.email){
                this.error_message = this.translations['error_messages']['enter_email'][this.language];
                return;
            }
            try{
                await this.$store.dispatch("auth/signUp", {
                    username: this.username,
                    password: this.password,
                    email: this.email
                });
                ElMessage({
                    message: this.translations["signup_success_message"][this.language],
                    type: 'success',
                });
                await this.$store.dispatch("auth/login",{
                    username: this.username,
                    password: this.password,
                });
                ElMessage({
                    message: this.translations["signup_success_message"][this.language],
                    type: 'info',
                });
                const userInfo = computed(() => this.$store.state.appGlobal.userInfo).value;
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
                ElMessage({
                    message: this.translations["signup_success_message"][this.language],
                    type: 'success',
                });
                this.$router.push("/");
            }
            catch(error){
                this.error = error;
                console.log(error.message);
                this.error_message = this.translations['error_messages'][error.message][this.language];
            }
        },
    },
    setup(){
        const language = computed(() => useStore().state.appGlobal.language);
        const translations = computed(() => useStore().state.appGlobal.translations);
        document.title = translations.value['signup_title'][language.value];
        return{
            language, translations
        };
    },
};
</script>

<style scoped>

</style>