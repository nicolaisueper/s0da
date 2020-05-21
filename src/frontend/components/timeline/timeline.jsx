import React, {useContext, useEffect, useState} from 'react';
import {addDays, format, subDays} from 'date-fns'
import {TimelineEntry} from "./timeline-entry";
import {SettingsContext} from "../../SettingsContext";
import Loader from "react-loader-spinner";

export const Timeline = props => {
    const settings = useContext(SettingsContext);
    let [incidents, setIncidents] = useState({});
    let [dates, setDates] = useState([]);
    let [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        setDates(
            Array.from({length: settings?.timespan})
                .map((_, idx) => format(subDays(startDate, idx), 'dd.MM.yyyy'))
        );
    }, [startDate, settings])

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
        setStartDate(subDays(startDate, settings?.timespan));
    }

    function nextDays() {
        setStartDate(addDays(startDate, settings?.timespan));
    }

    if (!settings?.timespan) return <Loader className={'loader'} type="Puff" color="#000" height={64} width={64}/>;

    return (
        <div id="status-timeline">
            <ul className="timeline">
                {dates.map((d, i) => <TimelineEntry key={i} date={d} incidents={incidents[d] || []}/>)}
            </ul>
            <div className={'pagination'}>
                <button onClick={previousDays}>Previous {settings?.timespan} days</button>
                <span>
                    {format(subDays(startDate, settings?.timespan), 'dd.MM.yyyy')}
                    &nbsp;-&nbsp;
                    {format(startDate, 'dd.MM.yyyy')}
                </span>
                <button className={format(startDate, 'dd.MM.yyyy') === format(new Date(), 'dd.MM.yyyy') ? 'hidden' : ''}
                        onClick={nextDays}>Next {settings?.timespan} days
                </button>
            </div>
        </div>
    )
};
