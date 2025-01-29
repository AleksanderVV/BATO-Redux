import useBodyID from "../../hooks/useBodyID";

import MainTitleSecondScreen from "./MainTitleSecondScreen/MainTitleSecondScreen";
import MainContentSecondScreen from "./MainContentSecondScreen/MainContentSecondScreen";

const SecondScreen = ({
    isMobile,
    mobileOpen,
    isSticky, 
    toggleDropdownMenuOpen,
    currentToolbox, 
    fullPrice,
    handleClick,
    drawersData,
    setDrawersData,
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
                    <MainTitleSecondScreen 
                        isMobile={isMobile}
                        isSticky={isSticky}/>
                    <MainContentSecondScreen 
                        isMobile={isMobile}
                        mobileOpen={mobileOpen}
                        toggleDropdownMenuOpen={toggleDropdownMenuOpen}
                        currentToolbox={currentToolbox} 
                        fullPrice={fullPrice}
                        handleClick={handleClick}
                        drawersData={drawersData}
                        setDrawersData={setDrawersData}
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