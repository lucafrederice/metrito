import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function getAverageRGB(imgEl: HTMLImageElement) {

    let blockSize = 5, // only visit every 5 pixels
        defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
        canvas = globalThis.document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

    if (!context) {
        return defaultRGB
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb

}


const RGBToHSL = (r: number, g: number, b: number) => {
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

export default function WorkspaceCard({ id, name, role, src, shareBrandsLength }: { id: number, name: string, role: "owner" | "manager" | "member", src: string, shareBrandsLength: number }) {
    const imageRef = useRef<HTMLImageElement>(null)

    const [{ r, g, b }, setCustomBg] = useState<{
        r: number,
        g: number,
        b: number,
    }>({
        r: 0,
        g: 0,
        b: 0,
    })

    useEffect(
        () => {
            if (imageRef.current) setCustomBg({ ...getAverageRGB(imageRef.current) })
        }, [imageRef.current]
    )

    const [[h, s, l], setHSL] = useState<number[]>([
        0, 0, 0
    ])

    useEffect(
        () => {
            setHSL(RGBToHSL(r, g, b))
        },
        [r, g, b]
    )

    return (
        <>
            <Link
                href={`/workspaces/${id}`}
                style={{
                    "--tw-shadow-color": `hsl(${h}deg, ${s}%, ${20}%, 0.3)`,
                    "--tw-shadow": "var(--tw-shadow-colored)",
                } as React.CSSProperties}
                className="py-6 md:py-12 px-4 min rounded-md bg-white shadow-lg hover:shadow-2xl transition-all ease-in group grid place-items-center gap-4 md:gap-5 relative"
            >
                <div
                    style={{
                        borderColor: `hsl(${h}deg,${s}%,${l}%, 0.5)`,
                        // backgroundColor: `hsl(${h}deg,${s}%,${l > 50 ? 0 : 100}%, 1)`
                        // backgroundImage: `radial-gradient(farthest-corner at 50px 50px, hsl(${h}deg, ${s}%, ${l}%, 1), hsl(${h}deg, ${s}%, ${l}%, 1))`,
                    }}
                    className="absolute inset-0 rounded-md hover:border-2"
                />
                <img ref={imageRef} src={src} alt="workspace" className="w-20 h-20 md:w-32 md:h-32 rounded-md object-contain opacity-1 saturate-[1] group-hover:opacity-100 group-hover:saturate-100 transition-none ease-in" />
                <header className="z-10 grid place-items-center text-center gap-5">
                    <div className={`max-w-[7rem] ${shareBrandsLength === 0 ? "sm:max-w-[12rem]" : "sm:max-w-[10rem]"}`}>
                        <h2 className="font-semibold text-md md:text-xl text-gray-700 group-hover:text-gray-900 truncate"
                            style={{
                                color: `hsl(${h}deg, ${s}%, ${l}%, 1)`
                            }}
                        >
                            {name}
                        </h2>
                    </div>

                    <div className="grid place-items-center gap-1">
                        <StarIcon className="h-3 w-3 text-gray-500"
                            style={{
                                color: `rgba(${r}, ${g}, ${b}, 0.8)`
                            }}
                        />

                        <div className={`max-w-[7rem] ${shareBrandsLength === 0 ? "sm:max-w-[12rem] lg:max-w-[14rem]" : "sm:max-w-[10rem] lg:max-w-[12rem]"} `}>
                            <p className="text-xs text-gray-500 capitalize font-medium group-hover:text-gray-700 truncate"
                                style={{
                                    color: `rgba(${r}, ${g}, ${b}, 0.8)`
                                }}
                            >
                                {role}
                            </p>
                        </div>
                    </div>

                </header>
            </Link >
        </>
    )
}