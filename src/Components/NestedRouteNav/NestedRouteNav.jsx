import { Link } from "react-router-dom"

const NestedRouteNav = () => {
    return (
        <nav className="nested-route">
            <ul>
                <li>
                    <Link to="Cities">Cities</Link>
                </li>
                <li>
                    <Link to="Countries">Countries</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NestedRouteNav
