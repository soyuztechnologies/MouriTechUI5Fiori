function jsBlockingIO() {

    window.alert("Wife wants to go to office");
    //TImer in JS
    //code will execute async
    setTimeout(function(){
        window.alert("Husband back from office");
    },10000);
    
    window.alert("She left for office");

}

function jsNonBlockingIO() {

    window.alert("Wife wants to go to office");
    //TImer in JS
    //code will execute async
    setTimeout(10000);
    window.alert("Husband back from office");
    window.alert("She left for office");


}
