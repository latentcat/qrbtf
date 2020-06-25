const fileTypes =[
    'image/jpeg',
    'image/pjpeg',
    'image/png'
]

export function isPicture(file) {
    return fileTypes.includes(file.type);
}

export function toBase64(file) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let img = document.createElement('img');
    img.setAttribute('src', URL.createObjectURL(file));

    return new Promise(resolve => {
        img.onload = () => {
            let size = Math.min(img.width, img.height);

            canvas.setAttribute('width', size);
            canvas.setAttribute('height', size);

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);

            resolve(canvas.toDataURL(file.type, 0.9));
        };
    })
}

export function gamma(r, g, b) {
    return Math.pow((Math.pow(r, 2.2) + Math.pow(1.5 * g, 2.2) + Math.pow(0.6 * b, 2.2)) / (1 + Math.pow(1.5, 2.2) + Math.pow(0.6, 2.2)), 1/2.2)
}
