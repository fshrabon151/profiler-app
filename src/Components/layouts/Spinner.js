import React from 'react'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px'}}>
            <Loader
        type="Bars"
        color="#1976D2"
        height={50}
        width={50}
        
      
      />

            
        </div>
    )
}

export default Spinner
