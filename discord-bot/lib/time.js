
function secondsToHumanTime(seconds) {
	let result = '';

	let days = Math.floor(seconds / 86400);
	if (days == 1) result += '1 day ';
	else if (days > 0) result += days + ' days ';
	seconds -= days * 86400;

	let hours = Math.floor(seconds / 3600) % 24;
	if (hours == 1) result += '1 hour ';
	else if (hours > 0) result += hours + ' hours ';
	seconds -= hours * 3600;

	let minutes = Math.floor(seconds / 60) % 60;
	if (minutes == 1) result += '1 minute ';
	else if (minutes > 0) result += minutes + ' minutes ';
	seconds -= minutes * 60;

	if (days == 0 && hours == 0) {
		seconds = seconds % 60;
		if (seconds == 1) result += '1 second ';
		else if (seconds > 0) result += seconds + ' seconds ';
	}

	return result.slice(0, -1);
}

exports.secondsToHumanTime = secondsToHumanTime;
