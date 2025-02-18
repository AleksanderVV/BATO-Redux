import useBodyID from "../../hooks/useBodyID";

import MainTitleThirdScreen from "./MainTitleThirdScreen/MainTitleThirdScreen";
import MainContentThirdScreen from "./MainContentThirdScreen/MainContentThirdScreen";

const ThirdScreen = ({
        selectedAttachedAcc, 
        fullPrice}) =>  {
    useBodyID('total');

    return (
    <>        
        <MainTitleThirdScreen />
        <MainContentThirdScreen 
            selectedAttachedAcc={selectedAttachedAcc}
            fullPrice={fullPrice} />
    </>
)};

export default ThirdScreen;