import Link from "next/link";
import Image from "next/image";

const Rockets = ({ rocketsData }) => {
    return (
        <div>
            <div className="m-8 p-10">
                <h1 className="text-4xl font-bold">SpaceX Rockets</h1>
            </div>
            {
                rocketsData.map((rocket, index) => {
                    return (
                        <Link href={`/rockets/${rocket.id}`} key={index}>
                            <div className="mb-10 bg-foreground dark:bg-foregroundDark rounded shadow m-8 p-10 flex flex-col md:flex-row">
                                <div className="md:w-1/4">
                                    <h1 className="text-3xl font-bold mb-4">{rocket.name}</h1>
                                    <Image src={`${rocket.flickr_images[0]}`} width={200} height={200} alt="rocket-img"></Image>
                                </div>
                                <div className="md:w-3/4 m-auto">
                                    <p className="text-lg mt-4 text-slate-800 dark:text-slate-400">{rocket.description}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export const getStaticProps = async (context) => {
    const rocketsEndpoints = 'https://api.spacexdata.com/v4/rockets';
    const rocketsRes = await fetch(rocketsEndpoints);
    const rocketsResJSON = await rocketsRes.json();
    return {
        props: {
            rocketsData: rocketsResJSON
        },
    }
}

export default Rockets; 
