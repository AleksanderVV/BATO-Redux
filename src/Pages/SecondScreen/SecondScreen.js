import useBodyID from "../../hooks/useBodyID";

import MainTitleSecondScreen from "./MainTitleSecondScreen/MainTitleSecondScreen";
import MainContentSecondScreen from "./MainContentSecondScreen/MainContentSecondScreen";

const SecondScreen = () =>  {
        useBodyID('accessories');

        return (
                <>
                    <MainTitleSecondScreen />
                    <MainContentSecondScreen />
                </>
)};

export default SecondScreen;