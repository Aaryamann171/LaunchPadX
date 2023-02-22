import SectionHeader from "components/sectionHeader";
import Image from "next/image";

import CheckOutBtn from "components/checkOutBtn";

import { TfiRocket } from 'react-icons/tfi';

import { titleCase } from "helpers/helpers-funcs";

const RocketDataPoint = ({attribute, value}) => {
    return (
    <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-400 mb-3">
        <span className="font-bold mr-2">{attribute + ":"}</span>{value}
    </p>
    )
}

const Rockets = ({ rocketData }) => {
    return (
        <div>
            <SectionHeader
            icon={ <TfiRocket /> }
            heading={rocketData.name}
            />
            <div className="mb-10 bg-foreground dark:bg-foregroundDark rounded-lg shadow m-4 md:m-8 p-2 md:p-10 flex flex-col md:flex-row border-t border-l border-b-8 border-r-8 border-black">
            <div className="md:w-2/3 bg-white dark:bg-foregroundDarker m-2 pd:m-4 p-4 md:p-8 rounded text-center border-t border-l border-b-4 border-r-4 border-black">
                <Image src={`${rocketData.flickr_images[0]}`} width={400} height={200} className="m-auto mb-4 border-2 border-black rounded" alt="rocket"></Image>
                <p className="text-lg mt-4 text-zinc-800 dark:text-zinc-400">{rocketData.description}</p>
            </div>
            <div className="md:w-1/3 flex flex-col justify-between p-4">
                <div>
                    <RocketDataPoint attribute="Type" value={titleCase(rocketData.type)}/>
                    <RocketDataPoint attribute="Active" value={rocketData.active ? "Yes" : "No"}/>
                    <RocketDataPoint attribute="First Flight" value={rocketData.first_flight}/>
                    <RocketDataPoint attribute="Height" value={`${rocketData.height.feet} ft`}/>
                    <RocketDataPoint attribute="Diameter" value={`${rocketData.diameter.feet} ft`}/>
                    <RocketDataPoint attribute="Mass" value={`${rocketData.mass.kg} kg`}/>
                    <RocketDataPoint attribute="Cost Per Launch" value={`${rocketData.cost_per_launch} kg`}/>
                    <RocketDataPoint attribute="Success Rate" value={`${rocketData.success_rate_pct}%`}/>
                </div>
                <div className="mt-8 w-40">
                    <CheckOutBtn hyperlink={rocketData.wikipedia} message="Read Wiki"/>
                </div>


            </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const rocketsEndpoint = 'https://api.spacexdata.com/v4/rockets';
    const rocketsRes = await fetch(rocketsEndpoint);
    const rocketsResJSON = await rocketsRes.json();

    const paths = rocketsResJSON.map( rocket => {
        return {
            params: { rocketId: rocket.id }
        }
    })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
    const rocketId = context.params.rocketId;
    const rocketEndpoints = `https://api.spacexdata.com/v4/rockets/${rocketId}`;
    const rocketRes = await fetch(rocketEndpoints);
    const rocketResJSON = await rocketRes.json();
    return {
        props: {
            rocketData: rocketResJSON
        },
    }
}

export default Rockets; 
