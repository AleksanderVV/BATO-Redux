import useBodyID from "../../hooks/useBodyID";

import MainTitleSecondScreen from "./MainTitleSecondScreen/MainTitleSecondScreen";
import MainContentSecondScreen from "./MainContentSecondScreen/MainContentSecondScreen";

const SecondScreen = ({
    deleteAcc
}) =>  {
        useBodyID('accessories');

        return (
                <>
                    <MainTitleSecondScreen />
                    <MainContentSecondScreen 
                        deleteAcc={deleteAcc}
                         />
                </>
)};

export default SecondScreen;