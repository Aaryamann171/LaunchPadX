import Head from "next/head";
import Image from "next/image";

import SectionHeader from "components/sectionHeader";
import CheckOutBtn from "components/checkOutBtn";

import { convertUnixTimestamp } from "helpers/helpers-funcs";

import { RxRocket } from 'react-icons/rx';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { BsCalendar2, BsCalendar2Range, BsSpeedometer2, BsCaretUpSquare } from 'react-icons/bs';
import { RiRocketLine, RiPinDistanceLine } from 'react-icons/ri';
import { TfiLocationPin } from 'react-icons/tfi';
import { MdOutlineNewReleases } from 'react-icons/md';
import { GiMoebiusStar } from 'react-icons/gi';

const CustomInfo = ({ icon, content }) => {
    return (
    <p className="text-lg font-bold mt-4 text-slate-800 dark:text-slate-400 flex items-center">
        <span className="mr-4">{ icon }</span>{ content }
    </p>
    )
}

const Home = ({ launchesData, latestLaunchData, starmanData }) => {
  return (
    <>
      <Head>
        <title>LauchPadX</title>
        <meta name="description" content="LaunchPadX - A SpaceX exploration App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="bg-foreground dark:bg-foregroundDark flex justify-between px-10 py-16 border-b-2 border-black"> */}
      <div className="bg-foreground dark:bg-foregroundDark flex justify-between px-4 md:px-10 py-16 border-b-8 rounded-lg border-black">
        <div className="my-auto p-4 w-4/5 md:w-1/2">
          <h1 className="font-bold text-black dark:text-white text-4xl md:text-8xl mb-5">LaunchPadX</h1>
          <h1 className="text-lg md:text-2xl">Explore The Final Frontier</h1>
        </div>
        <div className="flex w-1/5 md:w-1/2 justify-center my-auto text-slate-600">
          <RxRocket size={275} className="hidden md:block"/>
          <RxRocket size={50} className="md:hidden"/>
        </div>
      </div>
      <div>
          <div className="w-full justify-center text-center flex flex-col md:flex-row mt-6 md:mt-10">
              {/* <h1 className="text-lg text-white md:text-3xl mx-10 bg-gradient-to-r from-violet-500 to-indigo-600 py-4 px-8 rounded-full flex items-center justify-center border-2 border-black"> */}
              <h1 className="text-lg text-black md:text-3xl mx-10 bg-pastelPurple py-4 px-8 rounded-lg flex items-center justify-center border-t border-l border-b-4 border-r-4 border-black">
                <BsCaretUpSquare className="mr-2"/>
                <span className="font-bold">Total Launches: </span>{launchesData.totalLaunches}
              </h1>
            {/* <h1 className="text-lg text-white md:text-3xl mx-10 bg-gradient-to-r from-green-400 to-emerald-600 py-4 px-8 rounded-full flex items-center justify-center border-2 border-black mt-10 md:mt-0 "> */}
            <h1 className="text-lg text-black md:text-3xl mx-10 bg-pastelGreen py-4 px-8 rounded-lg flex items-center justify-center border-t border-l border-b-4 border-r-4 border-black mt-4 md:mt-0 ">
                <HiOutlineShieldCheck className="mr-2"/>
              <span className="font-bold">Successful Launches: </span>{launchesData.successfulLaunches}
            </h1>
          </div>
        <SectionHeader
          icon={<MdOutlineNewReleases/>}
          heading="Latest Launch"
        />
        <div className="mb-10 bg-foreground dark:bg-foregroundDark rounded-lg shadow m-4 md:m-8 p-4 md:p-10 flex border-t border-l border-b-8 border-r-8 border-black">
          <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-4 text-center md:text-left">{latestLaunchData.name}</h1>
                <CustomInfo icon={<BsCalendar2 />} content={convertUnixTimestamp(latestLaunchData.date_unix)}/>
                <CustomInfo icon={<RiRocketLine />} content={latestLaunchData.rocketName}/>
                <CustomInfo icon={<TfiLocationPin />} content={latestLaunchData.launchpadName}/>
                <div className="mt-10 w-56">
                  <CheckOutBtn hyperlink={latestLaunchData.links.webcast} message="Check Out Launch" />
                </div>
          </div>
          <div className="hidden md:block md:w-1/3">
            <Image src={latestLaunchData.launchpadImg} width={600} height={600} className="rounded" alt="launchpad"></Image>
          </div>
        </div>
      </div>
        <SectionHeader
          icon={<GiMoebiusStar/>}
          heading="The Starman"
        />
      <div className="flex mb-10 bg-foreground dark:bg-foregroundDark rounded-lg shadow m-4 md:m-8 p-4 md:p-10 border-t border-l border-b-8 border-r-8 border-black">
          <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-4 text-center md:text-left">{starmanData.name}</h1>
                <p className="text-lg dark:text-slate-400 mb-4">{starmanData.details}</p>
                <CustomInfo icon={<BsCalendar2 title="Launch Date" />} content={convertUnixTimestamp(starmanData.launch_date_unix)}/>
                <CustomInfo icon={<BsCalendar2Range title="Period Days" />} content={starmanData.period_days.toFixed(2)}/>
                <CustomInfo icon={<RiPinDistanceLine title="Distance from Earth" />} content={`${starmanData.earth_distance_km.toFixed(2)} km`}/>
                <CustomInfo icon={<BsSpeedometer2 title="Current Speed" />} content={`${starmanData.speed_kph.toFixed(2)} kph`}/>
          </div>
          <div className="hidden md:block md:w-1/3 my-auto mx-8">
                <Image src="/spaceman.jpg" width={600} height={600} className="rounded" alt="starman"></Image>
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
