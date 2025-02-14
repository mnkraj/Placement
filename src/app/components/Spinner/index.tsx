import React from 'react'
import { SyncLoader } from 'react-spinners'
import "./Styles.css"
const index = () => {
    return (
        <div>
            <div className="spinner-container">
                <SyncLoader color="#FFD60A" size={25} />
            </div>
        </div>
    )
}

export default index
