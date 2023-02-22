import SectionHeader from "components/sectionHeader";

import Link from "next/link";
import Image from "next/image";

import { BsGithub } from 'react-icons/bs';
import { BiGlobe } from 'react-icons/bi';
import { TfiInfoAlt } from 'react-icons/tfi';
import { GiMoebiusTriangle } from 'react-icons/gi';

const SocialBtn = ({ hyperlink, message, icon }) =>{
    return (
        <Link href={ hyperlink } legacyBehavior>
            <div className="cursor-pointer my-2">
                <a target={'_blank'}>
                    <p className="flex justify-center text-lg text-black bg-pastelBlue py-2 px-4 text-center rounded-lg font-bold border-t border-l border-b-4 border-r-4 border-black">
                        { message }
                        { icon }
                    </p>
                </a>
            </div>
        </Link>
    )
}

const About = () => {
    return (
        <div>
            <SectionHeader
                icon={<TfiInfoAlt/>}
                heading="About This Project"
            />
            <div className="mb-10 bg-foreground dark:bg-foregroundDark rounded shadow m-4 md:m-8 p-4 md:p-10 border-t border-l border-b-8 border-r-8 border-black">
                <div className="mb-4">
                    <h3 className="text-xl text-zinc-700 dark:text-zinc-400"> 
                    The LaunchPax Dashboard is a web application that provides real-time information about SpaceX launches and missions. 
                    The platform is built using <span className="font-mono">Next.js</span> and <span className="font-mono">TailwindCSS</span>, 
                    and utilizes the SpaceX API to fetch and display the latest launch data, as well as some information about various Space X rockets and The Starman. 
                    Users can explore past and upcoming launches, view detailed mission information, and keep up-to-date with the latest developments from SpaceX. 
                    The aim of this project is to provide a user-friendly and informative platform for space enthusiasts and casual observers alike, to make it easy for anyone to follow the latest SpaceX news and developments.
                    </h3>
                </div>
            </div>
            <SectionHeader
                icon={<GiMoebiusTriangle />}
                heading="About Me"
            />
            <div className="mb-10 bg-foreground dark:bg-foregroundDark rounded shadow m-4 md:m-8 p-2 md:p-10 flex flex-col md:flex-row border-t border-l border-b-8 border-r-8 border-black">
            <div className="md:w-1/3 bg-white dark:bg-black m-4 md:p-8 rounded text-center border-2 border-black">
                <Image src={'/me.png'} width={500} height={500} className="m-auto" alt="me"></Image>
            </div>
            <div className="md:w-2/3 p-4 m-auto">
                <p className="text-xl md:text-2xl mt-4 text-zinc-800 dark:text-zinc-300 md:p-10">
                    I am an experienced Full Stack Developer with 2 years of professional experience in the field. 
                    I am proficient in a range of technologies including Django, Flask, and Next.js. 
                    I have a passion for exploring and experimenting with new technologies and am always looking to collaborate with like-minded individuals on challenging and innovative projects.
                </p>
                <div className="mt-8 flex flex-col md:flex-row text-center justify-evenly">
                    <SocialBtn 
                        hyperlink="https://github.com/aaryamann171"
                        message="Check Out My Github"
                        icon={<BsGithub className="ml-2 text-2xl"/>}
                    />
                    <SocialBtn 
                        hyperlink="https://aaryamann171.github.io"
                        message="Check Out My Website"
                        icon={<BiGlobe className="ml-2 text-2xl"/>}
                    />
                </div>
            </div>
            </div>
        </div>
    )
}

export default About; 
