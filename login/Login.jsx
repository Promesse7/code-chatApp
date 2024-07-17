import "./login.css"

const Login = () =>{
    const [avatar,setAvatar]= setAvatar(
        {
            file:null,
            url:""
        }
    )
    const handleAvatar = e => {
        if (e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
         }
    }

    const handleLogin = e =>{
        e.preventDefault()
    }
    return(
        <div className="login">
            <div className="item">
                <h2>Welcome back!</h2>

                <form action="" onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="password" name="password" />
                    <button>Sign in</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
            <h2>Create an account!</h2>

<form action="">
    <label htmlFor="file">
        <img src={avatar.url || profile} alt="" />
        Upload an image:
    </label>
    <input type="file"  id="file" style={{display:"none"}} onChange={handleAvatar}/>
    <input type="text" placeholder="Username" name="username" />
    <input type="text" placeholder="Email" name="email" />
    <input type="password" placeholder="password" name="password" />
    <button>Sign up</button>
</form>
            </div>
        </div>
    )
}

export default Login