import Link from "next/link";
import Image from "next/image";

const About = () => {
    return (
        <div>
            <div className="m-8 p-10">
                <h1 className="text-4xl font-bold">About This Project</h1>
            </div>
            <div className="mb-10 bg-foreground rounded shadow m-8 p-10">
                <div className="mb-4">
                <h3 className="text-xl text-slate-700"> 
                LaunchPadX is a simple SpaceX dashboard built using Next.js and TailwindCSS. All the data is fetched from SpaceX public APIs.
                </h3>
                </div>
                <h3 className="text-xl text-slate-700 mb-4"> 
                It showcases various missions and launches SpaceX has undertaken. There is also a dedicated page for SpaceX rockets. 
                The design is still a work in progress. I just hacked it together in a couple of days while exploring the API.
                </h3>
                <div>
            </div>
            </div>
            <div className="m-8 p-10">
                <h1 className="text-4xl font-bold">About Me</h1>
            </div>
            <div className="mb-10 bg-foreground rounded shadow m-8 p-10 flex">
            <div className="w-1/3 bg-white m-4 p-8 rounded text-center">
                <Image src={'/me.png'} width={500} height={500} className="m-auto" alt="me"></Image>
            </div>
            <div className="w-2/3 p-4 m-auto">
                <p className="text-xl mt-4 text-slate-800">
                    I like to play around with various technologies and collaborate with like minded people. 
                    I am currently working as a Full Stack Developer. I am working with Django, Flask and Next.js.
                </p>
                <div className="mt-8 flex justify-evenly">
                    <Link href={`https://aaryamann171.github.io`} legacyBehavior>
                        <a target={'_blank'} className="text-blue-600">{'< Check out my website >'}</a>
                    </Link>
                    <Link href={`https://github.com/aaryamann171`} legacyBehavior>
                        <a target={'_blank'} className="text-blue-600">{'< Check out my github profile >'}</a>
                    </Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default About; 
