export function dateToString(date){
    let dateObject = new Date(date);
    return dateObject.toLocaleString('eng',{month:'long'}) + ' '
        + dateObject.getDate() + ', '
        + dateObject.getFullYear();
}