import { Link } from "react-router-dom"
import Map from "../Map/Map"
import SideBar from "../SideBar/SideBar"
import User from "../User/User"

const AppLayout = () => {
    return (
        <>
            <div className="layout">
                <div className="logo">
                    <Link to="/">
                        <img src='logo.png' alt="logo.png" id="logo" />
                    </Link>
                </div>
                <div className="items">
                    <div>
                        <SideBar />
                    </div>
                    <div>
                        <Map />
                    </div>
                    <div>
                        <User />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppLayout
