'use client';

import { useEffect } from 'react';
import { isProd } from '@/lib/helper';
import * as Sentry from '@sentry/nextjs';
import { Button } from '@nextui-org/react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		if (isProd) {
			Sentry.captureException(error);
		}
		console.log(error);

	}, [error]);

	return (
		<div>
			<section className=" flex items-center justify-center h-screen">
				<div className="flex flex-col items-center">
					<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
						<div className="mx-auto max-w-screen-sm text-center">
							<h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gray-900 dark:text-white">{error.name}</h1>
							<p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">{error.message}</p>
							<p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{error?.digest} </p>
							<Button
								onClick={() => reset()}
								className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Refresh</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
