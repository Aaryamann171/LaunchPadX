import { convertUnixTimestamp } from "helpers/helpers-funcs";

const Launches = ({ launchesData }) => {
    return (
        <div>
            <div className="m-8 p-10">
                <h1 className="text-4xl font-bold">Last 10 SpaceX Launches</h1>
            </div>
            {
                launchesData.map((launch, index) => {
                    const successStatusClasses = launch.success ? "text-xl mt-4 text-green-400 font-bold" : "text-xl mt-4 text-red-400 font-bold";
                    return (
                        <div className="mb-10 bg-foreground rounded shadow m-8 p-10 flex" key={index}>
                            <div className="w-1/2">
                                <h1 className="text-3xl font-bold mb-4">{launch.name}</h1>
                                <h1 className="text-xl font-bold mb-4">{convertUnixTimestamp(launch.date_unix)}</h1>
                                <h1 className="text-xl font-bold mb-4">{launch.rocketName}</h1>
                                <h1 className="text-lg mb-4">{launch.launchPadName}</h1>
                                {
                                    launch.links.webcast &&
                                    <a href={`${launch.links.webcast}`} target="_blank" rel="noreferrer"><p className="text-lg mt-4 text-blue-600">Watch Here</p></a>
                                }
                            </div>
                            <div className="w-1/2 m-auto">
                                <p className={successStatusClasses}>{launch.success ? "SUCCESS" : "FAILED"}</p>
                                {
                                    launch.success ? "" : launch.failures.map((failure, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="mt-4">
                                                    <h1 className="font-bold">Reason of Failure</h1>
                                                </div>
                                                <p className="text-lgtext-slate-800">
                                                    {failure.reason}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    launch.details
                                    ? <div>
                                        <div className="mt-4"><h1 className="font-bold text-xl">Details</h1></div>
                                        <p className="text-lg text-slate-800">{launch.details}</p>
                                      </div>
                                    : <></>
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
