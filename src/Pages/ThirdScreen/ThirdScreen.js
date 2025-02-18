import useBodyID from "../../hooks/useBodyID";

import MainTitleThirdScreen from "./MainTitleThirdScreen/MainTitleThirdScreen";
import MainContentThirdScreen from "./MainContentThirdScreen/MainContentThirdScreen";

const ThirdScreen = ({
        fullPrice}) =>  {
    useBodyID('total');

    return (
    <>        
        <MainTitleThirdScreen />
        <MainContentThirdScreen 
            fullPrice={fullPrice} />
    </>
)};

export default ThirdScreen;