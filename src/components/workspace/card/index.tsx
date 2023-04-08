import { StarIcon, UserCircleIcon, WrenchIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

const useColorThief = (imgUrl: string) => {
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

export default function WorkspaceCard({ id, name, role, src, shareBrandsLength }: { id: number, name: string, role: "owner" | "manager" | "member", src: string, shareBrandsLength: number }) {
    const imageRef = useRef<HTMLImageElement>(null)

    // @ts-ignore
    // const [[h, s, l], setHSL] = useState<number[]>(RGBToHSL(getAverageRGB(imageRef.current)))

    const [h, s, l] = useColorThief(src)

    // useEffect(
    //     () => {
    //         if (imageRef.current) {
    //             const { r, g, b } = getAverageRGB(imageRef.current)
    //             setHSL(RGBToHSL(r, g, b))
    //             // console.log("rgb: ", r, g, b)
    //         }
    //     }, []
    // )


    // useEffect(
    //     () => {
    //         setHSL(RGBToHSL(r, g, b))
    //     },
    //     [r, g, b]
    // )

    // console.log("hsl: ", h, s, l)

    return (
        <>
            <Link
                href={`/workspaces/${id}`}
                style={{
                    "--tw-shadow-color": `hsl(${h}deg, ${s}%, ${20}%, 0.3)`,
                    "--tw-shadow": "var(--tw-shadow-colored)",
                } as React.CSSProperties}
                className="group py-6 md:py-12 px-4 min rounded-md bg-white shadow-lg hover:shadow-2xl transition-all ease-in group grid place-items-center gap-4 md:gap-5 relative"
            >
                <div
                    style={{
                        borderColor: `hsl(${h}deg,${s}%,${l}%, 0.5)`,
                        // backgroundColor: `hsl(${h}deg,${s}%,${l > 50 ? 0 : 100}%, 1)`
                        // backgroundImage: `radial-gradient(farthest-corner at 50px 50px, hsl(${h}deg, ${s}%, ${l}%, 1), hsl(${h}deg, ${s}%, ${l}%, 1))`,
                    } as React.CSSProperties}
                    className="absolute inset-0 rounded-md group-hover:border-2"
                />
                <img ref={imageRef} src={src} alt="workspace" className="w-20 h-20 md:w-32 md:h-32 rounded-md object-contain opacity-1 saturate-[1] group-hover:opacity-100 group-hover:saturate-100 transition-none ease-in" />
                <header className="grid place-items-center text-center gap-5">
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
                        {
                            role === "owner" ?
                                <StarIcon className="h-3 w-3 text-gray-500"
                                    style={{
                                        color: `hsl(${h}deg, ${s}%, ${l}%, 0.8)`
                                    }}
                                />
                                : role === "manager" ?
                                    <WrenchIcon className="h-3 w-3 text-gray-500"
                                        style={{
                                            color: `hsl(${h}deg, ${s}%, ${l}%, 0.8)`
                                        }}
                                    />
                                    : <UserCircleIcon className="h-3 w-3 text-gray-500"
                                        style={{
                                            color: `hsl(${h}deg, ${s}%, ${l}%, 0.8)`
                                        }}
                                    />
                        }


                        <div className={`max-w-[7rem] ${shareBrandsLength === 0 ? "sm:max-w-[12rem] lg:max-w-[14rem]" : "sm:max-w-[10rem] lg:max-w-[12rem]"} `}>
                            <p className="text-xs text-gray-500 capitalize font-medium group-hover:text-gray-700 truncate"
                                style={{
                                    color: `hsl(${h}deg, ${s}%, ${l}%, 0.8)`
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