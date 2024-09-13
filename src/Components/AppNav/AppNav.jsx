import { Link, NavLink } from "react-router-dom"

const AppNav = () => {
    return (
        <nav id="navbar">
            <ul>
                <div className="logo">
                    <Link to="/">
                        <img src="logo.png" alt="" id="logo" />
                    </Link>
                </div>
                <div className="list">

                    <li>
                        <NavLink to="/Pricing" >Pricing</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Product" >Product</NavLink>
                    </li>
                    <li id="login">
                        <NavLink to="/Login" >Login</NavLink>
                    </li>
                </div>
            </ul>
        </nav>
    )
}

export default AppNav
