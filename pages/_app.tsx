import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {UserProvider} from '@auth0/nextjs-auth0';
import Head from 'next/head';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Sommelier AI — Order &amp; Chaos</title>
                <meta
                    name="description"
                    content="Generate wine tasting notes &amp; find recommendations"
                />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#39393D"/>
                <meta name="msapplication-TileColor" content="#39393d"/>
                <meta name="theme-color" content="#39393d"/>
            </Head>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </>
    )
}

export default MyApp
