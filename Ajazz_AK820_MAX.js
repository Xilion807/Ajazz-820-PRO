export function Name() { return "Ajazz AK820 MAX"; }
export function VendorId() { return 0x0416; }
export function ProductId() { return 0x7372; }
export function Publisher() { return "VitorTaichou"; }
export function Documentation(){ return "troubleshooting/brand"; }
export function Size() { return [16,7]; }
export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
	];
}

const keyboardLayout = [
    "esc", "f.1", "f.2", "f.3", "f.4", "f.5", "f.6", "f.7", "f.8", "f.9", "f10", "f11", "f12", "del",              
	"til", "001", "002", "003", "004", "005", "006", "007", "008", "009", "000", "---", "===", "bks",        "hom",
	"tab", "qqq", "www", "eee", "rrr", "ttt", "yyy", "uuu", "iii", "ooo", "ppp", "[[[", "]]]", "\\_",        "pup",
	"cap", "aaa", "sss", "ddd", "fff", "ggg", "hhh", "jjj", "kkk", "lll", ";;;", "'''",        "ent",        "pdn",
	"sfl",        "zzz", "xxx", "ccc", "vvv", "bbb", "nnn", "mmm", ",,,", "...", "///",        "sfl", "upr", "end",
	"ctl", "win", "atl",                      "spc",                      "atr", "fun", "ctr", "lef", "dwn", "rgt" 
];

var vLedNames = keyboardLayout; 

var vLedPositions = [
	[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], 
	[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1],          [15, 1],
	[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2],          [15, 2],
	[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],          [13, 3],          [15, 3],
	[0, 4],         [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],          [13, 4], [14, 4], [15, 4],
	[0, 5], [1, 5], [2, 5],                         [6, 5],                         [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5]
];

let colorsIndex = -1;
const headerSequence = [ 
	[ 0x01, 0x0f, 0x00, 0x00, 0x00, 0x36 ], 
	[ 0x01, 0x0f, 0x00, 0x00, 0x01, 0x36 ], 
	[ 0x01, 0x0f, 0x00, 0x00, 0x02, 0x36 ], 
	[ 0x01, 0x0f, 0x00, 0x00, 0x03, 0x36 ], 
	[ 0x01, 0x0f, 0x00, 0x00, 0x04, 0x36 ], 
	[ 0x01, 0x0f, 0x00, 0x00, 0x05, 0x36 ], 
	[ 0x01, 0x0f, 0x00, 0x00, 0x06, 0x36 ], 
	[ 0x01, 0x0f, 0x00, 0x00, 0x07, 0x12 ], 
	[ 0x01, 0x0f, 0x01, 0x00, 0x00, 0x36 ], 
	[ 0x01, 0x0f, 0x01, 0x00, 0x01, 0x36 ], 
	[ 0x01, 0x0f, 0x01, 0x00, 0x02, 0x36 ], 
];

export function Initialize() {
	device.log("Lets get started!");
	device.setControllableLeds(keyboardLayout, vLedNames);
	let start1 = [
		0x01, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
	  ];
	  
	let start2 = [
		0x01, 0x17, 0x00, 0x00, 0x00, 0x01, 0x01, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
	];
	  
	device.write(start1, 65);
	device.write(start2, 65);
}

export function LedNames() {

}

export function LedPositions() {

}

export function Render() {
	sendColors();
}

export function Shutdown() {

}

export function Validate(endpoint) {
	return endpoint.interface === 2 && endpoint.usage === 0x0091 && endpoint.usage_page === 0xff1b && endpoint.collection === 0x0000;
}

export function ImageUrl() {
	return "";
}

function hexToRgb(hex) {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	let colors = [];
	colors[0] = parseInt(result[1], 16);
	colors[1] = parseInt(result[2], 16);
	colors[2] = parseInt(result[3], 16);
	return colors;
}

function getColorIndex(resetCount)
{
	if(resetCount)
	{
		colorsIndex = -1;
	}
	else
	{
		colorsIndex++;
		return colorsIndex;
	}
}

