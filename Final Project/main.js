
// The current screen viewed by the user
// Certain button presses changes this variable
// It is used in the render function to determine what to display to the user
let currentView = "signup-or-login"

let authenticationFailedSource = undefined
let authenticationFailedReason = undefined

let token = undefined

let currentMessageLength = undefined

let signupOrLoginView = () => {
    //  You will need to modify this function
    let container = document.createElement("div")
    container.setAttribute("id", "homepage-container")
    // login button
    let loginButton = document.createElement("button")
    loginButton.setAttribute("id", "login-btn")
    loginButton.innerText = "Login"
    loginButton.addEventListener("click", ()=>{
        currentView = "login"
        render()
    })
    // sign up button
    let signupButton = document.createElement("button")
    signupButton.setAttribute("id", "signup-btn")
    signupButton.innerText = "Signup"
    signupButton.addEventListener("click", () => {
        currentView = "signup"
        render()
    })

    container.appendChild(signupButton)
    container.appendChild(loginButton)
    return container
}

let signupView = () => {
    //  You will need to modify this function

    let container = document.createElement("div")
    container.setAttribute("class", "signup-login-page-container")

    let signupHeader = document.createElement("div")
    signupHeader.setAttribute("id", "signup-login-page-header")
    signupHeader.innerText = "Sign up"

    // sign up page username container
    let userNameContainer = document.createElement("div")
    let usernameLabel = document.createElement("label")
    usernameLabel.innerText = "Username"
    let usernameInput = document.createElement("input")
    userNameContainer.appendChild(usernameLabel)
    userNameContainer.appendChild(usernameInput)

    // sign up page password container
    let passwordContainer = document.createElement("div")
    let passwordLabel = document.createElement("label")
    passwordLabel.innerText = "Password"
    let passwordInput = document.createElement("input")
    passwordContainer.appendChild(passwordLabel)
    passwordContainer.appendChild(passwordInput)

    let cancelButton = document.createElement("button")
    cancelButton.innerText = "Cancel"
    cancelButton.addEventListener("click", ()=>{
        currentView = "signup-or-login"
        render();
    })
    let submitButton = document.createElement("button")
    submitButton.innerText = "submit"
    
    // Async, Await
    submitButton.addEventListener('click', async () => {
        container.appendChild(loading())
        let username = usernameInput.value
        let password = passwordInput.value
        let requestBody = {}
        if(username !== "") {
            requestBody.username = username
        }
        if(password !== ""){
            requestBody.password = password
        }
        let bodyToBeSent = JSON.stringify(requestBody)

        let response = await fetch("https://spotted-steel-twister.glitch.me/signup", { method: "POST", body: bodyToBeSent })
        let responseBody = await response.text()
        console.log("received from /login  " + responseBody)
        let parsed = JSON.parse(responseBody)
        if (parsed.success) {
            alert("Signup successful")
            currentView = "login"
            render()
        } else {
            // alert("signup not successful")
            authenticationFailedSource = "Signup"
            authenticationFailedReason = parsed.reason
            // console.log(failedReason)
            currentView = "authentication-failed"
            render()
        }
    })

    // // Promise.then
    // submitButton.addEventListener('click', () => {
        // let username = usernameInput.value
        // let password = passwordInput.value
        // let requestBody = {}
        // if(username !== "") {
        //     requestBody.username = username
        // }
        // if(password !== ""){
        //     requestBody.password = password
        // }
        // let bodyToBeSent = JSON.stringify(requestBody)

        // // fetch is covered in depth in the slides
        // // You will need to replace PASTE_THE_URL_FROM_GLITCH with your glitch server url
        // fetch("https://spotted-steel-twister.glitch.me/signup", { method: "POST", body: bodyToBeSent })
        //     .then(response => {
        //         return response.text()
        //     })
        //     .then(body => {
        //         // putting a debugger statement here might be useful
        //         console.log("received from /login  " + body)
        //         // JSON.parse converts a string to a JavaScript value
        //         // For this particular server, you always need to call it.
        //         let parsed = JSON.parse(body)
        //         if (parsed.success) {
        //             alert("Signup successful")
        //             currentView = "login"
        //             render()
        //         } else {
        //             // alert("signup not successful")
        //             authenticationFailedSource = "Signup"
        //             authenticationFailedReason = parsed.reason
        //             // console.log(failedReason)
        //             currentView = "authentication-failed"
        //             render()
        //         }
        //     })
    // })

    container.appendChild(signupHeader)
    container.appendChild(userNameContainer)
    container.appendChild(passwordContainer)
    container.appendChild(cancelButton)
    container.appendChild(submitButton)
    return container
}

