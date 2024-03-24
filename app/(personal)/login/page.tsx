import Link from 'next/link';
import { Form } from '@/components/shared/SignUpForm';
import { signIn } from 'next-auth/react';
import { SubmitButton } from '@/components/shared/SubmitButton';
// 'use client';
// import { Image } from '@nextui-org/react';
// // import { authConfig } from '@/app/auth';
// // import { signIn, signOut } from 'next-auth/react';
// import { ClientSignIn } from '@/components/shared/ClientAuth';


const SignInPage = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-primary-50 dark:bg-secondary-50">
			<div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
				<div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
					<h3 className="text-xl font-semibold">Sign In</h3>
					<p className="text-sm text-gray-500">
						Use your email and password to sign in
					</p>
				</div>
				<Form
					action={async (formData: FormData) => {
						'use server';
						await signIn('credentials', {
							redirectTo: '/admin',
							email: formData.get('email') as string,
							password: formData.get('password') as string,
						});
					}}
				>
					<SubmitButton>Sign in</SubmitButton>
					<p className="text-center text-sm text-gray-600">
						{"Don't have an account? "}
						<Link href="/register" className="font-semibold text-gray-800">
							Sign up
						</Link>
						{' for free.'}
					</p>
				</Form>
			</div>
		</div>
		// <section className="bg-gray-50 dark:bg-gray-900">
		// 	<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		// 		<a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
		// 			<Image className="w-8 h-8 mr-2"
		// 				width={300}
		// 				src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
		// 				alt="logo" />

		// 		</a>
		// 		<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
		// 			<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
		// 				<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
		// 					Sign in to your account
		// 				</h1>
		// 				<ClientSignIn />
		// 			</div>
		// 		</div>
		// 	</div>
		// </section>
	);
};

export default SignInPage;