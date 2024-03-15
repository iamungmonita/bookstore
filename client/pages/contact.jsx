import { NavBar } from '@/core/components'
import React, { useState } from 'react'

const contact = () => {
    const [textArea, setTextArea] = useState('')
    console.log(textArea);
    return (
        <div>
            <NavBar />


        </div>
    )
}

export default contact