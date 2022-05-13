import {createClient} from "@prismicio/client";

export const ignewswar = 'ignewswar';

export const client = createClient(ignewswar, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,

    //Which route the posts should lead to
    routes: [
        {
            type: 'publication',
            path: '/posts',
        }
    ]
});