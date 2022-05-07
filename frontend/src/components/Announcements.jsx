import { makeStyles } from '@material-ui/core'
import React from 'react'
import Announcement from './Announcement';



const useStyle = makeStyles((theme) => ({
    containerfeedStyle: {
        margin: theme.spacing(1),
        marginRight: theme.spacing(2),
        backgroundColor: "white",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
    },
    antTitle: {
        backgroundColor: "#14ffd4",
        fontSize: "25px",
        fontWeight: "500",
        textAlign: "center",
        margin: theme.spacing(1),
        marginRight: theme.spacing(0),
        padding: theme.spacing(1),
        borderRadius: "10px",
    }
}))
export default function Announcements({ announcements }) {
    const classes = useStyle();
    return (
        <div >
            <div container className={classes.containerfeedStyle}>
                <div className={classes.antTitle}>
                    Announcements
                </div>
                {announcements.map(a => (
                    <Announcement ant={a} />
                ))}

            </div>
        </div>
    )
}
