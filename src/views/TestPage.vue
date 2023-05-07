<template>
    <div>
        <h3 class="text-3xl">Create Or Choose An User</h3>
        <div class="flex flex-col m-auto w-64">
            <input
                    class="my-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    placeholder="Album Name..."
                    type="text"
                    v-model="userName"
            />
            <button class="btn-blue mb-4" @click="createAlbum()">Create User</button>
            <button class="btn-blue mb-4" @click="getCurrentUser()">Current User Info</button>
        </div>
        <div class="text-red-500">{{ error }}</div>
        <hr />
        <h5 class="mt-4 text-2xl">List Of Users</h5>
        <div class="flex flex-wrap w-full m-auto justify-center">
            <div
                    v-for="(user, idx) in userInfo"
                    :key="idx"
                    class="cursor-pointer mt-4 ml-4 w-3/12 h-24 shadow-xl flex items-center justify-center"
            >
                <div class="text-2xl">{{ user.username }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        async mounted() {
            try{
                this.$store.dispatch("appGlobal/getUsersData");
            }
            catch (error){
                console.log(error);
            }
        },
    data: () => ({ userName: "", error: "" }),
    methods: {
        async createAlbum() {
            this.error = "";
            if (!this.userName) {
                this.error = "Please enter a user name";
                return;
            }
            const newUserInfo = {
                id: this.userName,
                username: this.userName,
                balance: 100,
                gamePlayed: 20
            };
            this.$store.dispatch("appGlobal/createUserInfo", newUserInfo);
        },
        async getCurrentUser(){
            try{
                const currentUser = await this.$store.dispatch("appGlobal/getUserInfo", 123);
                if(currentUser.data.getUserInfo == null){
                    console.log("not exist");
                }
                console.log(currentUser);
            }
            catch (error){
                console.log(error.errors);
            }
        }
    },
    computed: {
        ...mapGetters({
            user: "auth/user",
            userInfo: "appGlobal/userInfo",
        }),
    },
};
</script>

<style lang="scss" scoped>
</style>