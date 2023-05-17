<template>
    <div>
        <el-alert v-if="this.error_message!==''" :title="this.error_message" type="error" />
        <form class="flex flex-col items-center" @submit.prevent="login">
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
    }),
    setup(){
        const language = computed(() => useStore().state.appGlobal.language);
        const translations = computed(() => useStore().state.appGlobal.translations);
        document.title = translations.value['login_title'][language.value];

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
                    console.log("[ERROR] Error occurred in setUserInfo: ", info);
                }
                this.$router.push("/");
            }
            catch (error) {
                this.error = error;
                console.log("[ERROR] Error occurred in Login: ", error.message);
                this.error_message = this.translations['error_messages'][error.message][this.language];
            }
        },
    },
}
</script>

<style scoped>

</style>