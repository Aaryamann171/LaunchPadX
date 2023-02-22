import SectionHeader from "components/sectionHeader";
import CheckOutBtn from "components/checkOutBtn";

import ReadMoreReact from 'read-more-react';

import { convertUnixTimestamp } from "helpers/helpers-funcs";
import { GiRocketThruster, GiCancel } from 'react-icons/gi';
import { BsCalendar2 } from 'react-icons/bs';
import { RiRocketLine } from 'react-icons/ri';
import { TfiLocationPin } from 'react-icons/tfi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const LaunchHeaderInfo = ({icon, content}) => {
    return (
    <p className="text-lg md:text-xl bg-foregroundAlt dark:bg-foregroundDarker p-4 rounded-lg font-bold flex items-center mt-4 md:mt-0 border-2 border-black">
        <span className="font-bold mr-2">{icon}</span>{content}
    </p>
    )
}

const Launches = ({ launchesData }) => {
    return (
        <div>
            <SectionHeader
            icon={<GiRocketThruster/>}
            heading="Last 10 SpaceX Launches"
            />
            {
                launchesData.map((launch, index) => {
                    const successStatusClasses = launch.success ? "text-xl mt-4 text-green-600 font-bold" : "text-xl mt-4 text-red-400 font-bold";
                    return (
                        <div className="mb-10 bg-foreground dark:bg-foregroundDark rounded-lg shadow m-4 md:m-8 p-4 md:p-8 md:p-16 flex flex-col border-t border-l border-b-8 border-r-8 border-black" key={index}>
                            <h1 className="text-4xl font-bold mb-4">{launch.name}</h1>
                            <div className="flex md:space-x-10 my-2 flex-col md:flex-row">
                                <LaunchHeaderInfo icon={<BsCalendar2/>} content={convertUnixTimestamp(launch.date_unix)}/>
                                <LaunchHeaderInfo icon={<RiRocketLine/>} content={launch.rocketName}/>
                                <LaunchHeaderInfo icon={<TfiLocationPin />} content={launch.launchPadName}/>
                            </div>
                            <div className="m-auto">
                                <p className={successStatusClasses}>
                                    {
                                    launch.success 
                                    ? <div className="flex items-center"><AiOutlineCheckCircle className="mr-2" /><p>SUCCESSFUL</p></div> 
                                    : <div className="flex items-center"><GiCancel className="mr-2" /><p>FAILED</p></div> 
                                    }
                                </p>
                                {
                                    launch.success ? "" : launch.failures.map((failure, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="mt-4">
                                                    <h1 className="font-bold">Reason of Failure</h1>
                                                </div>
                                                <p className="text-lg text-zinc-800">
                                                    {failure.reason}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    launch.details
                                    ? <div className="bg-foregroundAlt dark:bg-foregroundDarker p-4 md:px-8 md:py-6 mt-8 rounded-lg border-2 border-black">
                                        <div className="mt-4"><h1 className="font-bold text-2xl">Details</h1></div>
                                        <div className="text-lg mt-4 text-zinc-800 dark:text-zinc-400">
                                        <ReadMoreReact 
                                            text={launch.details}
                                            min={180}
                                            ideal={200}
                                            max={500}
                                            read
                                        />
                                        </div>
                                      </div>
                                    : <></>
                                }
                                {
                                    launch.links.webcast &&
                                    <div className="w-40 mt-10">
                                        <CheckOutBtn hyperlink={launch.links.webcast} message="Watch Here"/>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })
            }
            </div>
    )
}

const hasContent = (elem) => {
    const hasSuccessField = (String(elem.success) == 'null') ? false : true;
    const hasDetailsField = (String(elem.details) == 'null') ? false : true;
    const flag = (hasSuccessField && hasDetailsField) ? true : false;
    return flag;
}

export const getStaticProps = async (context) => {
    const launchesEndpoints = 'https://api.spacexdata.com/v4/launches/';
    const launchesRes = await fetch(launchesEndpoints);
    const launchesResJSON = await launchesRes.json();

    const launchesDataFiltered = launchesResJSON.filter(hasContent);
    const launchesData = launchesDataFiltered.slice(-10);

    // adding Rocket and Lauchpad info
    for (const launch of launchesData) {
        const rocketId = launch.rocket;
        const rocketEndpoints = `https://api.spacexdata.com/v4/rockets/${rocketId}`;
        const rocketRes = await fetch(rocketEndpoints);
        const rocketResJSON = await rocketRes.json();
    
        const launchpadId = launch.launchpad;
        const launchpadEndpoints = `https://api.spacexdata.com/v4/launchpads/${launchpadId}`;
        const launchpadRes = await fetch(launchpadEndpoints);
        const launchpadResJSON = await launchpadRes.json();

        launch["rocketName"] = rocketResJSON.name;
        launch["launchPadName"] = launchpadResJSON.full_name;
    }
    
    return {
        props: {
            launchesData: launchesData
        },
    }
}

export default Launches; 
