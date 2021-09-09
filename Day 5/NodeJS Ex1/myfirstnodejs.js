console.log("welcome to anubhav trainings");

function printMyName(){
    console.log("this is a new System");

}

function addNumbers(a,b){
return a+b;
}

function manipulate(a,b,opr){
        switch (opr) {
            case "-":
                return a - b;
                break;
            case "*":
                return a * b;
                break;
            default:
                return a / b;
                break;
        }
    }

    function calculateSize(array) {
        return array.length;
    }


    printMyName();
    console.log(addNumbers(6,9));
    console.log(manipulate(7,7,'*'));
    console.log(calculateSize(["apple","banana","cherry"]));