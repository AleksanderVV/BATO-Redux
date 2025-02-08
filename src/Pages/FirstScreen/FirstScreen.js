import useBodyID from "../../hooks/useBodyID";

import MainTitleFirstScreen from "./MainTitleFirstScreen/MainTitleFirstScreen";
import MainContentFirstScreen from "./MainContentFirstScreen/MainContentFirstScreen";

const FirstScreen = ({isSticky}) =>  {
    useBodyID('main');
    return (
    <>
        <MainTitleFirstScreen isSticky={isSticky}/>
        <MainContentFirstScreen />
    </>
)};

export default FirstScreen;