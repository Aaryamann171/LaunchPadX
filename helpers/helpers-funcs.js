export const convertUnixTimestamp = (unixTimestamp) => {
    const dateObj = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    const dateString = `${day} ${month} ${year}`;

    return dateString;
}