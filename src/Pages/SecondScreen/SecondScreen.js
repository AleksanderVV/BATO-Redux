import useBodyID from "../../hooks/useBodyID";

import MainTitleSecondScreen from "./MainTitleSecondScreen/MainTitleSecondScreen";
import MainContentSecondScreen from "./MainContentSecondScreen/MainContentSecondScreen";

const SecondScreen = ({
    mobileOpen,
    fullPrice,
    handleClick,
    handleAccessoryClick,
    currentDrawer,
    setCurrentDrawer,
    calculateRemainingSpace,
    searchAcc,
    loading,
    filteredAccessories,
    attachingAccessories,
    deleteAcc
}) =>  {
        useBodyID('accessories');

        return (
                <>
                    <MainTitleSecondScreen />
                    <MainContentSecondScreen 
                        mobileOpen={mobileOpen}
                        fullPrice={fullPrice}
                        handleClick={handleClick}
                        handleAccessoryClick={handleAccessoryClick}
                        currentDrawer={currentDrawer}
                        setCurrentDrawer={setCurrentDrawer}
                        calculateRemainingSpace={calculateRemainingSpace}
                        searchAcc={searchAcc}
                        loading={loading}
                        filteredAccessories={filteredAccessories}
                        attachingAccessories={attachingAccessories}
                        deleteAcc={deleteAcc}
                         />
                </>
)};

export default SecondScreen;