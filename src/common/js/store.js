import { writable } from "svelte/store";

export const user = writable(null);

export const currentMenu = writable('home');

export const noImage = writable('https://api.realworld.io/images/smiley-cyrus.jpeg');