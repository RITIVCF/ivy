import { getUserIDList } from '/lib/users.js';

export {
	getFunnelData,
	loadData
}


function hexToRGB(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return {
					red: (c>>16)&255,
					green: (c>>8)&255,
					blue: c&255
				};
    }
    throw new Error('Bad Hex');
}

function colors(hex){
	const { red, green, blue } = hexToRGB(hex);
	let rgb = `${red}, ${green}, ${blue}`;
	return function (opacity) {
		return `rgba(${rgb}, ${opacity})`;
	}
}

const COLORS = {
	Contact: colors('#999'),
	Crowd: colors('#DECF3F'),
	Visitor: colors('#B276B2'),
	Member: colors('#FAA43A'),
	Server: colors('#60BD68'),
	Leader: colors('#5DA5DA'),
	Multiplier: colors('#F15854')
};


function getFunnelData(){
	let funnelData = [];
	const map = [
		{
			statuses: ["Contact", "Crowd","Visitor"],
			label: ""
		},
		{
			statuses: ["Member", "Server", "Leader", "Multiplier"],
			label: "Core"
		}
	];

	map.forEach( (blockTemplate) => {
		const block = loadBlock(blockTemplate);
		funnelData.push(block);
	});

	return funnelData;
}

function loadBlock(blockTemplate){
	let newBlock = new Block();
	newBlock.setLabel(blockTemplate.label);

	blockTemplate.statuses.forEach( (status) => {
		const newStack = loadStack(status);
		newBlock.addStack(newStack);
	});

	return newBlock;
}

function loadStack(stackStatus){
	let newStack = new Stack();
	newStack.setLabel(stackStatus);
	const statusCount = Funnel.find({status: stackStatus}).count();
	const memberCount = Funnel.find(
		{
			status: stackStatus,
			_id: {$in: getUserIDList({member: true})}
		}
	).count();

	const statusBarData = {
		label: "Total",
		count: statusCount,
		style: {
			backgroundColor: COLORS[stackStatus],
			opacity: "50%"
		}
	};

	const memberBarData = {
		label: "Members",
		count: memberCount,
		style: {
			backgroundColor: COLORS[stackStatus]
		}
	};

	const statusBar = loadBar(statusBarData);
	const memberBar = loadBar(memberBarData);
	newStack.addBar(statusBar);
	newStack.addBar(memberBar);
	return newStack;
}

function loadBar({label="", count=0, style={}}){
	let newBar = new Bar();
	newBar.setLabel(label);
	newBar.setCount(count);
	newBar.addStyle(style);

	return newBar;
}




class Block {
	constructor(){
		this.data = [];
		this.label = "";
		this.style = {};
	}

	addStack(stack){
		this.data.push(stack);
	}

	setLabel(newLabel){
		this.label = newLabel;
	}

	setStyle(newStyleObj){
		this.style = newStyleObj;
	}

	addStyle(newStyleObj){
		// Merge the style objects
		this.style = {...this.style, ...newStyleObj};
	}
}

class Stack {
	constructor(){
		this.bars = [];
		this.label = "";
	}

	addBar(bar){
		this.bars.push(bar);
	}

	setLabel(newLabel){
		this.label = newLabel;
	}
}

class Bar {
	constructor(){
		this.label = "";
		this.count = 0;
		this.style = {};
	}

	setLabel(newLabel){
		this.label = newLabel;
	}

	setCount(newCount){
		this.count = newCount;
	}

	setStyle(newStyleObj){
		this.style = newStyleObj;
	}

	addStyle(newStyleObj){
		// Merge the style objects
		this.style = {...this.style, ...newStyleObj};
	}
}


/*
[
  {
		data: [
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
*/


function loadCounts(status){
	const statusCount = Funnel.find({status: status}).count();
	const memberCount = Funnel.find(
		{
			status: status,
			_id: {$in: getUserIDList({member: true})}
		}
	).count();

	return {
		total: statusCount,
		members: memberCount
	}
}

function getWidth(num, denom){
	console.log("num: ", num);
	console.log("denom: ", denom);
	if(denom == 0) {
		return 0;
	} else {
		let width = num/denom;
		return width*100 + "%";
	}
}

function getOpacity(struct){
	const length = Object.keys(struct).length;
	const opacity = 1/length;
	return opacity;// + "%";
}


