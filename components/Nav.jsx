"use client"
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {getProviders, signIn, signOut, useSession} from "next-auth/react";

const Nav = () => {
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false)
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/logo.svg"
                       alt="Promptopia logo"
                       width={30}
                       height={30}
                       className="object-contain"/>
                <p className="logo_text">Promptopia</p>
            </Link>
            {/*    Desktop nav*/}
            <div className="sm:flex hidden">
                {session?.user ?
                    (<div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">Create Post</Link>
                        <button type="button" className="outline_btn" onClick={signOut}>Sign Out</button>
                        <Link href="/profile">
                            <Image src={session?.user.image} width={37} height={37} className="rounded-full"
                                   alt="profile"/>
                        </Link>
                    </div>)
                    :
                    (<>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button key={provider.name} type="button" className="black_btn"
                                        onClick={() => signIn(provider.id)}>Sign In</button>))}
                    </>)}
            </div>
            {/*    Mobile nav*/}
            <div className="sm:hidden flex relative">
                {session?.user ?
                    (<div className="flex">
                        <Image src={session?.user.image} width={37} height={37} className="rounded-full"
                               alt="profile"
                               onClick={() => {
                                   setToggleDropdown((prevState) => !prevState)
                               }}/>
                        {toggleDropdown && (<div className="dropdown">
                            <Link href="/profile" className="dropdown_link" onClick={() => {
                                setToggleDropdown(false)
                            }}>My profile</Link>
                            <Link href="/create-prompt" className="dropdown_link" onClick={() => {
                                setToggleDropdown(false)
                            }}>Create prompt</Link>
                            <button type="button" onClick={() => {
                                setToggleDropdown(false)
                                signOut()
                            }}
                                    className="mt-5 w-full black_btn"
                            >Sign out
                            </button>
                        </div>)}
                    </div>) : (<>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button key={provider.name} type="button" className="black_btn"
                                        onClick={() => signIn(provider.id)}>Sign In</button>))}
                    </>)}
            </div>
        </nav>)
}
export default Nav
