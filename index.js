function gradient(...args){
    return Array.isArray(args[0]) ? applyMultiline(args[0], args.slice(1)) : applySingleline(args[0], args.slice(1))
}

function applySingleline(content, colors){
    let text = ""
    let style = []
    const gradient = getGradient(hexToRGB(colors[0]), hexToRGB(colors[1]), content.length )

    for (let i= 0 ;i<content.length; i++){
        text += `%c${content[i]}`
        style.push(`color: rgb(${gradient[i].r},${gradient[i].g},${gradient[i].b})`)
    }
    style.unshift(text)
    console.log(style)
    return style
}

function applyMultiline(contentArr, colors){
    let text = ""
    let style = []
    const gradient = getGradient(hexToRGB(colors[0]), hexToRGB(colors[1]), contentArr[0].length )
    contentArr.forEach((content) => {
        for (let i= 0 ;i<content.length; i++){
            text += `%c${content[i]}`
            style.push(`color: rgb(${gradient[i].r},${gradient[i].g},${gradient[i].b})`)
        }
        text += '\n'
    })
    style.unshift(text)
    return style
}

function getGradient(start, end, count){
    const gradient = [];
    const steps = {
        r: (end.r - start.r) / (count - 1),
        g: (end.g - start.g) / (count - 1),
        b: (end.b - start.b) / (count - 1),
    }

    for (let i= 0 ;i<count; i++){
        gradient.push({
            r: start.r + steps.r * i,
            g: start.g + steps.g * i,
            b: start.b + steps.b * i
        })
    }
    return gradient;
}

function hexToRGB(hex){
    return hex.toString().slice(1) ? {
        r: parseInt(hex.toString().slice(1, 3), 16),
        g: parseInt(hex.toString().slice(3, 5), 16),
        b: parseInt(hex.toString().slice(5, 7), 16),
    } : null
}