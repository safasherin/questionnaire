import React from 'react'
import { Grid, makeStyles } from "@material-ui/core";
import Logo2sample from '../Logo2sample.jpg';

const useStyle = makeStyles((theme) => ({
    cardStyle: {
        display: "flex",
    },
    articleImg: {
        width: "100%",
        height: "auto"
    }
})
)


export default function Header() {
    const classes = useStyle();
    return (
        <div >
            <Grid container className={classes.cardStyle}>
                <Grid item className={classes.cardItemStyle}>
                </Grid>
            </Grid>
            <Grid item className={classes.carditemStyleimg} >
                <img className={classes.articleImg}
                    src={Logo2sample}
                    alt="img"
                />
            </Grid>

        </div>
    )
}
