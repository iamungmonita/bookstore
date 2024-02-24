import React from 'react'
import Head from 'next/head'
const index = ({ children }) => {
    return (
        <Head>
            <title>{children}</title>
        </Head>
    )
}

export default index