// Компонент _app.js служит своего рода обёртко над нашими страницами
// Component, который мы получаем из props, является текущей страницей. 
// СледовательноЮ любые свойства, которые ты передаёшь в Component получаем текущая страница
// pageProps - это объект с исходными свойствами, которые были предварительно загружены любым из data fetching методов
// Если pageProps не были загружены - это пустой объект

// import React from "react"
// import App from "next/app"
// // import Head from "next/head";
// // Components
// import Layout from "../components/Layout"
// // Оборачиваем компонент MyApp в withData, чтобы предоставить компонентам доступ к APOLLO/GRAPHQL
// // Это нужно для интеграции apollo в next.js 
// import withData from '../lib/apollo'

// class MyApp extends App {
//   render() {
//     const { Component, pageProps } = this.props;
//     return (
//       <>
//         {/* <Head>
//           <link
//             rel="stylesheet"
//             href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
//             integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
//             crossOrigin="anonymous"
//           />
//         </Head> */}
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//       </>
//     )
//   }
// }
// export default withData(MyApp)

import React from 'react'
import App from 'next/app'
import { ApolloProvider } from '@apollo/client'
// Apollo client
import { client } from '../lib/apollo'
// Components
import Layout from '../components/Layout'

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props

        return (
        <>
            <ApolloProvider client={client}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ApolloProvider>
        </>
        )
    }
}