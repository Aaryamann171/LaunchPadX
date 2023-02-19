import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { convertUnixTimestamp } from "helpers/helpers-funcs";

const Home = ({ launchesData, latestLaunchData, starmanData }) => {
  return (
    <>
      <Head>
        <title>LauchPadX</title>
        <meta name="description" content="LaunchPadX - A SpaceX exploration App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-foreground flex justify-between p-10">
        <div className="my-auto p-4 w-full md:w-1/2">
          <h1 className="font-bold text-4xl md:text-7xl mb-5">LaunchPadX</h1>
          <h1 className="text-lg md:text-2xl">Explore The Final Frontier</h1>
        </div>
        <div className="hidden md:flex w-1/2 justify-center">
          <Image className="rounded hidden md:block" src="/spaceman.jpg" width={500} height={500} alt="starman-hero-img"></Image>
        </div>
      </div>
      <div>
          <div className="w-full justify-center text-center flex flex-col md:flex-row mt-10">
            <h1 className="text-lg md:text-3xl mx-10 bg-blue-200 py-4 px-8 rounded-full"><span className="font-bold">Total Launches: </span>{launchesData.totalLaunches}</h1>
            <h1 className="text-lg md:text-3xl mx-10 bg-green-200 py-4 px-8 rounded-full mt-10 md:mt-0"><span className="font-bold">Successful Launches: </span>{launchesData.successfulLaunches}</h1>
          </div>
          <h1 className="font-bold text-3xl mx-10 mt-10">Latest Launch</h1>
              <div className="mb-10 bg-foreground rounded shadow m-8 p-10 flex">
                <div className="md:w-2/3">
                    <h1 className="text-3xl font-bold mb-4">{latestLaunchData.name}</h1>
                    <p className="text-lg mt-4 text-slate-800"><span className="font-bold">Date: </span>{convertUnixTimestamp(latestLaunchData.date_unix)}</p>
                    <p className="text-lg mt-4 text-slate-800"><span className="font-bold">Rocket: </span>{latestLaunchData.rocketName}</p>
                    <p className="text-lg mt-4 text-slate-800"><span className="font-bold">Launchpad: </span>{latestLaunchData.launchpadName}</p>
                    <Link href={`${latestLaunchData.links.webcast}`} legacyBehavior><a target={'_blank'}><p className="text-lg mt-4 text-blue-600">Check It Out</p></a></Link>
                </div>
                <div className="hidden md:block md:w-1/3">
                    <Image src={`${latestLaunchData.launchpadImg}`} width={600} height={600} className="rounded" alt="launchpad"></Image>
                </div>
              </div>
      </div>
          <h1 className="font-bold text-3xl mx-10 mt-10">The Starman</h1>
          <div className="flex mb-10 bg-foreground rounded shadow m-8 p-10 ">
              <div className="md:w-2/3">
                  <h1 className="text-3xl font-bold mb-4">{starmanData.name}</h1>
                    <p className="text-lg mb-4">{starmanData.details}</p>
                    <p className="text-lg mt-4 text-slate-800"><span className="font-bold">Launch Date: </span>{convertUnixTimestamp(starmanData.launch_date_unix)}</p>
                    <p className="text-lg mt-4 text-slate-800"><span className="font-bold">Period Days: </span>{starmanData.period_days.toFixed(2)}</p>
                    <p className="text-lg mt-4 text-slate-800"><span className="font-bold">Earth Distance: </span>{starmanData.earth_distance_km.toFixed(2)} km</p>
                    <p className="text-lg mt-4 text-slate-800"><span className="font-bold">Speed: </span>{starmanData.speed_kph.toFixed(2)} kph</p>
              </div>
              <div className="hidden md:block md:w-1/3 my-auto mx-8">
                    <Image src={`${starmanData.flickr_images[1]}`} width={600} height={600} className="rounded" alt="starman"></Image>
              </div>
          </div>
    </>
  )
}

const getNextLaunchData = async () => {
    const latestLaunchEndpoint = 'https://api.spacexdata.com/v5/launches/next';
    const latestLaunchRes = await fetch(latestLaunchEndpoint);
    const latestLaunchResJSON = await latestLaunchRes.json();

    const rocketId = latestLaunchResJSON.rocket;
    const rocketEndpoints = `https://api.spacexdata.com/v4/rockets/${rocketId}`;
    const rocketRes = await fetch(rocketEndpoints);
    const rocketResJSON = await rocketRes.json();

    const launchpadId = latestLaunchResJSON.launchpad;
    const launchpadEndpoints = `https://api.spacexdata.com/v4/launchpads/${launchpadId}`;
    const launchpadRes = await fetch(launchpadEndpoints);
    const launchpadResJSON = await launchpadRes.json();

    const latestLaunchData = {
      ...latestLaunchResJSON,
      rocketName: rocketResJSON.name,
      launchpadName: launchpadResJSON.full_name,
      launchpadImg: launchpadResJSON.images.large[0]
    }

    return latestLaunchData;
}

export const getStaticProps = async (context) => {
    const launchesEndpoint = 'https://api.spacexdata.com/v4/launches';
    const launchesRes = await fetch(launchesEndpoint);
    const launchesResJson = await launchesRes.json();
    const totalLaunches = launchesResJson.length;
    const successfulLaunches = launchesResJson.filter(launch => launch.success).length;
    const launchesData = {
      totalLaunches,
      successfulLaunches
    }

    const latestLaunchData = await getNextLaunchData();

    const starmanEndpoint = 'https://api.spacexdata.com/v4/roadster';
    const starmanRes = await fetch(starmanEndpoint);
    const starmanResJSON = await starmanRes.json();

    return {
        props: {
            launchesData,
            latestLaunchData,
            starmanData: starmanResJSON
        },
    }
}

export default Home;
