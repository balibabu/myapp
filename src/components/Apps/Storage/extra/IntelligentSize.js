export default function IntelligentSize(size_bytes) {

    if(size_bytes<1000){
        return size_bytes+' B'
    }
    const KB=size_bytes/1024;
    if(KB<1000){
        return KB.toFixed(2)+' KB'
    }
    const MB=KB/1024;
    return MB.toFixed(2)+' MB'
}
