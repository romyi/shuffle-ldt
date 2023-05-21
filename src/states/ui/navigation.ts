import { atom } from "recoil";

export const nav_drawer_state = atom({
    key: 'drawer-navigation',
    default: {
        isOpen: false
    }
})