import {createStore} from "vuex";
import {collection, query, where, orderBy, getDocs} from "firebase/firestore";
import {db} from "../shared/services/firebase.ts";
import {Message} from "../shared/model/message";

export default createStore({
    state: {
        userId: '',
        messages: [] as Message[],
        logged: '',
    },
    mutations: {
        setUserId(state: any, payload: any) {
            state.userId = payload;
        },
        setLogged(state: any, payload: any) {
            state.logged = payload;
        },
        setMessages(state: any, payload: any) {
            state.messages = payload;
        },
    },
    actions: {
        async getMessages({commit, state}) {
            try {
                const messageCollection = collection(db, "messages");
                const messagesQuery = query(messageCollection,orderBy("date") , where("userId", "in", [state.userId, state.logged]));
                const messagesSnapshot = await getDocs(messagesQuery);
                const messages: Message[] = [];
                messagesSnapshot.forEach((doc) => {
                    messages.push(doc.data() as Message);
                });
                commit("setMessages", messages);
            } catch (error) {
                console.error(error);
            }
        },
    },
    modules: {},
});