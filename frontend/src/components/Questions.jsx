import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import Question from './Question'



const useStyle = makeStyles((theme) => ({
    containerfeedStyle: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(0),
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
    },
    questionTitle: {

        backgroundColor: "#14ffd4",
        fontSize: "25px",
        fontWeight: "500",
        textAlign: "center",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        borderRadius: "10px",
    },

    loadmorebtnStyle: {
        border: "none",
        fontSize: "large",
        fontWeight: "500",
        marginBottom: "10px",
        backgroundColor: "white",
        margin: theme.spacing(1),
        borderRadius: "10px",
        cursor: "pointer"
    }
}))
export default function Questions({ posts }) {
    // console.log(posts)
    const classes = useStyle();
    const [loadValue, setLoadValue] = useState(3);
    const handleLoadMore = () => {
        setLoadValue((prevValue) => prevValue + 3);
    }
    return (
        <div >
            <div
                className={classes.containerfeedStyle}
            >
                <div className={classes.questionTitle}>
                    Questions
                </div>

                {posts.slice(0, loadValue).map((p) => (
                    <Question post={p} />

                ))}
                {
                    posts.length > loadValue &&
                    <button className={classes.loadmorebtnStyle} onClick={handleLoadMore}>Click here to load more...</button>
                }
            </div>
        </div >
    )
}
