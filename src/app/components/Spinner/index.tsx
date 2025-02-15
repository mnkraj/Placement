import React from 'react'
import { ClipLoader } from 'react-spinners'
import "./Styles.css"
const index = () => {
    return (
        <div>
            <div className="spinner-container">
                <ClipLoader color="#FFD60A" size={60} />
            </div>
        </div>
    )
}

export default index
