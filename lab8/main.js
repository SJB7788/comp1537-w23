function compute(id) {
    let op1 = parseInt($("#first-input").val());
    let op2 = parseInt($("#second-input").val());

    switch(id) {
        case 'add-btn':
            $("#result").text(`${op1} + ${op2} = ${op1 + op2}`);
            colorClass = "blue"
            break;
        case 'sub-btn':
            $("#result").text(`${op1} - ${op2} = ${op1 - op2}`);
            colorClass = "green"
            break;
        case 'mult-btn':
            $("#result").text(`${op1} x ${op2} = ${op1 * op2}`);
            colorClass = "red"
            break;
        case 'div-btn':
            $("#result").text(`${op1} / ${op2} = ${op1 / op2}`);
            colorClass = "rainbow"
            break;        
    }
    
    $("#history").append(`<div class="${colorClass}"> ${$("#result").text()} <button class="remove-me">Remove me!</button> </div>`);
}

const main = () => {
    console.log("Hello");
    $("button").click(function () {
        compute(this.id)
    });
    
    $("body").on("click", ".remove-me", function () {
        console.log("ahdjkasld")
        $(this).parent().remove()
    });
}

$(document).ready(main)