export default function progressHandler(setAllProgress, index, newValue) {
    setAllProgress((prev) => {
        if(prev.length>0){
            const oldValues = [...prev];
            oldValues[index] = newValue;
            return oldValues;
        }
        return prev;
    })
}

export function averageProgress(list) {
    const len = list.length;
    let total = 0;
    for (let i = 0; i < len; i++) {
        if (list[i]===undefined) {
            total += 100;
        }else{
            total+=parseFloat(list[i]);
        }
    }
    const average=total/len;
    return average;
}