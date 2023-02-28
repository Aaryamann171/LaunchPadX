import SectionHeader from "components/sectionHeader";
import Link from "next/link";
import Image from "next/image";
import { SlRocket } from 'react-icons/sl';

const Rockets = ({ rocketsData }) => {
    return (
        <div>
            <SectionHeader
            icon={ <SlRocket /> }
            heading="SpaceX Rockets"
            />
            {
                rocketsData.map((rocket, index) => {
                    return (
                        <Link href={`/rockets/${rocket.id}`} key={index}>
                            <div className="mb-10 bg-foreground hover:bg-foregroundAlt dark:bg-foregroundDark dark:hover:bg-foregroundDarker rounded-lg shadow m-4 md:m-8 p-4 md:p-10 flex flex-col md:flex-row border-t border-l border-b-8 border-r-8 border-black">
                                <div className="md:w-2/5">
                                    <h1 className="text-3xl font-bold mb-4 text-center md:text-left">{rocket.name}</h1>
                                    <Image src={`${rocket.flickr_images[0]}`} width={400} height={200} alt={rocket.name} className="rounded border-2 border-black m-auto md:m-0"></Image>
                                </div>
                                <div className="md:w-3/5 m-auto">
                                    <p className="text-lg md:text-2xl mt-4 text-zinc-800 dark:text-zinc-400">{rocket.description}</p>
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
        revalidate: 14400  // 4 hours
    }
}

export default Rockets; 
