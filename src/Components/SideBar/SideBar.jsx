import { Outlet } from "react-router-dom";
import NestedRouteNav from "../NestedRouteNav/NestedRouteNav";

const SideBar = () => {
    return (
        <div className="bar">
            <div className="sidebar">
                <div>
                    <NestedRouteNav />
                    <Outlet />
                </div>
                <footer>
                    &copy; copyright
                </footer>
            </div>
        </div>
    );
};

export default SideBar;
