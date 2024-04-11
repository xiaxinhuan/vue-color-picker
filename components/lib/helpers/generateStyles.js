export function generateSolidStyle(red, green, blue, alpha) {
    if(alpha == 0){
        alpha == 0
    }else if(!alpha){
        alpha = 1
    }
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function generateGradientStyle(points, type, degree) {
    
    let style = '';
    const sortedPoints = points.slice();
    sortedPoints.sort((a, b) => a.left - b.left);

    if (type === 'linear') {
        style = `linear-gradient(${degree}deg,`;
    } else {
        style = 'radial-gradient(';
    }

    sortedPoints.forEach((point, index) => {
        if(point.alpha == 0){
            point.alpha == 0
        }else if(!point.alpha){
            point.alpha = 1
        }
        style += `rgba(${point.red}, ${point.green}, ${point.blue}, ${point.alpha}) ${point.left}%`;

        if (index !== sortedPoints.length - 1) {
            style += ',';
        }
    });
    
    style += ')';

    return style;
}
