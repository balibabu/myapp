const wax = {
    1: [0, 0.05],
    2: [0.5, 0.1],
    3: [0.1, 0.15],
    4: [0.15, 0.2],
    5: [0.2, 0.3],
    6: [0.3, 0.4],
    7: [0.4, 0.5],
    8: [0.5, 0.55],
    9: [0.55, 0.65],
    10: [0.65, 0.75],
    11: [0.75, 0.85],
    12: [0.85, 0.95],
    13: [0.95, 1]
}
const wan = {
    26: [0, 0.03],
    25: [0.3, 0.5],
    24: [0.5, 0.1],
    23: [0.1, 0.2],
    22: [0.2, 0.3],
    21: [0.3, 0.4],
    20: [0.4, 0.5],
    19: [0.5, 0.55],
    18: [0.55, 0.6],
    17: [0.6, 0.7],
    16: [0.7, 0.8],
    15: [0.8, 0.9],
    14: [0.9, 1]
}
export default function getImageNumber(phase, illum) {
    let limits = wan;
    if (phase === 'waxing') {
        limits = wax;
    }
    for (const key in limits) {
        const [lowerLimit, upperLimit] = limits[key];
        if (illum >= lowerLimit && illum < upperLimit) {
            return key;
        }
    }
    return null;
}
