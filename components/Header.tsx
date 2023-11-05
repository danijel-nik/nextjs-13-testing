'use client'
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
	const { data: session } = useSession();

	return (
		<div className="bg-slate-800 text-white py-4 px-2">
			<div className="container m-auto">
				<div className="flex justify-between flex-wrap items-center">
					<h1 className='text-2xl font-medium mb-0'>
						<Link href="/">Next 13.5 Testing</Link>
					</h1>
					<nav className="flex flex-wrap pt-1 items-center">
						<Link href='/simple-form'>Simple form</Link>&nbsp;/&nbsp;
						<Link href='/rhf'>React Hook Form</Link>&nbsp;/&nbsp;
						<Link href='/server-actions'>Server actions</Link>
					</nav>
					<nav className="flex flex-wrap pt-1 gap-1 items-center">
						{session ? (
							<>
								<Link href='/account'>{session.user?.name}</Link>&nbsp;/&nbsp;
								<a className="cursor-pointer" onClick={() => signOut({ redirect: true })}>Log Out</a>&nbsp;
							</>
						) : (
							<>
								<Link href='/login'>Login</Link>&nbsp;/&nbsp;
								<Link href='/registration'>Registration</Link>&nbsp;
							</>
						)}
						<ThemeSwitcher />
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Header;