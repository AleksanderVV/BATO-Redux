import useBodyID from "../../hooks/useBodyID";

import MainTitleFirstScreen from "./MainTitleFirstScreen/MainTitleFirstScreen";
import MainContentFirstScreen from "./MainContentFirstScreen/MainContentFirstScreen";

const FirstScreen = ({isSticky, isMobile}) =>  {
    useBodyID('main');
    return (
    <>
        <MainTitleFirstScreen isSticky={isSticky}/>
        <MainContentFirstScreen isMobile={isMobile} />
    </>
)};

export default FirstScreen;