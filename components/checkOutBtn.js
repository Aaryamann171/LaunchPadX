import Link from "next/link";

const CheckOutBtn = ({ hyperlink, message}) =>{
    return (
        <Link href={hyperlink} legacyBehavior>
            <a target={'_blank'}>
                <p className="text-lg text-black bg-pastelBlue p-2 text-center rounded-lg font-bold border-t border-l border-b-4 border-r-4 border-black">
                    { message }
                </p>
            </a>
        </Link>
    )
}

export default CheckOutBtn;
