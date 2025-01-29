import xIconImage from '../../data/images/icon/x-icon.svg';

const TopBarAttachedAccessory = ({selectedAttachedAcc, attachingAccessories}) => {
    const titleAttachedAcc = selectedAttachedAcc.length !== 0 ? <div className="accessory-selected__drawer-number d-flex align-items-start flex-shrink-0 pt-3">
                                Attaching accessories
                            </div> : '';
    const attachedAccList = selectedAttachedAcc ? selectedAttachedAcc.map((item,i) => {
        const currentAcc = attachingAccessories.filter(acc => acc.id === item)[0];    
        
        return (
            <div key={i} className="accessory-selected__data d-flex align-items-center justify-content-between" data-id={currentAcc.id} data-number-drawer="none">
                <div className="accessory-selected__data-name">
                <span>{currentAcc.name}</span>
                <span className="d-sm-none">EVA {currentAcc.size}/3</span>
                </div>
                <div className="accessory-selected__data-contain d-flex justify-content-between">
                <div className="accessory-selected__data-size flex-shrink-1 d-none d-sm-block">
                    EVA {currentAcc.size}/3
                </div>
                <div className="accessory-selected__data-price flex-shrink-0">
                <span>{currentAcc.price}</span>,00 EUR
                </div>
                <div className="accessory-selected__data-close d-flex justify-content-center align-items-center">
                    <img src={xIconImage} alt="close" />
                </div>
                </div>
            </div>
        )
    }) : '';
   
    return <div className='accessory-selected__drawer-attaching d-flex justify-content-between'>
        {titleAttachedAcc}
        <div className="accessory-selected__drawer-items flex-shrink-0">
            {attachedAccList}
        </div>
    </div>
}

export default TopBarAttachedAccessory;