function sendColors(shutdown = false) {
	// Packet Example:
	// 010f00000036   2faced 000000 2faced 2faced 2faced 2faced 000000 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 000000 000000 000000 00
	// 010f00000136   000000 000000 000000 000000 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 000000 000000 00
	// 010f00000236   2faced 2faced 000000 000000 000000 000000 000000 000000 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 000000 00
	// 010f00000336   2faced 2faced 2faced 000000 2faced 2faced 000000 000000 000000 000000 000000 000000 2faced 000000 2faced 2faced 2faced 2faced 000000 00
	// 010f00000436   2faced 2faced 2faced 2faced 2faced 2faced 2faced 000000 2faced 2faced 000000 000000 000000 000000 000000 000000 2faced 000000 000000 00
	// 010f00000536   2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 2faced 000000 2faced 2faced 2faced 000000 000000 000000 000000 000000 00
	// 010f00000636   000000 000000 2faced 2faced 2faced 000000 000000 000000 2faced 000000 000000 000000 2faced 2faced 2faced 2faced 2faced 2faced 000000 00
	// 010f00000712   000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 00
	// 010f01000036   000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 00
	// 010f01000136   000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 00
	// 010f0100021b   000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 000000 00             

    let colors = [];
    for (let leds = 0; leds < vLedPositions.length; leds++) {
        let iX = vLedPositions[leds][0];
        let iY = vLedPositions[leds][1];
        let color;
        if (shutdown) {
            color = hexToRgb(shutdownColor);
        } else if (LightingMode === "Forced") {
            color = hexToRgb(forcedColor);
        } else {
            color = device.color(iX, iY);
        }
        colors.push(color);
    }

	let packet0 = [];
	packet0 = packet0.concat(headerSequence[0]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat([ 0x00, 0x00, 0x00 ]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat([ 0x00, 0x00, 0x00 ]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat(colors[getColorIndex(false)]);
	packet0 = packet0.concat([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);
	device.write(packet0, 65);

	let packet1 = [];
	packet1 = packet1.concat(headerSequence[1]);
	packet1 = packet1.concat([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat(colors[getColorIndex(false)]);
	packet1 = packet1.concat([ 0x00, 0x00, 0x00 ]);

	let packet2 = [];
	packet2 = packet2.concat(headerSequence[2]);
	packet2 = packet2.concat(colors[getColorIndex(false)]);
	packet2 = packet2.concat(colors[getColorIndex(false)]);
	packet2 = packet2.concat([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);
	packet2 = packet2.concat(colors[getColorIndex(false)]);
	packet2 = packet2.concat(colors[getColorIndex(false)]);
	packet2 = packet2.concat(colors[getColorIndex(false)]);
	packet2 = packet2.concat(colors[getColorIndex(false)]);
	packet2 = packet2.concat(colors[getColorIndex(false)]);
	packet2 = packet2.concat(colors[getColorIndex(false)]);
	packet2 = packet2.concat(colors[getColorIndex(false)]);
	packet2 = packet2.concat(colors[getColorIndex(false)]);
	packet2 = packet2.concat(colors[getColorIndex(false)]);
	packet2 = packet2.concat(colors[getColorIndex(false)]);
	packet2 = packet2.concat([ 0x00, 0x00, 0x00 ]);

	let packet3 = [];
	packet3 = packet3.concat(headerSequence[3]);
	packet3 = packet3.concat(colors[getColorIndex(false)]);
	packet3 = packet3.concat(colors[getColorIndex(false)]);
	packet3 = packet3.concat(colors[getColorIndex(false)]);
	packet3 = packet3.concat([ 0x00, 0x00, 0x00 ]);
	packet3 = packet3.concat(colors[getColorIndex(false)]);
	packet3 = packet3.concat(colors[getColorIndex(false)]);
	packet3 = packet3.concat([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);
	packet3 = packet3.concat(colors[getColorIndex(false)]);
	packet3 = packet3.concat([ 0x00, 0x00, 0x00 ]);
	packet3 = packet3.concat(colors[getColorIndex(false)]);
	packet3 = packet3.concat(colors[getColorIndex(false)]);
	packet3 = packet3.concat(colors[getColorIndex(false)]);
	packet3 = packet3.concat(colors[getColorIndex(false)]);
	packet3 = packet3.concat([ 0x00, 0x00, 0x00 ]);

	let packet4 = [];
	packet4 = packet4.concat(headerSequence[4]);
	packet4 = packet4.concat(colors[getColorIndex(false)]);
	packet4 = packet4.concat(colors[getColorIndex(false)]);
	packet4 = packet4.concat(colors[getColorIndex(false)]);
	packet4 = packet4.concat(colors[getColorIndex(false)]);
	packet4 = packet4.concat(colors[getColorIndex(false)]);
	packet4 = packet4.concat(colors[getColorIndex(false)]);
	packet4 = packet4.concat(colors[getColorIndex(false)]);
	packet4 = packet4.concat([ 0x00, 0x00, 0x00 ]);
	packet4 = packet4.concat(colors[getColorIndex(false)]);
	packet4 = packet4.concat(colors[getColorIndex(false)]);
	packet4 = packet4.concat([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);
	packet4 = packet4.concat(colors[getColorIndex(false)]);
	packet4 = packet4.concat([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

	let packet5 = [];
	packet5 = packet5.concat(headerSequence[5]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat([ 0x00, 0x00, 0x00 ]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat(colors[getColorIndex(false)]);
	packet5 = packet5.concat([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

	let packet6 = [];
	packet6 = packet6.concat(headerSequence[6]);
	packet6 = packet6.concat([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);
	packet6 = packet6.concat(colors[getColorIndex(false)]);
	packet6 = packet6.concat(colors[getColorIndex(false)]);
	packet6 = packet6.concat(colors[getColorIndex(false)]);
	packet6 = packet6.concat([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);
	packet6 = packet6.concat(colors[getColorIndex(false)]);
	packet6 = packet6.concat([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);
	packet6 = packet6.concat(colors[getColorIndex(false)]);
	packet6 = packet6.concat(colors[getColorIndex(false)]);
	packet6 = packet6.concat(colors[getColorIndex(false)]);
	packet6 = packet6.concat(colors[getColorIndex(false)]);
	packet6 = packet6.concat(colors[getColorIndex(false)]);
	packet6 = packet6.concat(colors[getColorIndex(false)]);
	packet6 = packet6.concat([ 0x00, 0x00, 0x00 ]);

	let packet7 = [ 0x01, 0x0f, 0x00, 0x00, 0x07, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]
	let packet8 = [ 0x01, 0x0f, 0x01, 0x00, 0x00, 0x36, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]
	let packet9 = [ 0x01, 0x0f, 0x01, 0x00, 0x01, 0x36, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]
	let packet10 = [ 0x01, 0x0f, 0x01, 0x00, 0x02, 0x1b, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]
	
	getColorIndex(true);

	let delay = 1;
	device.write(packet1, 65);
	device.pause(delay);
	device.write(packet2, 65);
	device.pause(delay);
	device.write(packet3, 65);
	device.pause(delay);
	device.write(packet4, 65);
	device.pause(delay);
	device.write(packet5, 65);
	device.pause(delay);
	device.write(packet6, 65);
	device.pause(delay);
	device.write(packet7, 65);
	device.pause(delay);
	device.write(packet8, 65);
	device.pause(delay);
	device.write(packet9, 65);
	device.pause(delay);
	device.write(packet10, 65);
	device.pause(delay);
}

