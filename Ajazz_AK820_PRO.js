export function Name() { return "Ajazz AK820 PRO"; }
export function Publisher() { return "RunNow"; }
export function VendorId() { return  0x320f;}  //Device's USB Vendor Id in Hex
export function ProductId() { return [0x505b, 0xfdfd];} //Device's USB Product Id in Hex
export function Size() { return [31, 11]; }
export function DefaultPosition(){return [0, 5];}
export function DefaultScale(){return 1.5;}
/* global
shutdownColor:readonly
LightingMode:readonly
forcedColor:readonly
*/
export function ControllableParameters(){
	return [
		{"property":"shutdownColor", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"#009bde"},
		{"property":"LightingMode", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"#009bde"},
	];
}

const vKeyNames = [
	"Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Del",
	"`",   "1",  "2",  "3",  "4",  "5",  "6",  "7",  "8",  "9",  "0",   "-_",  "+=",         "Backspace",          "Home",
	"Tab",    "Q",  "W",  "E",  "R",  "T",  "Y",  "U",  "I",  "O",   "P",   "[",    "]",       "\\",              "Page Up",
	"CapsLock", "A",  "S",  "D",  "F",  "G",  "H",  "J",  "K",  "L",   ";",   "'",            "Enter",             "Page Down",
	"Left Shift", "Z",  "X",  "C",  "V",  "B",  "N",  "M",  ",",  ".",  "/",   "Right Shift",  "Up Arrow",        
	"Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Right Ctrl", "Left Arrow", "Down Arrow",       "Right Arrow"
];

const vKeys =
[
	1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13,  119, // del
	19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,         103, 117,//backspace + home

	37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 67, 118, //pgup

	55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,      85,      121, //enter ad pgup
	73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,           101, // shift and up arrow
	91, 92, 93,         94,           95, 97, 98,           99, 100, 102
];

const vKeyPositions = [
	[ 0, 0], [ 2, 0], [ 4, 0], [ 6, 0], [ 8, 0], [10, 0], [12, 0], [14, 0], [16, 0], [18, 0], [20, 0], [22, 0], [24, 0], [26, 0], 
	[ 0, 2], [ 1, 2], [ 4, 2], [ 6, 2], [ 8, 2], [10, 2], [12, 2], [14, 2], [16, 2], [18, 2], [20, 2], [22, 2], [24, 2],      [27, 2],     [30, 2],
	[ 0, 4], [ 3, 4], [ 5, 4], [ 7, 4], [ 9, 4], [11, 4], [13, 4], [15, 4], [17, 4], [19, 4], [21, 4], [23, 4], [25, 4],   [ 28, 4],  [30, 4],
	[ 1, 6], [ 3, 6], [ 5, 6], [ 7, 6], [ 9, 6], [11, 6], [13, 6], [15, 6], [17, 6], [19, 6], [21, 6], [23, 6],        [27, 6],      [30, 6],
	[ 1, 8],      [ 4, 8], [ 6, 8], [ 8, 8], [10, 8], [12, 8], [14, 8], [16, 8], [18, 8], [20, 8], [22, 8],     [25, 8],     [28, 8], 
	[ 0, 10],   [ 2, 10],   [ 4, 10],                           [13, 10],                        [20, 10], [22, 10], [24, 10], [26, 10], [28, 10], [30, 10]
];

export function LedNames() {
	return vKeyNames;
}

export function Leds() {
	return vKeys;
}

export function LedPositions() {
	return vKeyPositions;
}

export function Initialize() {

}

export function Render() {
	sendColors();

}

export function Shutdown(SystemSuspending) {

}

function sendInitalPacket(arg1, data) {
	let packet = [];

	packet[0x01] = 0x04;
	packet[0x02] = arg1;
	packet[0x09] = data;

	device.pause(4);

	device.send_report(packet, 65);

	let get_packet = [];
	device.pause(4);

	get_packet[0x01] = 0x40
	device.get_report(packet, 65);
}

function sendColors(overrideColor) {

	const deviceLeds = vKeys;
	const deviceLedPositions = vKeyPositions;
	const TotalLEDs = deviceLeds.length;  
	const RGBData = [];

	let TotalLedCount = TotalLEDs;

	for (let iIdx = 0; iIdx < TotalLEDs; iIdx++) {
		const iPxX = deviceLedPositions[iIdx][0];
		const iPxY = deviceLedPositions[iIdx][1];
		let color;

		if(overrideColor){
			color = hexToRgb(overrideColor);
		}else if (LightingMode === "Forced") {
			color = hexToRgb(forcedColor);
		}else{
			color = device.color(iPxX, iPxY);
		}
		
		RGBData[iIdx * 4 + 0] = deviceLeds[iIdx];
		RGBData[iIdx * 4 + 1] = color[0];
		RGBData[iIdx * 4 + 2] = color[1];
		RGBData[iIdx * 4 + 3] = color[2];

	}

	sendInitalPacket(0x20, 0x08)

	for (let i = 0; i < 8; i++) {
		const ledsToSend = TotalLedCount >= 16 ? 16 : TotalLedCount;

		let tbl = RGBData.splice(0, (ledsToSend*4));

		tbl.length = 64;
		tbl.fill(0,  (ledsToSend*4), 64)
		tbl.unshift(0)
		//console.log(tbl)
		device.send_report(tbl, 65);

		TotalLedCount -= ledsToSend;
	}

	//console.log("sending")

	sendInitalPacket(0x02, 0x00)
	device.pause(2);
}




export function Validate(endpoint) {
	return endpoint.interface === 3 && 
	endpoint.usage === 0x0001 && 
	endpoint.usage_page === 0xff13 &&
	endpoint.collection === 0x0000 ;
}

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	const colors = [];
	colors[0] = parseInt(result[1], 16);
	colors[1] = parseInt(result[2], 16);
	colors[2] = parseInt(result[3], 16);

	return colors;
}

export function ImageUrl(){
	return "https://assets.signalrgb.com/devices/brands/royal-kludge/keyboards/rk84.png";
}
