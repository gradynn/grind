import { useEffect, useContext } from "react";

import { UserContext } from "@src/context/UserContext";
import NavBar from "@src/components/menuBar";
import { getUserData } from "@src/services/backend.service";
import { useAuth } from "@src/utils/useAuth";

const Home = () => {
    const { token } = useAuth();
    const { setUserData } = useContext(UserContext);

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                const data = await getUserData(token);
                setUserData(data);
            } else {
                setUserData(null);
            }
        }

        fetchUserData();
    }, [ token, setUserData ])

    return (
        <div className="h-screen">
            <NavBar />
        </div>
    )
}

export default Home;