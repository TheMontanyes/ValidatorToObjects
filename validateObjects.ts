const validatorToObject = (object: any): any | null => {
	if (!object) return null

	const entries: any[] = Object.entries(object)
	let result = Object.create(null)

	entries.forEach(([key, value]: [string, any]) => {
		if (!!value && (Object.keys(object[key]).length || value.toString().length)) {
			if (typeof value === 'object') {
				let nested = validateObject(value)

				if (Array.isArray(value)) {
					result = {
						...result,
						[key]: Object.values(nested),
					}
				} else {
					result = {
						...result,
						[key]: nested,
					}
				}

				return result
			}

			result = {
				...result,
				[key]: value,
			}
		}
	})

	return result
}

export default validatorToObject
