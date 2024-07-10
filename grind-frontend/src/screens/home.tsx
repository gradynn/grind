import { useEffect, useContext } from "react";

import { UserContext } from "@src/context/UserContext";
import NavBar from "@src/components/navBar";
import { getUserData } from "@src/services/backend.service";
import { useAuth } from "@src/utils/useAuth";
import HomeDashboard from "@src/components/homeDashboard";

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
        <div className="flex flex-col h-screen">
            <NavBar />
            <HomeDashboard />
        </div>
    )
}

export default Home;