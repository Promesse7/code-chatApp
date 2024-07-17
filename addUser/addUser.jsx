import "./addUser.css"

const AddUser = () => {
    return(
        <div className="addUser">
            <form >
           <input type="text" placeholder="Username" name="username" />
           <button>Search</button>
            </form>
        <div className="user">
            <div className="detail">
                <img src={rp} alt="" />
                <span>Neza Promesse</span>
            </div>
            <button>Add User</button>
        </div>
        </div>
    )
}

export default AddUser