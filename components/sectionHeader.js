const SectionHeader = ({ icon, heading }) => {
    return (
        <div className="m-4 md:m-8 p-2 md:p-10 text-2xl md:text-5xl flex items-center justify-center md:justify-start">
            <span className="mr-4">
                { icon }
            </span>
            <h1 className="font-bold">{ heading }</h1>
        </div>
    )
}

export default SectionHeader;