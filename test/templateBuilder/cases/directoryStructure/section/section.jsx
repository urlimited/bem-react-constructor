import React from "react";

export const Section = ({classes, children}) => {
    const classesProcessed = classes.reduce((accum, next) => {
        return accum + " " + next;
    }, "").trim();

    return <>
        <p className={classesProcessed}>Section</p>
        {children.map((c, k) => <div key={k}>{c}</div>)}
    </>
}

export default Section;