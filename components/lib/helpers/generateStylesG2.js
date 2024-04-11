export function generateGradientStyleG2(points, type, degree) {
    
    let style = '';
    const sortedPoints = points.slice();
    sortedPoints.sort((a, b) => a.left - b.left);

    if (type === 'linear') {
        style = `l(${degree})`;
    } else {
        style = 'r(0.5,0.5,0.1)';
    }

    sortedPoints.forEach((point) => {
        style += ` ${(point.left/100).toFixed(2)*1}:rgba(${point.red},${point.green},${point.blue},${point.alpha})`;
    });

    return style;
}
