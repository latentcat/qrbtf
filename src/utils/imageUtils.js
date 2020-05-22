const fileTypes =[
    'image/jpeg',
    'image/pjpeg',
    'image/png'
]

export function isPicture(file) {
    return fileTypes.includes(file.type);
}

export function toBase64(file, width, height) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let img = document.createElement('img');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    img.setAttribute('src', URL.createObjectURL(file));

    return new Promise(resolve => {
        img.onload = () => {
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, width, height)
            ctx.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL(file.type, 0.9));
        };
    })
}

export function gamma(r, g, b) {
    return Math.pow((Math.pow(r, 2.2) + Math.pow(1.5 * g, 2.2) + Math.pow(0.6 * b, 2.2)) / (1 + Math.pow(1.5, 2.2) + Math.pow(0.6, 2.2)), 1/2.2)
}
