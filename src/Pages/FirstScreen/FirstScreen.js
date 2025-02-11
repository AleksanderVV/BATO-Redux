import useBodyID from "../../hooks/useBodyID";

import MainTitleFirstScreen from "./MainTitleFirstScreen/MainTitleFirstScreen";
import MainContentFirstScreen from "./MainContentFirstScreen/MainContentFirstScreen";

const FirstScreen = () =>  {
    useBodyID('main');
    return (
    <>
        <MainTitleFirstScreen />
        <MainContentFirstScreen />
    </>
)};

export default FirstScreen;