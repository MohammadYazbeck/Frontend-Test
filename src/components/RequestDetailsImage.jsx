/* eslint-disable react/prop-types */
import useZoom from '../hooks/useZoom'

export default function RequestDetailsImage({ photo }) {
    const {
        zoomStyle,
        isZooming,
        handleMouseEnter,
        handleMouseMove,
        handleMouseLeave,
    } = useZoom()
    return (
        <>
            {photo ? (
                <div className="mx-auto mb-14 mt-4 flex h-[20rem] w-[20rem] items-center justify-center overflow-hidden rounded-lg border border-gray-300 p-5 sm:h-[35rem] sm:w-[35rem] md:h-[40rem] md:w-[40rem] xl:h-[45rem] xl:w-[45rem]">
                    <div
                        className="relative w-[75%] cursor-crosshair bg-cover bg-no-repeat"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            backgroundImage: `url(${photo})`,
                            backgroundSize: isZooming ? '200%' : 'contain',
                            ...zoomStyle,
                        }}
                    >
                        <img
                            src={photo}
                            alt="Selected Photo"
                            className="h-full w-full object-contain opacity-0"
                        />
                    </div>
                </div>
            ) : (
                <p className="mb-10 mt-2 text-center text-gray-500">
                    الصورة غير متاحة
                </p>
            )}
        </>
    )
}
