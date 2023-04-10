import { useEffect, useState } from "react";

function getAverageColor(imgUrl: string): Promise<{
    r: number,
    g: number,
    b: number
}> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let r = 0,
                    g = 0,
                    b = 0;
                for (let i = 0; i < data.length; i += 4) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                }
                const pixels = data.length / 4;
                r = Math.round(r / pixels);
                g = Math.round(g / pixels);
                b = Math.round(b / pixels);
                resolve({ r, g, b });
            }
        };
        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };
    });
}


const RGBToHSL = ({ r, g, b }: { r: number, g: number, b: number }) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
    ];
};

export const useColorThief = (imgUrl: string) => {
    const [hsl, setHSL] = useState<number[] | null[]>([null, null, null])

    const getColor = async (imgUrl: string) => {
        const rgb = await getAverageColor(imgUrl)
        if (rgb) {
            setHSL(RGBToHSL({ ...rgb }))
        }
    }

    useEffect(
        () => {
            if (imgUrl) {
                getColor(imgUrl)
            }

            // return () => setHSL([150, 100, 50])
        }, [imgUrl]
    )

    return hsl
}