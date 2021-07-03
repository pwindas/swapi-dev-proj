import React from 'react';
import Person from '../Person/Person';
import { Grid } from 'semantic-ui-react';

const People = ({characterData}) =>{
    return(
        <Grid columns={5}>
            {
            // map through each person and render them in the Grid
             characterData.map((person, i) => {
                return (
                    <Grid.Column key={i}>
                        <Person key={person.Name} characterData={person}/>
                    </Grid.Column>
                )
             })
            }
        </Grid>
    )
}
export default People;