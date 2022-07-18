import { writable } from "svelte/store";
import common_config from "../../../common_config";

export const user = writable(null);

export const currentMenu = writable('home');

export const noImage = writable(`${common_config.baseURL}/images/smiley-cyrus.jpeg`);

