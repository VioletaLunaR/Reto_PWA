import React, { useState, useEffect, } from "react";
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

const crypto = require("crypto");

function Joke() {

    var [joke, setJoke] = useState();
    var [characters, setCharacters] = useState([]);
    var ts = "characters";
    const url = 'https://gateway.marvel.com:443/v1/public/characters?apikey=';
    const publicKey = 'a4e4b48439d12a8dd0df40f6a8f4c00d';
    const privateKey = 'b95aacc55da1d587dc49da819e91bd8b39c68bb4';
    const hash = crypto.createHash("md5").update(ts + privateKey + publicKey).digest('hex');



    useEffect(() => {
        if (!navigator.onLine) {
            if (localStorage.getItem("characters") === null) {
                setCharacters("Loading...")
            } else {
                setCharacters(localStorage.getItem("characters"));

            }
        } else {
            fetch(url + publicKey + '&hash=' + hash + '&ts=' + ts).then(res => res.json()).then(res => {
                setCharacters(res.data.results);
                localStorage.setItem("characters", res.data.results);
                console.log(res.data.results);
            });
        }


    }, []);

    return (
        <>
            <h1>
                Characters:
            </h1>
            <CardGroup>
                {characters.map(d => {
                    return (
                        <>
                            <Card>
                                {/* <Card.Img variant="top" src={d.thumbnail + 'apikey=' + publicKey + '&hash=' + hash + '&ts=' + ts} /> */}
                                <Card.Body>
                                    <Card.Title>{d.name} </Card.Title>
                                    <Card.Text>
                                        {d.description}
                                    </Card.Text>
                                </Card.Body>
                                {/* <ListGroup className="list-group-flush">
                                    <ListGroupItem>Cras justo odio</ListGroupItem>
                                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                                </ListGroup> */}

                            </Card>

                        </>
                    )
                }
                )}
            </CardGroup>

        </>
    );

  



}

export default Joke;