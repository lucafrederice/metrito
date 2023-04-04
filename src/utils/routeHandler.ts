export function routeHandler(route: string[]) {
	const result = []
	let paths: any[] = []

	if (Array.isArray(route))
		paths = route

	for (let i = 0; i < paths.length; i += 2) {
		const obj = {
			key: paths[i],
			value: paths[i + 1]
		}
		result.push(obj)
	}

	return result
}