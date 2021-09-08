function jsBlockingIO() {

    console.log("Anubhav Borrowed book");
    //TImer in JS
    setTimeout(function() {
        console.log("Returned the Book");
        alert("After 10 sec Return The Book");
    }, 10000); //takes 10 s
    console.log("Anubhav left Town");

}

function jsNonBlockingIO() {

    console.log("Anubhav Borrowed book");
    //TImer in JS
    setTimeout(10000);
    console.log("Returned the Book");
    console.log("Anubhav left Town");


}