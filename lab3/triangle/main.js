function drawTriangle(starAmt) {
    let triangle_star = "*"
    while (starAmt != 1) {
        console.log(triangle_star)
        starAmt -= 1
        triangle_star += "*"
    }
    return triangle_star
}

const amtOfTriangle = parseFloat(prompt("How large of a triangle do you want?"))
const promptTriangle = drawTriangle(amtOfTriangle)
alert("Check the console")
console.log(promptTriangle)
