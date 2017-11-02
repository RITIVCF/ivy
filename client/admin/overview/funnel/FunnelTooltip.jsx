import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default function FunnelTooltip({label="", bars}){
  return(
    <div className="funnel-tooltip">
      <span>{label}</span>
      {bars.map( (bar, i) => {
        return <span key={i}>{bar.label}: {bar.count}</span>
      })}
    </div>
  )
}
