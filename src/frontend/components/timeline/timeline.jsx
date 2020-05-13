import React, {useEffect, useState} from 'react';
import {addDays, format, subDays} from 'date-fns'
import {TimelineEntry} from "./timeline-entry";

const timeRange = 10; //TODO make configurable

export const Timeline = props => {
    let [incidents, setIncidents] = useState({});
    let [dates, setDates] = useState([]);
    let [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        setDates(
            Array.from({length: timeRange})
                .map((_, idx) => format(subDays(startDate, idx), 'dd.MM.yyyy'))
        );
    }, [startDate])

    useEffect(() => {
        fetch('/api/incidents').then(res => res.json()).then(res => {
            setIncidents(res.incidents.reduce((orderedIncidents, current) => {
                if (!orderedIncidents[current.date]) {
                    orderedIncidents[current.date] = [];
                }
                orderedIncidents[current.date].push(current);
                return orderedIncidents;
            }, {}));
        });
    }, []);

    function previousDays() {
        setStartDate(subDays(startDate, timeRange));
    }

    function nextDays() {
        setStartDate(addDays(startDate, timeRange));
    }

    return (
        <div id="status-timeline">
            <ul className="timeline">
                {dates.map((d, i) => <TimelineEntry key={i} date={d} incidents={incidents[d] || []}/>)}
            </ul>
            <div className={'pagination'}>
                <button onClick={previousDays}>Previous {timeRange} days</button>
                <span>
                    {format(subDays(startDate, timeRange), 'dd.MM.yyyy')}
                    &nbsp;-&nbsp;
                    {format(startDate, 'dd.MM.yyyy')}
                </span>
                <button className={format(startDate, 'dd.MM.yyyy') === format(new Date(), 'dd.MM.yyyy') ? 'hidden' : ''}
                        onClick={nextDays}>Next {timeRange} days
                </button>
            </div>
        </div>
    )
};
