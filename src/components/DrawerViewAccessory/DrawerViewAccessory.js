import { useState, useEffect } from 'react';

import accSize1Image from '../../data/images/accessory-size-1.jpg';
import accSize2Image from '../../data/images/accessory-size-2.jpg';
import accSize3Image from '../../data/images/accessory-size-3.jpg';

const DrawerViewAccessory = ({ drawersData, deleteAcc, currentToolbox, currentDrawer }) => {
    const [layoutConfig, setLayoutConfig] = useState({
        pointTop: window.innerWidth > 575 ? 47 : 37,
        stepPoint: window.innerWidth > 575 ? 134 : 105,
        stepPointMax: window.innerWidth > 575 ? 186 : 146,
        secondaryTop: window.innerWidth > 575 ? 233 : 183, 
        thirdTop: window.innerWidth > 575 ? 233 : 183, 
        secondaryStepPoint: window.innerWidth > 575 ? 501 : 393, 
    });

    const getAccessoryImage = (size) => {
        const images = [accSize1Image, accSize2Image, accSize3Image];
        return images[size - 1];
    };

    useEffect(() => {
        const updateLayoutConfig = () => {
            setLayoutConfig({
                pointTop: window.innerWidth > 575 ? 47 : 37,
                stepPoint: window.innerWidth > 575 ? 134 : 105,
                stepPointMax: window.innerWidth > 575 ? 186 : 146,
                secondaryTop: window.innerWidth > 575 ? 233 : 183,
                thirdTop: window.innerWidth > 575 ? 367 : 288, 
                secondaryStepPoint: window.innerWidth > 575 ? 501 : 393,
            });
        };

        updateLayoutConfig(); // Initialize on mount

        window.addEventListener("resize", updateLayoutConfig);
        return () => window.removeEventListener("resize", updateLayoutConfig);
    }, []);

    const calculateTopSpaceAcc = (index, size, array) => {
        const { pointTop, stepPoint, secondaryTop, thirdTop, secondaryStepPoint } = layoutConfig;

        if (currentToolbox.drawers[currentDrawer] === 4) {
            if (size === 1) {
                if (index === 0) return pointTop; 

                const firstAccSize = array[0].size;   
                const secondAccSize = array[1].size;

                if (index === 1 && firstAccSize === 1 ) return secondaryTop; 
                if (index === 1 && (firstAccSize === 2 || firstAccSize === 3) ) return pointTop; 
                if (index === 2 && (firstAccSize === 2 || secondAccSize === 2) ) return secondaryStepPoint;
                return secondaryTop + (index - 1) * stepPoint; 
            } else if (size === 2 || size === 3) {
                if (index === 2) return thirdTop;
                return secondaryTop;
            }
        }

        let top = pointTop;
        for (let i = 0; i < index; i++) {
            top += array[i].size * stepPoint; 
        }
        return top;
    };

    return (
        <>
            {Object.entries(drawersData).map(([key, array]) => {
                if (+key !== +currentDrawer) return null;

                return array.map((item, index) => {
                    const top = calculateTopSpaceAcc(index, item.size, array);

                    return (
                        <div
                            className={`drawers-content__image-size${item.size}`}
                            style={{ top: `${top}px` }}
                            data-id={item.id}
                            key={item.id}
                        >
                            <img src={getAccessoryImage(item.size)} alt="Accessory" />
                            <div
                                className="drawers-content__delete"
                                data-id={item.id}
                                data-drawer={key}
                                onClick={deleteAcc}
                            ></div>
                        </div>
                    );
                });
            })}
        </>
    );
};

export default DrawerViewAccessory;
