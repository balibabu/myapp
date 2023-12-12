export default function TitleExtractor(description, size = 15) {
    if(description.length===0){return "Take Note"}
    let firstLine = description.split('\n')[0];
    if (firstLine.length <= size) {
        return firstLine;
    }
    let words = firstLine.split(" ");
    let result = words[0].substr(0,size);

    for (let i = 1; i < words.length; i++) {
        let segment=words[i];
        if((result+segment).length>size){
            return result;
        }
        result+=" "+segment;
    }
    return result;

}