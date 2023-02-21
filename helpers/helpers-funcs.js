export const convertUnixTimestamp = (unixTimestamp) => {
    const dateObj = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    const dateString = `${day} ${month} ${year}`;

    return dateString;
}

export const titleCase = (str) => {
    let firstLetter = str[0];
    let remainingStr = str.slice(1, str.length);
    const titleStr = firstLetter.toUpperCase() + remainingStr;
    return titleStr;
}