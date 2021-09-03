import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import Layout from "../components/layout/layout";
import {Provider} from "next-auth/client";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider session={pageProps.session}>
            <Layout>
                <Head>
                    <title>Next Typescript App</title>
                    <meta name="description" content="Generated by create next app"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}
export default MyApp
