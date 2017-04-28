var moment = require('moment');
var now = moment();

/*console.log(now.format());
console.log(now.format('X'));
console.log(now.format('x'));
console.log(now.valueOf());*/

var timeStamp = 1493306872043;
var timeStampMoment = moment.utc(timeStamp);
console.log(timeStampMoment.format());
console.log(timeStampMoment.local().format("h:mma"));

/*console.log(now.format("dddd, MMMM Do YYYY, h:mm:ss a"));
console.log(now.format("h:mma"));
console.log(now.format("MMM Do YYYY, h:mma"));*/