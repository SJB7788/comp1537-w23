function drawTriangle(starAmt) {
    let triangle_star = "*"
    while (starAmt != 1) {
        console.log(triangle_star)
        starAmt -= 1
        triangle_star += "*"
    }
    return triangle_star
}


console.log(drawTriangle(5))
