import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { GiHamburgerMenu, GiMoon } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSun } from 'react-icons/bi';
import { RiSpaceShipLine } from 'react-icons/ri';

const Header = () => {
    let missionsInnerText = "Missions";
    let rocketsInnerText = "Rockets";
    let launchesInnerText = "Launches";
    let aboutInnerText = "About";

    const router = useRouter();
    switch (router.pathname) {
        case '/missions':
            missionsInnerText = "< Missions >"
            break;
        case '/':
            break;
        case '/launches':
            launchesInnerText = "< Launches >"
            break;
        case '/about':
            aboutInnerText = "< About >"
            break;
        default:
            rocketsInnerText = "< Rockets >"
            break;
    }

    const [headerOpen, setHeaderOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    const { systemTheme, theme, setTheme } = useTheme();

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

    const mobileNavLinksClasses = "text-2xl px-4 text-foreground mt-2 hover:bg-accent hover:text-orange-200"

    return (
        <div className="w-full bg-primary p-2">
            <div className="md:flex justify-between my-2 hidden">
                <div className="flex items-center text-2xl text-accent px-2">
                    <RiSpaceShipLine />
                    <Link href="/"><h1 className="mx-2">LaunchPadX</h1></Link>
                </div>
                <Link href="/missions"><h1 className="text-2xl px-4 text-foreground">{missionsInnerText}</h1></Link>
                <Link href="/rockets"><h1 className="text-2xl px-4 text-foreground">{rocketsInnerText}</h1></Link>
                <Link href="/launches"><h1 className="text-2xl px-4 text-foreground">{launchesInnerText}</h1></Link>
                {themeSwitcher()}
                <Link href="/about"><h1 className="text-2xl px-4 text-foreground">{aboutInnerText}</h1></Link>
            </div>
            <div className="flex justify-between px-4 my-2 px-2 md:hidden">
                <div>
                    <Link href="/"><h1 className="text-2xl text-accent md:mb-0">LaunchPadX</h1></Link>
                </div>
                <div>
                    {themeSwitcher()}
                </div>
                <div onClick={() => setHeaderOpen(!headerOpen)} className='text-3xl text-foreground flex cursor-pointer md:hidden'>
                    {headerOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
                </div>
            </div>
            {
                headerOpen 
                ? <div className="md:hidden transition-opacity ease-in delay-100 duration-500 py-4 text-center">
                    <Link href="/missions"><h1 className={mobileNavLinksClasses}>{missionsInnerText}</h1></Link>
                    <Link href="/rockets"><h1 className={mobileNavLinksClasses}>{rocketsInnerText}</h1></Link>
                    <Link href="/launches"><h1 className={mobileNavLinksClasses}>{launchesInnerText}</h1></Link>
                    <Link href="/about"><h1 className={mobileNavLinksClasses}>{aboutInnerText}</h1></Link>
                 </div>
                : null
            }
        </div>
    )
}

export default Header;