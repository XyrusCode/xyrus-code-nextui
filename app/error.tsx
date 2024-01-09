'use client';

import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
  reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div>
			{error.message}
			<p>Oh no, something went wrong... maybe refresh?</p>
			<button onClick={() => reset()}>Try again</button>
		</div>
	);
}
