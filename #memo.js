console.log("Hi Javascript")

//let element1 = null
//let element2 = null
let clickCount = 0
function handleBoxClick(e) {
    const element = e.target

    clickCount = e.target

    clickCount = clickCount + 1

    if (clickCount == 1) {
        console.log("first click");
    
    } else if (clickCount == 2) {
        console.log("second click");
    } else if (clickCount == 3) {
        console.log("third click");

        clickCount = 0
    }

    // option 1
    // e.target.style.background = "red"

    // option 2 
    // e.target.className = "box red-box"

    // option 3

    let element1 = null;
    let element2 = null;

    

    if (element1 ==null) {
        let element1 = element

        console.log("first click")

     } else if (element2 == null) {
        element2 = element

        console.log("second click")

      }        else (
    if (e.target.classList.contains("blue-box")
       e.target.classList.remove("blue-box")
       e.target.classList.add("red-box")
 } else {
    e.target.classList.remove("blue-box")
    e.target.classList.add("red-box")
 }