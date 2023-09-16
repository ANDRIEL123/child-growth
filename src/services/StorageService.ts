'use client'

export const setItem = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
    }
};

export const getItem = (key: string) => {
    if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key);

        return item;
    }

    return null;
};

export const removeItem = (key: string) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};
