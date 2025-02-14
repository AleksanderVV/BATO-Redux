import useBodyID from "../../hooks/useBodyID";

import MainTitleThirdScreen from "./MainTitleThirdScreen/MainTitleThirdScreen";
import MainContentThirdScreen from "./MainContentThirdScreen/MainContentThirdScreen";

const ThirdScreen = ({
        currentToolbox, 
        selectedAttachedAcc, 
        fullPrice}) =>  {
    useBodyID('total');

    return (
    <>        
        <MainTitleThirdScreen />
        <MainContentThirdScreen 
            currentToolbox={currentToolbox}
            selectedAttachedAcc={selectedAttachedAcc}
            fullPrice={fullPrice} />
    </>
)};

export default ThirdScreen;