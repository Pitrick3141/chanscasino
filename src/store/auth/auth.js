import {Auth} from "aws-amplify";
export const auth = {

    namespaced: true,
    state: {user: null},
    mutations: {
        setUser(state, payload){
            state.user = payload;
        }
    },
    actions: {
        async logout({commit}){
            commit("setUser", null);
            return await Auth.signOut();
        },
        async login({commit}, {username, password}){
            try{
                await Auth.signIn({
                    username, password
                });

                const userInfo = await Auth.currentUserInfo();

                commit("setUser", userInfo);
                return Promise.resolve("Success");
            }
            catch(error){
                console.log(error);
                return Promise.reject(error);
            }
        },
        async signUp(_, {username, password, email}){
            try{
                await Auth.signUp({
                    username,
                    password,
                    attributes: {
                        email
                    }
                });
                return Promise.resolve("Success");
            }
            catch(error){
                console.log(error);
                return Promise.reject(error);
            }
        },
        async authAction({commit}){
            try{
                const userInfo = await Auth.currentUserInfo();
                commit("setUser", userInfo);
                return userInfo;
            }
            catch (error){
                console.log("[ERROR] Auto Login Failed: ", error);
                return null;
            }
        }
    },
    getters:{
        user: (state) =>  state.user
    }
}