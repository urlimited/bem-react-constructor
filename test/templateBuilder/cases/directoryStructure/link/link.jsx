import React from "react";

export const Link = ({classes, children}) => {
    const classesProcessed = classes.reduce((accum, next) => {
        return accum + " " + next;
    }, "").trim();

    return <>
        <p className={classesProcessed}>Link</p>
        {children.map((c, k) => <div key={k}>{c}</div>)}
    </>
}

export default Link;