import Head from 'next/head';
import styles from './styles.module.scss';
import {client} from '../../services/prismic';
import { GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import Link from 'next/link';

type Post = {
    slug, title, excerpt, updatedAt: string
}

interface PostsProps{
    posts: Post[]
}

export default function Posts({posts} : PostsProps){


    return(
        <>
            <Head>
                <title>Posts │ Ignews</title>
            </Head>
            <main className = {styles.container}>
                <div className = {styles.posts}>
                    {posts.map(post =>
                        (
                            <Link href={`/posts/${post.slug}`} key={post.slug}>
                                <a key={post.slug}>
                                    <time>{post.updatedAt}</time>
                                    <strong>{post.title}</strong>
                                    <p>{post.excerpt}</p>
                                </a>
                            </Link>
                        )
                    )}
                </div>
            </main>
        </>
    );
}

export const getStaticProps : GetStaticProps = async () => {
    const response = await client.get()

    const posts = response.results.map(post => {
        return{
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph' && content.text !== '')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }),
        }
    })
    return{
        props: {
            posts
        },
        revalidate: 60*60*1, //1
    }
}