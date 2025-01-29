import xIconImage from '../../data/images/icon/x-icon.svg';
import figure1Image from '../../data/images/icon/fig1.svg';
import figure2Image from '../../data/images/icon/fig2.svg';
import figure3Image from '../../data/images/icon/fig3.svg';
import figure4Image from '../../data/images/icon/fig4.svg';
import figure5Image from '../../data/images/icon/fig5.svg';

const TopBarAccessory = ({drawersData, deleteAcc}) => {
    const getFigureImage = (length) => {
        const figures = [figure1Image, figure2Image, figure3Image, figure4Image, figure5Image];
        return figures[length - 1]
    }

    return <>
            {Object.entries(drawersData).map(([key, array], index) => {
                const figure = getFigureImage(array.length);

                const accessory = <div className='accessory-selected__drawer d-flex justify-content-between' key={index}>
                                    <div className="accessory-selected__drawer-number d-flex align-items-center flex-shrink-0">
                                        Drawer 0{+key + 1}
                                    </div>
                                    <div 
                                        className="accessory-selected__drawer-devider" 
                                        style={{background: `url(${figure}) no-repeat center right /contain`}}>
                                    </div>
                                    <div className='accessory-selected__drawer-items'>
                                        {array.map((item, i) => (
                                            <div 
                                                className="accessory-selected__data d-flex align-items-center justify-content-between" 
                                                data-id={item.id} 
                                                data-number-drawer={+key + 1}
                                                key={i}>
                                            <div className="accessory-selected__data-name">
                                                <span>{item.name}</span>
                                                <span className="d-sm-none">EVA {item.size}/3</span>
                                            </div>
                                            <div className="accessory-selected__data-contain d-flex justify-content-between">
                                                <div className="accessory-selected__data-size flex-shrink-1 d-none d-sm-block">
                                                    EVA {item.size}/3
                                                </div>
                                                <div className="accessory-selected__data-price flex-shrink-0">
                                                    <span>{item.price}</span>,00 EUR
                                                </div>
                                                <div 
                                                    className="accessory-selected__data-close d-flex justify-content-center align-items-center"
                                                    onClick={deleteAcc}>
                                                    <img src={xIconImage} alt="close" data-id={item.id} data-drawer={key}/>
                                                </div>
                                            </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                return array.length ? accessory : '';

            })}
        </>
}

export default TopBarAccessory;