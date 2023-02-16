import Link from "next/link";

const Header = () => {
    return (
        <div className="w-full bg-primary">
            <div className="flex px-8 py-4">
                <div className="flex w-[90%]">
                <Link href="/"><h1 className="text-2xl px-4 text-accent">LaunchPadX</h1></Link>
                <Link href="/missions"><h1 className="text-2xl px-4 text-foreground">Missions</h1></Link>
                <Link href="/rockets"><h1 className="text-2xl px-4 text-foreground">Rockets</h1></Link>
                <Link href="/launches"><h1 className="text-2xl px-4 text-foreground">Launches</h1></Link>
                </div>
                <Link href="/about"><h1 className="text-2xl px-4 text-foreground">About</h1></Link>
            </div>
        </div>
    )
}

export default Header;