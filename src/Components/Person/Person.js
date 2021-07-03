import React from 'react';
import { Card } from 'semantic-ui-react';

const Person = ({ characterData }) => {
    return (
        // render each person in their own Card component
        <Card>
            <Card.Content>
                <Card.Header>{characterData.Name}</Card.Header>
                <Card.Description>
                    <strong>Films</strong>
                    {characterData.Films.map((film) => {
                        return (<div><p key={film}>{film}</p></div>)
                    })}
                    <strong>Species</strong>
                    {characterData.Species.map((species) => {
                        return (<div><p key={species}>{species}</p></div>)
                    })}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Person;