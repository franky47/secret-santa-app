
export const setupCanvas = (canvas, size) => {
    // Note: always scaling the canvas by 2 solves two problems at once:
    // - Retina compatibility
    // - Image downscaling quality
    const ratio = 2.0
    if (canvas.ratio === ratio) {
        return
    }
    const context = canvas.getContext('2d')
    canvas.width  = size * ratio
    canvas.height = size * ratio
    canvas.style.width  = `${size}px`
    canvas.style.height = `${size}px`
    context.scale(ratio, ratio)
    canvas.ratio = ratio
}
