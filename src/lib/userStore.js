import { toast } from 'react-toastify';
import { create } from 'zustand'
import { db } from './firebse';
import { doc, getDoc } from 'firebase/firestore';

export const useUserStore = create((set) => ({
    curruser: null,
    isloading: true,
    fetchUser: async (uuid) => {
        if (!uuid) {
            set({ curruser: null, isLoading: false });
            return;
        }
        try {

            const docRef = doc(db, "users", uuid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                set({ curruser: docSnap.data(), isLoading: false });
            } else {
                toast.error("No such document!");
                set({ curruser: null, isLoading: false });
            }

        } catch (error) {
            console.error("Error fetching user:", error);
            toast.error(error.message || "An error occurred while fetching user data.");
            set({ curruser: null, isLoading: false });
        }
    }
}));