let loginView = () => {
    //  You will need to modify this function

    let container = document.createElement("div")
    container.setAttribute("class", "signup-login-page-container")

    let loginHeader = document.createElement("div")
    loginHeader.setAttribute("id", "signup-login-page-header")
    loginHeader.innerText = "Login"
    
    
    // sign up page username container
    let userNameContainer = document.createElement("div")
    let usernameLabel = document.createElement("label")
    usernameLabel.innerText = "Username"
    let usernameInput = document.createElement("input")
    userNameContainer.appendChild(usernameLabel)
    userNameContainer.appendChild(usernameInput)

    // sign up page password container
    let passwordContainer = document.createElement("div")
    let passwordLabel = document.createElement("label")
    passwordLabel.innerText = "Password"
    let passwordInput = document.createElement("input")
    passwordContainer.appendChild(passwordLabel)
    passwordContainer.appendChild(passwordInput)
    
    
    let cancelButton = document.createElement("button")
    cancelButton.innerText = "Cancel"
    cancelButton.addEventListener("click", ()=>{
        currentView = "signup-or-login"
        render();
    })
    let submitButton = document.createElement("button")
    submitButton.innerText = "submit"

    // Async, Await
    submitButton.addEventListener('click', async () => {
        container.appendChild(loading())    // add loading mask here
        let username = usernameInput.value
        let password = passwordInput.value
        let requestBody = {}
        if(username !== "") {
            requestBody.username = username
        }
        if(password !== ""){
            requestBody.password = password
        }
        let bodyToBeSent = JSON.stringify(requestBody)

        let response = await fetch("https://spotted-steel-twister.glitch.me/login", { method: "POST", body: bodyToBeSent })
        let responseBody = await response.text()    
        console.log("received from /login  " + responseBody)
        let parsed = JSON.parse(responseBody)
        if (parsed.success) {
            token = parsed.token
            currentView = "message"
            currentMessageLength = 0    // when re-login, there would no any message showing in the window
            render()
        } else {
            authenticationFailedSource = "Login"
            authenticationFailedReason = parsed.reason                    
            currentView = "authentication-failed"
            render()
        }
    })
    
    // // Promise.then
    // submitButton.addEventListener('click', () => {
    //     let username = usernameInput.value
    //     let password = passwordInput.value
    //     let requestBody = {}
    //     if(username !== "") {
    //         requestBody.username = username
    //     }
    //     if(password !== ""){
    //         requestBody.password = password
    //     }

    //     let bodyToBeSent = JSON.stringify(requestBody)
    //     fetch("https://spotted-steel-twister.glitch.me/login", { method: "POST", body: bodyToBeSent })
    //         .then(response => {
    //             return response.text()
    //         })
    //         .then(body => {
    //             console.log("received from /login  " + body)
    //             let parsed = JSON.parse(body)
    //             if (parsed.success) {
    //                 token = parsed.token
    //                 currentView = "message"
    //                 render()
    //             } else {
    //                 authenticationFailedSource = "Login"
    //                 authenticationFailedReason = parsed.reason                    
    //                 currentView = "authentication-failed"
    //                 render()
    //             }
    //         })
    // })

    container.appendChild(loginHeader)
    container.appendChild(userNameContainer)
    container.appendChild(passwordContainer)
    container.appendChild(cancelButton)
    container.appendChild(submitButton)
    return container
}

let authenticationFailedView = () => {
    let container = document.createElement("div")
    container.setAttribute("id", "authentication-failed-page")
    let failedResponse = document.createElement("div")
    failedResponse.innerText = authenticationFailedSource + " failed. Reason: " + authenticationFailedReason

    let backToHomeButton = document.createElement("button")
    backToHomeButton.innerText = "Back to home"
    backToHomeButton.addEventListener("click", ()=>{
        currentView = "signup-or-login"
        render()
    })

    container.appendChild(failedResponse)
    container.appendChild(backToHomeButton)
    return container;
}

