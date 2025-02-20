import useBodyID from "../../hooks/useBodyID";

import MainTitleSecondScreen from "./MainTitleSecondScreen/MainTitleSecondScreen";
import MainContentSecondScreen from "./MainContentSecondScreen/MainContentSecondScreen";

const SecondScreen = ({
    currentDrawer,
    setCurrentDrawer,
    deleteAcc
}) =>  {
        useBodyID('accessories');

        return (
                <>
                    <MainTitleSecondScreen />
                    <MainContentSecondScreen 
                        currentDrawer={currentDrawer}
                        setCurrentDrawer={setCurrentDrawer}
                        deleteAcc={deleteAcc}
                         />
                </>
)};

export default SecondScreen;