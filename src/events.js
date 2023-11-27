// call the main key event function if a key is pressed
window.onkeydown = (e)=> KeyEvent(e.key, 1)

// call the main key event function if a key is released
window.onkeyup = (e)=> KeyEvent(e.key, 0)


function KeyEvent(Key, Pressed){
    // convert the key to uppercase since the Keys object keys are in uppercase
    Key = Key.toUpperCase()
    
    // Object.keys() returns all the keys in an object as an array
    // so this returns ['W', 'S', 'I', 'K'] (the key configurations)
    // .includes() just checks if the key is part of the key configurations
    // then set the value to whether the key has been released
    if (Object.keys(Keys).includes(Key))
        Keys[Key] = Pressed
}