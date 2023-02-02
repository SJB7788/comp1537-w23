function addF() {
    x = jQuery('#operand1').val();
    y = jQuery('#operand2').val();
    console.log(x);
    console.log(y);
    jQuery('#result').html(Number(x) + Number(y));
}

function subF() {
    x = jQuery('#operand1').val();
    y = jQuery('#operand2').val();
    console.log(x);
    console.log(y);
    jQuery('#result').html(Number(x) - Number(y));
}

function mulF() {
    x = jQuery('#operand1').val();
    y = jQuery('#operand2').val();
    console.log(x);
    console.log(y);
    jQuery('#result').html(Number(x) * Number(y));
}

function divF() {
    x = jQuery('#operand1').val();
    y = jQuery('#operand2').val();
    console.log(x);
    console.log(y);
    jQuery('#result').html(Number(x) / Number(y));
}

function pwrF() {
    x = jQuery('#operand1').val();
    y = jQuery('#operand2').val();
    console.log(x);
    console.log(y);
    jQuery('#result').html(Number(x) ** Number(y));
}

function setup() {
    console.log('setup');
    $('#addBtn').click(addF);
    $('#subBtn').click(subF);
    $('#mulBtn').click(mulF);
    $('#divBtn').click(divF);
    $('#pwrBtn').click(pwrF);
    $('#starBtn').click(drawTriangle);
}



function drawTriangle() {
    if($('.jqueryStar').length) {
        $(".jqueryStar").remove();
    }
    starAmt = jQuery('#starAmt').val();
    let triangle_star = "*" 
    while (starAmt != 0) {
        $('.starResult').append("<p class='jqueryStar'>" + String(triangle_star) + "</p>")
        starAmt -= 1
        triangle_star += "*"
    }
}


jQuery(document).ready(setup)
