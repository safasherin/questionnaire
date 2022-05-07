import { MenuItem, makeStyles, FormControl, InputLabel, Select } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => (
    {
        formControlStyle: {
            width: "100%"
        },
        inputLabelStyle: {
            width: "290%",
        },
    }
)
)
export default function SelectExpertise() {
    const [expertise, setexpertise] = useState('');
    const classes = useStyles();
    const handleChange = (event) => {
        setexpertise(event.target.value);
    };

    return (
        <div>

            <FormControl className={classes.formControlStyle}>
                <InputLabel
                    className={classes.inputLabelStyle}
                    required
                >Expertise Level</InputLabel>
                <Select

                    value={expertise}
                    onChange={handleChange}
                >
                    <MenuItem value="" >
                        <em >None</em>
                    </MenuItem>
                    <MenuItem

                        value={10}>Beginner</MenuItem>
                    <MenuItem

                        value={20}>Intermediate</MenuItem>
                    <MenuItem

                        value={30}>Expert</MenuItem>
                </Select>
            </FormControl>

        </div>
    );
}
