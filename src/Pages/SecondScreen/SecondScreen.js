import useBodyID from "../../hooks/useBodyID";

import MainTitleSecondScreen from "./MainTitleSecondScreen/MainTitleSecondScreen";
import MainContentSecondScreen from "./MainContentSecondScreen/MainContentSecondScreen";

const SecondScreen = ({
    fullPrice,
    handleClick,
    currentDrawer,
    setCurrentDrawer,
    calculateRemainingSpace,
    deleteAcc
}) =>  {
        useBodyID('accessories');

        return (
                <>
                    <MainTitleSecondScreen />
                    <MainContentSecondScreen 
                        fullPrice={fullPrice}
                        handleClick={handleClick}
                        currentDrawer={currentDrawer}
                        setCurrentDrawer={setCurrentDrawer}
                        calculateRemainingSpace={calculateRemainingSpace}
                        deleteAcc={deleteAcc}
                         />
                </>
)};

export default SecondScreen;