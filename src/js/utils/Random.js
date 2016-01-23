
export function randRange(min, max) {
	return min + Math.random() * (max - min);
}

export function randRangeInt(min, max) {
	return Math.floor(randRange(min, max));
}

export function randItem(list) {
	return list[randRangeInt(0, list.length)];
}