function loadData(){
	//const statuses = Funnel.distinct("status",{}); distinct does not exist on minimongo :'(
	const statuses = ["Contact", "Crowd", "Visitor", "Member", "Server", "Leader", "Multiplier"];
	let counts = {};
	let max = 0;
	let opacities = {};
	statuses.forEach( (status) => {
		counts[status] = loadCounts(status);
		opacities[status] = getOpacity(counts[status]);
		if ( counts[status].total > max ) {
			max = counts[status].total;
		}
	});

	return [
		{ /* Non-core Block */
			data: [
				{ /* Contact */
					bars: [
						{label: "Total", count: counts["Contact"].total, style: {
							width: getWidth( counts["Contact"].total, counts["Contact"].total ),
							backgroundColor: COLORS["Contact"](opacities["Contact"])
						}}, // Total
						// {label: "Members", count: counts["Contact"].members, style: {
						// 	width: getWidth( counts["Contact"].members, counts["Contact"].total ),
						// 	backgroundColor: COLORS["Contact"](opacities["Contact"])
						// }} // Members
					],
					style: {
						width: getWidth( counts["Contact"].total, max )
					},
					label: "Contact"
				},
				{ /* Crowd */
					bars: [
						{label: "Total", count: counts["Crowd"].total, style: {
							width: getWidth( counts["Crowd"].total, counts["Crowd"].total ),
							backgroundColor: COLORS["Crowd"](opacities["Crowd"])
						}}, // Total
						// {label: "Members", count: counts["Crowd"].members, style: {
						// 	width: getWidth( counts["Crowd"].members, counts["Crowd"].total ),
						// 	backgroundColor: COLORS["Crowd"](opacities["Crowd"])
						// }} // Members
					],
					style: {
						width: getWidth( counts["Crowd"].total, max )
					},
					label: "Crowd"
				},
				{ /* Visitor */
					bars: [
						{label: "Total", count: counts["Visitor"].total, style: {
							width: getWidth( counts["Visitor"].total, counts["Visitor"].total ),
							backgroundColor: COLORS["Visitor"](opacities["Visitor"])
						}}, // Total
						// {label: "Members", count: counts["Visitor"].members, style: {
						// 	width: getWidth( counts["Visitor"].members, counts["Visitor"].total ),
						// 	backgroundColor: COLORS["Visitor"](opacities["Visitor"])
						// }} // Members
					],
					style: {
						width: getWidth( counts["Visitor"].total, max )
					},
					label: "Visitor"
				}
			],
			label: "",
			style: {}
		},
		{ /* Core Block */
			data: [
				{ /* Member */
					bars: [
						// {label: "Total", count: counts["Member"].total, style: {
						// 	width: getWidth( counts["Member"].total, counts["Member"].total ),
						// 	backgroundColor: COLORS["Member"](opacities["Member"])
						// }}, // Total
						{label: "Members", count: counts["Member"].members, style: {
							width: getWidth( counts["Member"].members, counts["Member"].total ),
							backgroundColor: COLORS["Member"](opacities["Member"])
						}} // Members
					],
					style: {
						width: getWidth( counts["Member"].total, max )
					},
					label: "Member"
				},
				{ /* Server */
					bars: [
						{label: "Total", count: counts["Server"].total, style: {
							width: getWidth( counts["Server"].total, counts["Server"].total ),
							backgroundColor: COLORS["Server"](opacities["Server"])
						}}, // Total
						{label: "Members", count: counts["Server"].members, style: {
							width: getWidth( counts["Server"].members, counts["Server"].total ),
							backgroundColor: COLORS["Server"](opacities["Server"])
						}} // Members
					],
					style: {
						width: getWidth( counts["Server"].total, max )
					},
					label: "Server"
				},
				{ /* Leader */
					bars: [
						{label: "Total", count: counts["Leader"].total, style: {
							width: getWidth( counts["Leader"].total, counts["Leader"].total ),
							backgroundColor: COLORS["Leader"](opacities["Leader"])
						}}, // Total
						{label: "Members", count: counts["Leader"].members, style: {
							width: getWidth( counts["Leader"].members, counts["Leader"].total ),
							backgroundColor: COLORS["Leader"](opacities["Leader"])
						}} // Members
					],
					style: {
						width: getWidth( counts["Leader"].total, max )
					},
					label: "Leader"
				},
				{ /* Multiplier */
					bars: [
						{label: "Total", count: counts["Multiplier"].total, style: {
							width: getWidth( counts["Multiplier"].total, counts["Multiplier"].total ),
							backgroundColor: COLORS["Multiplier"](opacities["Multiplier"])
						}}, // Total
						{label: "Members", count: counts["Multiplier"].members, style: {
							width: getWidth( counts["Multiplier"].members, counts["Multiplier"].total ),
							backgroundColor: COLORS["Multiplier"](opacities["Multiplier"])
						}} // Members
					],
					style: {
						width: getWidth( counts["Multiplier"].total, max )
					},
					label: "Multiplier"
				}
			],
			label: "Core",
			style: {
				border: "solid 2px black"
			}
		}
	];
}
