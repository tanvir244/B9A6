
function readCount(elementId){
    const element = document.getElementById(elementId);
    const strValue = element.innerText;
    const numValue = parseInt(strValue);
    return numValue;
}