let messageView = () => {
    let container = document.createElement("div")
    container.setAttribute("id", "message-view-container")

    let newMessageAlert = document.createElement("span")
    newMessageAlert.setAttribute("id", "new-msg-alert")
    newMessageAlert.innerText = "New messages!!"

    let refreshButtonContainer = document.createElement("div")
    refreshButtonContainer.setAttribute("id", "msg-display")
    let refreshButton = document.createElement("button")
    refreshButton.setAttribute("id", "refresh-btn")
    refreshButton.innerText = "Refresh"
    refreshButtonContainer.appendChild(refreshButton)

    // Async, Await
    refreshButton.addEventListener("click", async () => {
        let parsed = await getMessagesFromServer()
        let messages = parsed.messages

        let fromUser = undefined
        let fromContent = undefined
        refreshButtonContainer.innerHTML = ""
        refreshButtonContainer.appendChild(refreshButton)
        
        for(let i=0; i<messages.length; i++){
            fromUser = messages[i].from
            fromContent = messages[i].contents
            let messageShowingLine = document.createElement("div")
            messageShowingLine.innerText = fromUser + ": " + fromContent
            refreshButtonContainer.appendChild(messageShowingLine)
        }
        currentMessageLength = messages.length
    })

    // // Promise.then
    // refreshButton.addEventListener("click", () => {
    //     console.log("geting messages from server")
    //     fetch("https://spotted-steel-twister.glitch.me/messages")
    //         .then(response => {
    //             return response.text()
    //         })
    //         .then(body => {
    //             let parsed = JSON.parse(body)
    //             let messages = parsed.messages

    //             let fromUser = undefined
    //             let fromContent = undefined
    //             refreshButtonContainer.innerHTML = ""
    //             refreshButtonContainer.appendChild(refreshButton)
                
    //             for(let i=0; i<messages.length; i++){
    //                 fromUser = messages[i].from
    //                 fromContent = messages[i].contents
    //                 let messageShowingLine = document.createElement("div")
    //                 messageShowingLine.innerText = fromUser + ": " + fromContent
    //                 refreshButtonContainer.appendChild(messageShowingLine)
    //             }
    //         })
    // })

    setInterval(async () => {
        let updatingMessage = await getMessagesFromServer()
        let newMessage = updatingMessage.messages.length > currentMessageLength
        console.log(newMessage)
        console.log(currentMessageLength)
        if(newMessage){
            refreshButtonContainer.insertBefore(newMessageAlert, refreshButtonContainer.childNodes[1])
        }
    }, 3000);


    // send message footer
    let messageContainer = document.createElement("div")
    messageContainer.setAttribute("id", "message-container")
    let messageInput = document.createElement("input")
    let sendMessageButton = document.createElement("button")
    messageContainer.appendChild(messageInput)
    messageContainer.appendChild(sendMessageButton)
    sendMessageButton.setAttribute("id", "send-msg-btn")
    sendMessageButton.innerText = "Send message"
    messageInput.addEventListener("keypress", (event)=>{
        if(event.key === "Enter"){
            sendMessageButton.click() 
        }       
    })
    // Async, Await
    sendMessageButton.addEventListener("click", async () => {
        refreshButtonContainer.appendChild(loading())
        console.log("sending message")
        let messageToBeSent = messageInput.value
        bodyToBeSent = JSON.stringify({"token": token, "contents": messageToBeSent})
        let response = await fetch("https://spotted-steel-twister.glitch.me/message", {method: "POST", body: bodyToBeSent})
        let responseBody = await response.text()
        console.log("received from /message " + responseBody)
        let parsed = JSON.parse(responseBody)
        if(parsed.success){
            console.log("sending the message to server")
            messageInput.value = ""
            refreshButton.click()
        } else {
            authenticationFailedSource = "Sending message"
            authenticationFailedReason = parsed.reason
            currentView = "authentication-failed"
            render()
        }
    })

    // // Promise.then
    // sendMessageButton.addEventListener("click", () => {
    //     console.log("sending message")
    //     let messageToBeSent = messageInput.value
    //     bodyToBeSent = JSON.stringify({"token": token, "contents": messageToBeSent})
    //     fetch("https://spotted-steel-twister.glitch.me/message", {method: "POST", body: bodyToBeSent})
    //         .then(response => {
    //             return response.text()
    //         })
    //         .then(body => {
    //             console.log("received from /message " + body)
    //             let parsed = JSON.parse(body)
    //             if(parsed.success){
    //                 console.log("sending the message to server")
    //                 messageInput.value = ""
    //             } else {
    //                 authenticationFailedSource = "Sending message"
    //                 authenticationFailedReason = parsed.reason
    //                 currentView = "authentication-failed"
    //                 render()
    //             }
    //         })
    // })

    

    
    container.appendChild(refreshButtonContainer)
    container.appendChild(messageContainer)
    return container
}

let getMessagesFromServer = async () =>{
    console.log("geting messages from server")
    let response = await fetch("https://spotted-steel-twister.glitch.me/messages")
    let responseBody = await response.text()
    let parsed = JSON.parse(responseBody)
    return parsed
}

let loading = () => {
    let container = document.createElement("div")
    container.setAttribute("class", "loading")
    return container
}

// Rerenders the page
let render = () => {
    // Will contain a reference 
    let toRender = undefined
    // For debugging purposes
    console.log("rendering view", currentView)
    if (currentView === "signup-or-login") {
        toRender = signupOrLoginView()
    } else if (currentView === "signup") {
        toRender = signupView()
    } else if (currentView === "login") {
        toRender = loginView()
    } else if (currentView === "message") {
        toRender = messageView()
    } else if (currentView === "authentication-failed") {
        toRender = authenticationFailedView()
    } else {
        // woops
        alert("unhandled currentView " + currentView)
    }

    // Removes all children from the body
    document.body.innerHTML = ""
    document.body.appendChild(toRender)
}

// Initial render
render()