import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { GiHamburgerMenu, GiMoon } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSun } from 'react-icons/bi';

const Header = () => {
    const [headerOpen, setHeaderOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    const {systemTheme, theme, setTheme} = useTheme();
    
    const themeSwitcher = () => {
        if (!mounted) {
            return null;
        }

        const currentTheme = (theme === 'system' ? systemTheme : theme);

        if (currentTheme === 'dark') {
            return <BiSun className="w-7 h-7 text-white" role="button" onClick={() => setTheme("light")} />
        } else {
            return <GiMoon className="w-7 h-7 text-white" role="button" onClick={() => setTheme("dark")} />
        }
    }

    return (
        <div className="w-full bg-primary p-2">
            <div className="md:flex justify-between my-2 hidden">
                <Link href="/"><h1 className="text-2xl text-accent px-2">LaunchPadX</h1></Link>
                <Link href="/missions"><h1 className="text-2xl px-4 text-foreground">Missions</h1></Link>
                <Link href="/rockets"><h1 className="text-2xl px-4 text-foreground">Rockets</h1></Link>
                <Link href="/launches"><h1 className="text-2xl px-4 text-foreground">Launches</h1></Link>
                {themeSwitcher()}
                <Link href="/about"><h1 className="text-2xl px-4 text-foreground">About</h1></Link>
            </div>
            <div className="flex justify-between px-4 my-2 px-2 md:hidden">
                <div>
                    <Link href="/"><h1 className="text-2xl text-accent md:mb-0">LaunchPadX</h1></Link>
                </div>
                <div>
                    {themeSwitcher()}
                </div>
                <div onClick={()=>setHeaderOpen(!headerOpen)} className='text-3xl text-foreground flex cursor-pointer md:hidden'>
                    { headerOpen ? <AiOutlineClose /> : <GiHamburgerMenu /> }
                </div>
            </div>
            {
            headerOpen &&
            <div className="md:hidden pb-4">
                <Link href="/missions"><h1 className="text-2xl px-4 text-foreground mt-2">Missions</h1></Link>
                <Link href="/rockets"><h1 className="text-2xl px-4 text-foreground mt-2">Rockets</h1></Link>
                <Link href="/launches"><h1 className="text-2xl px-4 text-foreground mt-2">Launches</h1></Link>
                <Link href="/about"><h1 className="text-2xl px-4 text-foreground mt-2">About</h1></Link>
            </div>
            }
        </div>
    )
}

export default Header;