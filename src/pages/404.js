import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col bg-cover items-center bg-[url('/astronaut.png')]">
            <div className="mt-96 md:mt-40">
                <h1 className="text-9xl p-2 rounded-lg font-bold">404</h1>
                <h1 className="text-6xl p-2 rounded-lg">NOT FOUND</h1>
                <Link href="/"><h1 className="text-2xl mt-4 bg-white dark:bg-foregroundDark border-b-4 border-r-4 border-t border-l border-accent p-2 rounded-lg shadow text-center">Go back to the Landing Page</h1></Link>
            </div>
        </div>
    )
}

export default NotFound;
