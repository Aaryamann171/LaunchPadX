import SectionHeader from 'components/sectionHeader';
import { AiOutlineDatabase } from 'react-icons/ai';
import ReadMoreReact from 'read-more-react';
import CheckOutBtn from 'components/checkOutBtn';

const Missions = ({ missionData }) => {
    return (
        <div className="dark:bg-backgroundDark">
            <SectionHeader
            icon={ <AiOutlineDatabase /> }
            heading="SpaceX Previous Missions"
            />
            {
                missionData.map((mission, index) => {
                    const manufacturersList = mission.manufacturers.join(", ");
                    return (
                        <div className="mb-10 bg-foreground dark:bg-foregroundDark rounded-lg shadow m-4 md:m-8 p-4 md:p-10 border-t border-l border-b-8 border-r-8 border-black" key={index}>
                            <h1 className="text-3xl font-bold">{mission.mission_name}</h1>
                            <h3 className="text-sm text-zinc-700 dark:text-zinc-400"><span className="font-bold">Manufactured by: </span>{manufacturersList}</h3>
                            <div className="text-lg mt-4 text-zinc-800 dark:text-zinc-400">
                            <ReadMoreReact 
                                text={mission.description}
                                min={200}
                                ideal={250}
                                max={500}
                            />
                            </div>
                            <div className="mt-8 w-40">
                                <CheckOutBtn hyperlink={mission.wikipedia} message="Checkout Wiki"/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export const getStaticProps = async (context) => {
    const missionsEndpoint = 'https://api.spacexdata.com/v3/missions';
    const missionRes = await fetch(missionsEndpoint);
    const missionResJSON = await missionRes.json();

    return {
        props: {
            missionData: missionResJSON
        },
        revalidate: 14400  // 4 hours
    }
}

export default Missions; 
