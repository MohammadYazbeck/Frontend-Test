import { useState } from 'react'

export default function useZoom() {
    const [zoomStyle, setZoomStyle] = useState({})
    const [isZooming, setIsZooming] = useState(false)

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x = ((e.pageX - left) / width) * 100
        const y = ((e.pageY - top) / height) * 100

        setZoomStyle({
            backgroundPosition: `${x}% ${y}%`,
        })
    }

    const handleMouseEnter = () => {
        setIsZooming(true)
    }

    const handleMouseLeave = () => {
        setIsZooming(false)
    }

    return {
        zoomStyle,
        isZooming,
        handleMouseEnter,
        handleMouseMove,
        handleMouseLeave,
    }
}
