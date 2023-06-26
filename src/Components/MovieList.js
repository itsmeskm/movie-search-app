import React from 'react'
import {randomImage} from '../Assests/index.js'

const MovieList = (props) => {
    let { title,language, vote } = props;
    let urlToImage= randomImage();
    return (
        <div className='container my-4'>
            <div className="card m-3" style={{ width: "18rem" }}>
                <img className="card-img-top" src={urlToImage} alt="Not found" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text"> {language}</p>
                </div>
                <div className="card-footer bg-transparent border-success">{vote} votes</div>
            </div>
        </div>
    )
}

export default MovieList
