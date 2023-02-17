import Link from "next/link";
import Image from "next/image";

const Rockets = ({ rocketData }) => {
    return (
        <div>
            <div className="m-8 p-10">
                <h1 className="text-4xl font-bold">{rocketData.name}</h1>
            </div>
            <div className="mb-10 bg-foreground rounded shadow m-8 p-10 flex">
            <div className="w-1/3 bg-white m-4 p-8 rounded text-center">
                <Image src={`${rocketData.flickr_images[0]}`} width={200} height={200} className="m-auto" alt="rocket"></Image>
                <h3 className="text-sm text-slate-700"><span className="font-bold">Type: </span>{rocketData.type}</h3>
                <h3 className="text-sm text-slate-700"><span className="font-bold">Active: </span>{rocketData.active ? "Yes" : "No"}</h3>
                <h3 className="text-sm text-slate-700"><span className="font-bold">First Flight: </span>{rocketData.first_flight}</h3>
                <h3 className="text-sm text-slate-700"><span className="font-bold">Height: </span>{rocketData.height.feet} ft</h3>
                <h3 className="text-sm text-slate-700"><span className="font-bold">Diameter: </span>{rocketData.diameter.feet} ft</h3>
                <h3 className="text-sm text-slate-700"><span className="font-bold">Mass: </span>{rocketData.mass.kg} kg</h3>
                <h3 className="text-sm text-slate-700"><span className="font-bold">Cost Per Launch: </span>${rocketData.cost_per_launch}</h3>
                <h3 className="text-sm text-slate-700"><span className="font-bold">Success Rate: </span>{rocketData.success_rate_pct}%</h3>
            </div>
            <div className="w-2/3 p-4 m-auto">
                <p className="text-lg mt-4 text-slate-800">{rocketData.description}</p>
                <div className="mt-8">
                    <Link href={`${rocketData.wikipedia}`} legacyBehavior>
                        <a target={'_blank'} className="text-blue-600">Learn More</a>
                    </Link>
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
