import { useState } from "react"
import { Link } from "react-router-dom"
export const Header = () => {
    const [isAuth, setIsAuth] = useState(false)
    const handleAuth = ()=>{setIsAuth(false)}
    return (<>
        <Link to='/'>Home</Link>
       { !isAuth ?( <div>
            <Link to='/add-post'>Post create</Link>
            <button onClick={handleAuth}>logout</button>
        </div>):(<div><div><Link to='/login'>login</Link></div>
        <div><Link to='/register'>registration</Link></div>
            </div>)}
        </>
    )
}