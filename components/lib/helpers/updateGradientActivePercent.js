export default function updateGradientActivePercent(offsetX, width) {
    const leftPercent = ((offsetX * 100) / width).toFixed(2)*1;
    return leftPercent < 0 ? 0 : leftPercent > 100 ? 100 : leftPercent;
}
