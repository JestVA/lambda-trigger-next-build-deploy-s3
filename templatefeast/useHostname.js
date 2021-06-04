import { useState } from 'react';

const useHostname = () => {
	const [host, setHost] = useState(() => {
		try {
			return typeof window !== 'undefined' ? window.location.hostname : ""
		} catch (err) {
			return "";
		}
	});
	return [host];
}

export default useHostname;