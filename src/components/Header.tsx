'use client'
import Link from 'next/link';
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from 'next-auth/react';
import ThemeSwitcher from './ThemeSwitcher';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
	const router = useRouter();
	const pathname = usePathname();
	const { data: session } = useSession();

	return (
		<div className="bg-slate-800 text-white py-4 px-2">
			<div className="container m-auto">
				<div className="flex justify-between flex-wrap items-center">
					<h1 className='text-2xl font-medium mb-0'>
						<Link href="/">Next 13.5 Testing</Link>
					</h1>
					<nav className="flex flex-wrap pt-1 items-center">
						<Link href='/simple-form' className={`${pathname === '/simple-form' ? 'font-bold' : ''}`}>Simple form</Link>&nbsp;/&nbsp;
						<Link href='/rhf' className={`${pathname === '/rhf' ? 'font-bold' : ''}`}>React Hook Form</Link>&nbsp;/&nbsp;
						<Link href='/server-actions' className={`${pathname === '/server-actions' ? 'font-bold' : ''}`}>Server actions</Link>&nbsp;/&nbsp;
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Link href='#'>Redux</Link>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => router.push('/redux/actions')} className="cursor-pointer">
									Actions
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => router.push('/redux/queries')} className="cursor-pointer">
									Services - Queries
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => router.push('/redux/mutations')} className="cursor-pointer">
									Services - Mutations
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>&nbsp;/&nbsp;
						<Link href='/trpc' className={`${pathname === '/trpc' ? 'font-bold' : ''}`}>TRPC</Link>
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