import { useNavigate } from "react-router-dom";
import AppNav from "../AppNav/AppNav";
import { useAuth } from "../Contexts/FakeAuthContext";
import { useEffect, useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");

    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/AppLayout", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (email && password) {
            login(email, password);
        }
    };

    return (
        <div className="login">
            <AppNav />
            <div className="login-container"></div>
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
