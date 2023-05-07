<template>
    <div>
        <el-alert v-if="this.error!==''" :title="this.error" type="error" />
        <form v-if="!confirmPassword" class="flex flex-col items-center" @submit.prevent="signUp">
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
        <div v-if="error" class="text-red-600">{{ error.message }}</div>
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
import {computed} from "@vue/runtime-core";
import {useStore} from "vuex";

export default {
    name: "SignUpPage",
    data: () => ({
        username: '',
        password: '',
        email: '',
        error: '',
        confirmPassword: '',
        code: '',
    }),
    methods:{
        async signUp(){
            this.error = '';
            if(!this.username || !this.password){
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
                this.confirmPassword = true;
            }
            catch(error){
                this.error = error;
            }
        },

        async confirmSignUp(){
            this.error = '';
            if(!this.username || !this.code){
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

            }
            catch (error){
                console.log(error);
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
    },
};
</script>

<style scoped>

</style>