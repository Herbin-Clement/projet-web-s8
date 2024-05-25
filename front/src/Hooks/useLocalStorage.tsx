import { useState } from "react";

export const useLocalStorage = (key: string, defValue: string) => {

    const [stored, setStored] = useState(() => {
        try {
            const value = window.localStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(key, JSON.stringify(defValue));
                return defValue;
            }
        } catch (error) {
            return defValue;
        }
    });

    const setValue = (value: string) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
        setStored(value);
    };

    return [stored, setValue];
};