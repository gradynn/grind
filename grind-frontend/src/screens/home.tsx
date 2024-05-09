import { useEffect, useContext } from "react";

import { UserContext } from "@src/context/UserContext";
import MenuBar from "@src/components/menuBar";
import { getUserData } from "@src/services/backend.service";
import { useAuth } from "@src/utils/useAuth";

const Home = () => {
    const { token } = useAuth();
    const { setUserData } = useContext(UserContext);

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                const data = await getUserData(token);
                console.log(data);
                setUserData(data);
            } else {
                console.log('No token found, user not signed in');
                setUserData(null);
            }
        }

        fetchUserData();
    }, [ token, setUserData ])

    return (
        <div className="h-screen">
            <MenuBar />
        </div>
    )
}

export default Home;