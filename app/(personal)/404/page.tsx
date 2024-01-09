/* eslint-disable react/no-unescaped-entities */
'use client';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Error404() {
	return (
		<Suspense fallback={null}>

			<>
				<section className=" flex items-center justify-center h-screen">
					<div className="flex flex-col items-center">
						<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
							<div className="mx-auto max-w-screen-sm text-center">
								<h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gray-900 dark:text-white">404</h1>
								<p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
								<p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
								<Link href="/" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</Link>
							</div>
						</div>
					</div>
				</section>

			</ >

		</Suspense>
	);
}
