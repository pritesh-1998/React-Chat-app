import { toast } from 'react-toastify';
import { create } from 'zustand'
import { db } from './firebse';
import { doc, getDoc } from 'firebase/firestore';
import { useUserStore } from './userStore';

export const userChatStore = create((set, get) => ({
    chatid: null,
    user: null,
    iscurruserBlocked: false,
    isReceiverBlocked: false,
    changeChat: async (chatid, user) => {
        const curruser = useUserStore.getState().curruser;

        // check if the current user is blocked
        if (user.blocked && user.blocked.includes(curruser.id)) {
            return set({
                chatid,
                user: null,
                iscurruserBlocked: true,
                isReceiverBlocked: false,
            });
        } else if (curruser.blocked && curruser.blocked.includes(user.id)) {
            return set({
                chatid: null,
                user: user,
                iscurruserBlocked: false,
                isReceiverBlocked: true,
            });
        } else {
            return set({
                chatid: chatid,
                user: user,
                iscurruserBlocked: false,
                isReceiverBlocked: false,
            });
        }
    },
    changeblock: () => {
        set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }))
    }
}));