import React from 'react';

export const TimelineIncident = props => {
    let incident = props.incident;
    return (
        <li className={"timeline-incident " + incident.status}>
            <div className="timeline-incident__wrapper">
                <h4 className="incident-title">{incident.title}</h4>
                <p className="incident-details">{incident.description}</p>
            </div>
        </li>
    )
};
