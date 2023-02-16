import Link from "next/link";

const Missions = ({ missionData }) => {
    return (
        <div>
            <div className="m-8 p-10">
                <h1 className="text-4xl font-bold">SpaceX Previous Missions</h1>
            </div>
            {
                missionData.map((mission, index) => {
                    const manufacturersList = mission.manufacturers.join(", ");
                    return (
                        <div className="mb-10 bg-foreground rounded shadow m-8 p-10" key={index}>
                            <h1 className="text-3xl font-bold">{mission.mission_name}</h1>
                            <h3 className="text-sm text-slate-700"><span className="font-bold">Manufactured by: </span>{manufacturersList}</h3>
                            <p className="text-lg mt-4 text-slate-800">{mission.description}</p>
                            <div className="mt-8">
                                <Link href={`${mission.wikipedia}`} legacyBehavior>
                                    <a target={'_blank'} className="text-blue-600">Learn More</a>
                                </Link>
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
    }
}

export default Missions; 
