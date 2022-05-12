import * as prismic from "@prismicio/client";
import { env } from "process";

export const ignewswar = 'ignewswar';

export const client = prismic.createClient(ignewswar, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,

    //Which route the posts should lead to
    routes: [
        {
            type: 'posts',
            path: '/posts',
        }
    ]
});