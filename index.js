// pattern must use '#' to represent valid user input chars
const maskInput = (inputValue, pattern, onlyNumbers) => {
	if (inputValue) {
		let value = inputValue.toString()
		// remove all non-numbers chars if onlyNumbers is true
		if (onlyNumbers)
			value = value.replace(/[^0-9]+/g, '')
		if (value && pattern) {
			// remove from value all chars placed by the mask in a previous iteration
			const charsToRemove = pattern.replace(/#/g, '')
			const rawValue = charsToRemove.split('').reduce((acc,cur) => acc.replace(cur,''), value)
			// slice the pattern so it matches the length of the value
			const nthOccurrence = pattern.split('#', rawValue.length).join('#').length
			const patternAdjusted = pattern.slice(0, nthOccurrence + 1)
			// replace all chars in pattern to match value and create the mask
			let index = 0
			return patternAdjusted.replace(/#/g, () => rawValue[index++])
		}
		return ''
	}
	return ''
}

module.exports = maskInput