import React, { useState, useEffect } from "react";

function Joke() {

    var [joke, setJoke] = useState();
    var text;

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("joke") === null) {
                setJoke("Loading...")
            } else {
                setJoke(localStorage.getItem("joke"));
            }
        } else {
            const URL = "https://api.chucknorris.io/jokes/random";
            fetch(URL).then(res=>res.json()).then(res=>{
                setJoke(res.value);
                localStorage.setItem("joke", res.value);
            })
        }
    }, []);

    return (
        <>
            <h1>
                {text}
            </h1>
            <p>
                {joke}
            </p>
        </>
    );
}

export default Joke;