module.exports ={
    printMyName: function (){
        console.log("this is a new system");
    },
    addNumbers: function (a,b){
        return a + b;
    },
    manipulate: function (a,b,opr){
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
    },
    calculateSize: function (array) {
        return array.length;
    }
}