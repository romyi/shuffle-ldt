import { atom } from "recoil";

export const drawer_state = atom({
    key: 'drawer-state',
    default: {
        isOpen: false
    }
})