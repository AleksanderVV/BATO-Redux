import useBodyID from "../../hooks/useBodyID";

import MainTitleSecondScreen from "./MainTitleSecondScreen/MainTitleSecondScreen";
import MainContentSecondScreen from "./MainContentSecondScreen/MainContentSecondScreen";

const SecondScreen = ({
    mobileOpen,
    fullPrice,
    handleClick,
    selectedAttachedAcc,
    handleAccessoryClick,
    chooseCurrentAttachedAcc,
    currentDrawer,
    setCurrentDrawer,
    calculateRemainingSpace,
    searchAcc,
    loading,
    filteredAccessories,
    attachingAccessories,
    deleteAcc,
    quantityItems}) =>  {
        useBodyID('accessories');

        return (
                <>
                    <MainTitleSecondScreen />
                    <MainContentSecondScreen 
                        mobileOpen={mobileOpen}
                        fullPrice={fullPrice}
                        handleClick={handleClick}
                        selectedAttachedAcc={selectedAttachedAcc}
                        handleAccessoryClick={handleAccessoryClick}
                        chooseCurrentAttachedAcc={chooseCurrentAttachedAcc}
                        currentDrawer={currentDrawer}
                        setCurrentDrawer={setCurrentDrawer}
                        calculateRemainingSpace={calculateRemainingSpace}
                        searchAcc={searchAcc}
                        loading={loading}
                        filteredAccessories={filteredAccessories}
                        attachingAccessories={attachingAccessories}
                        deleteAcc={deleteAcc}
                        quantityItems={quantityItems}
                         />
                </>
)};

export default SecondScreen;