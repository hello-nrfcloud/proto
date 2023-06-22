export const isFingerprint = (fingerprint?: string): fingerprint is string =>
	fingerprintRegExp.test(fingerprint ?? '')

export const fingerprintRegExp =
	/^[A-F0-9]{1,}\.[ABCDEFGHIJKMNPQRSTUVWXYZ2-9]{6}$/i
