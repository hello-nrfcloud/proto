export const getShadowUpdateTime = (
	metadata: Record<string, Record<string, any>>,
): number =>
	Object.values(metadata).reduce((maxTime, props) => {
		if (typeof props === 'number') return props > maxTime ? props : maxTime
		const childMax = getShadowUpdateTime(props)
		return childMax > maxTime ? childMax : maxTime
	}, 0)
