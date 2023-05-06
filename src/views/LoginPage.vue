<template>
    <div>
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
            <div class="flex flex-col mt-10">
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
        <div class="text-red-600">{{ error.message }}</div>
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
        error: ""
    }),
    methods:{
        ...mapActions({
            loginVue: "auth/login"
        }),
        async login(){
            try{
                await this.loginVue({
                    username: this.username,
                    password: this.password
                });
                this.$router.push("/");
            }
            catch (error) {
                this.error = error;
            }
        }
    },
    setup(){
        const language = computed(() => useStore().state.appGlobal.language);
        const translations = computed(() => useStore().state.appGlobal.translations);
        return{
            language, translations
        };
    }
}
</script>

<style scoped>

</style>