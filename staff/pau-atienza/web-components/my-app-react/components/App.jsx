// const { Component } = React

// class App extends Component{
//     constructor() {
//         super()

//         this.state = {
//             view: 'landing',
//             error: undefined,
//             token: undefined
//         }
//     }

//     changeView = (input) => this.setState({view: input})

//     handleLogin = event => {
//         let {email, password} = event.target;

//         email = email.value
//         password = password.value
//         try{
//             authenticateUser(email, password, (error, token) => {
//                 if (error) return this.setState({ error: error.message })
//                 this.setState({token, view: 'home'})
//             })
//         }catch ({message}){
//             this.setState({error: message})
//         }
//     }

//     handleRegister = event => {
//         let { name, surname, email, password } = event.target;

//         name = name.value; surname = surname.value
//         email = email.value; password = password.value
//         try{
//             registerUser(name, surname, email, password, (error) => {
//                 if (error) return this.setState({error: error.message})
//                 this.changeView('login')
//             })
//         }catch ({message}){
//             this.setState({error: message})
//         }
//     }

//     render(){
//         return <>
//             {this.state.view === 'landing' && <Landing changeView = {this.changeView}/>}
//             {this.state.view === 'register' && <Register changeView = {this.changeView} handleRegister = {this.handleRegister}/>}
//             {this.state.view === 'login' && <Login changeView = {this.changeView} handleLogin = {this.handleLogin}/>}
//             {this.state.view === 'home' && <Home token = {this.state.token}/>}
//             {this.state.error && <Feedback message = {this.state.error} level = 'error'/>}
//         </>
//     }
// }


const { useState, useEffect } = React

function App(){
    const [view, setView] = useState('landing')
    const [error, setError] = useState(undefined)
    const [token, setToken] = useState(undefined)

    const handleLogin = event => {
        let {email, password} = event.target;

        email = email.value
        password = password.value
        try{
            authenticateUser(email, password, (functionError, token) => {
                if (functionError) return setError(functionError.message)
                setToken(token)
                setView('home')
            })
        }catch ({message}){setError(message)}
    }

    let handleRegister = event => {
        let { name, surname, email, password } = event.target;

        name = name.value; surname = surname.value
        email = email.value; password = password.value
        try{
            registerUser(name, surname, email, password, (functionError) => {
                if (functionError) return setError(functionError.message)
                setView('login')
            })
        }catch ({message}){setError(message)}
    }

    return <>
        {view === 'landing' && <Landing setView = {setView}/>}
        {view === 'register' && <Register setView = {setView} handleRegister = {handleRegister}/>}
        {view === 'login' && <Login setView = {setView} handleLogin = {handleLogin}/>}
        {view === 'home' && <Home token = {token} setToken = {setToken} setError = {setError}/>}
        {error && <Feedback message = {error} level = 'error'/>}
    </>
}
