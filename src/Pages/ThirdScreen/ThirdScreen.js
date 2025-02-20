import useBodyID from "../../hooks/useBodyID";

import MainTitleThirdScreen from "./MainTitleThirdScreen/MainTitleThirdScreen";
import MainContentThirdScreen from "./MainContentThirdScreen/MainContentThirdScreen";

const ThirdScreen = () =>  {
    useBodyID('total');

    return (
    <>        
        <MainTitleThirdScreen />
        <MainContentThirdScreen />
    </>
)};

export default ThirdScreen;