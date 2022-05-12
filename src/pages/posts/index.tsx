import Head from 'next/head';
import styles from './styles.module.scss';
import { usePrismicDocuments } from '@prismicio/react';

export default function Posts(){

    const [document] = usePrismicDocuments();
    console.log(document)

    return(
        <>
            <Head>
                <title>Posts │ Ignews</title>
            </Head>
            <main className = {styles.container}>
                <div className = {styles.posts}>
                    <a href="">
                        <time>12 de março de 2016</time>
                        <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
                        <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process.</p>
                    </a>
                    <a href="">
                        <time>12 de março de 2016</time>
                        <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
                        <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process.</p>
                    </a>
                    <a href="">
                        <time>12 de março de 2016</time>
                        <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
                        <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process.</p>
                    </a>
                </div>
            </main>
        </>
    );
}