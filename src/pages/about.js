import SectionHeader from "components/sectionHeader";
import Link from "next/link";
import Image from "next/image";
import { BsGithub } from 'react-icons/bs';
import { BiGlobe } from 'react-icons/bi';
import { SiLaunchpad } from 'react-icons/si';
import { TfiInfoAlt } from 'react-icons/tfi';

const SocialBtn = ({ hyperlink, message, icon }) =>{
    return (
        <Link href={ hyperlink } legacyBehavior>
            <div className="cursor-pointer my-2">
                <a target={'_blank'}>
                    <p className="flex items-center text-lg text-black bg-pastelBlue p-2 text-center rounded-lg font-bold border-t border-l border-b-4 border-r-4 border-black">
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
                icon={<SiLaunchpad/>}
                heading="About This Project"
            />
            <div className="mb-10 bg-foreground dark:bg-foregroundDark rounded shadow m-4 md:m-8 p-4 md:p-10 border-t border-l border-b-8 border-r-8 border-black">
                <div className="mb-4">
                <h3 className="text-xl text-slate-700 dark:text-slate-400"> 
                LaunchPadX is a simple SpaceX dashboard built using Next.js and TailwindCSS. All the data is fetched from SpaceX public APIs.
                </h3>
                </div>
                <h3 className="text-xl text-slate-700 dark:text-slate-400 mb-4"> 
                It showcases various missions and launches SpaceX has undertaken. There is also a dedicated page for SpaceX rockets. 
                The design is still a work in progress. I just hacked it together in a couple of days while exploring the SpaceX API.
                </h3>
                <div>
            </div>
            </div>
            <SectionHeader
                icon={<TfiInfoAlt/>}
                heading="About Me"
            />
            <div className="mb-10 bg-foreground dark:bg-foregroundDark rounded shadow m-4 md:m-8 p-2 md:p-10 flex flex-col md:flex-row border-t border-l border-b-8 border-r-8 border-black">
            <div className="md:w-1/3 bg-white dark:bg-black m-4 md:p-8 rounded text-center border-t border-l border-b-8 border-r-8 border-black">
                <Image src={'/me.png'} width={500} height={500} className="m-auto" alt="me"></Image>
            </div>
            <div className="md:w-2/3 p-4 m-auto">
                <p className="text-xl md:text-2xl mt-4 text-slate-800 dark:text-slate-300 md:p-10">
                    I like to play around with various technologies and collaborate with like minded people. 
                    I am currently working as a Full Stack Developer. I work with Django, Flask and Next.js.
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
