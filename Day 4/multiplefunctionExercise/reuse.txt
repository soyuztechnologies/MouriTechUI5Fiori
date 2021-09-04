function myFirstDemoFunction() {
    var oInp = document.getElementById("num");
    var oInp1 = document.getElementById("num1");
    var input1 = parseInt(oInp.value);
    var input2 = parseInt(oInp1.value);
    alert(square(input1, input2));
}

const square = function(number1, number2) {
    return number1 * number2;
}