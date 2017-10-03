import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FunnelBlock from './FunnelBlock.jsx';

const data = [
  {data: [
      {bars: [
        {label: "Bar1", count: 20, style: {width: "100px"}},
        {label: "Bar2", count: 10, style: {backgroundColor: 'blue'}},
        {label: "Bar3", count: 5, style: {backgroundColor: 'green', width: "10px"}}
        ],
        label: "Multiplier"
      },
      {bars: [
        {label: "Bar4", count: 20, style: {width: "100px"}},
        {label: "Bar5", count: 10, style: {backgroundColor: 'blue'}},
        {label: "Bar6", count: 5, style: {backgroundColor: 'green', width: "10px"}}
        ],
        label: "Leader"
      }
    ],
    label: "core",
    style: {border: "2px solid black"}
  },
  {data: [
      {bars: [
        {label: "Bar7", count: 20, style: {width: "100px"}},
        ],
        label: "Crowd"
      },
      {bars: [
        {label: "Bar8", count: 20, style: {width: "100px"}},
        {label: "Bar9", count: 10, style: {backgroundColor: 'blue'}}
        ],
        label: "Visitor"
      }
    ],
    label: "block2",
    style: {border: "2px solid black"}
  }
]

export default class FunnelContainer extends TrackerReact(React.Component) {
	constructor() {
		super();

	}

  render() {
    return(
      <div>
        {data.map( (block, i) => {
          return <FunnelBlock key={i} block={block} />
        })}
      </div>
    )
  }
}
