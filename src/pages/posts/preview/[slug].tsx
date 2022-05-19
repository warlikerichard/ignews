import { RichText } from "prismic-dom";
import { GetStaticProps } from "next";
import { client } from "../../../services/prismic";

import styles from '../post.module.scss';

import Head from 'next/head'
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostPreviewProps{
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({post}: PostPreviewProps){
    const {data} = useSession();
    const router = useRouter();

    useEffect(() => {
        if(data?.activeSubscription){
            router.push(`/posts/${post.slug}`)
        }
    }, [data])

    return(
        <>
            <Head>
                <title>{post.title} │ Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                    className= {`${styles.content} ${styles.previewContent}`}
                    dangerouslySetInnerHTML={{__html: post.content}} />
                    
                    <div className= {styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a>
                                Subscribe now 🤗
                            </a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}

export const getStaticPaths = ()=>{
    return{
        paths: [],
        fallback: 'blocking',
    }
} 

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {slug} = params;

    try{
        const response = await client.getByUID('publication', String(slug))

        const post = {
            slug,
            title: RichText.asText(response.data.title),
            content: RichText.asHtml(response.data.content.splice(0, 3)),
            updatedAt: new Date(response.last_publication_date).toLocaleString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }),
        }

        return{
            props:{
                post,
            },
            revalidate: 60*30 // 30 minutes
        }
    }
    catch{
        console.log('Loading...')
        return{
            props:{
                post:{
                    slug: 'not-found',
                    title: 'There was a problem in finding this page...',
                    content: 'Go to the website\'s home ',
                    updatedAt: ''
                }
            }
        }
    }
    
} 