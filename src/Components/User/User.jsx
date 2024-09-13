import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/FakeAuthContext";

const User = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        navigate("/");
    };

    console.log("User Component Rendered");
    
    // Check if user is null before rendering
    if (!user) {
        return <div>No user found</div>;
    }
    console.log("User:", user.name, user.avatar);

    return (
        <div className="user">
            <img src={user.avatar} alt={user.name} />
            <span>Welcome, {user.name}</span>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
};

export default User;
