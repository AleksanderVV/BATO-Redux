import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { toolboxChoose } from '../../reducers/toolbox';

import xIcon from '../../data/images/icon/x-icon.svg';
import checkIcon from '../../data/images/icon/check.svg';

import './toolboxList.scss';

const ToolboxList = () => {

  const {toolboxList, toolboxFilters} = useSelector(state => state.toolbox);
  const {process} = useSelector(state => state.conditions);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const filterToolboxes = useMemo(() => {
    const {wheels, color, numberDrawers} = toolboxFilters;

    return toolboxList.filter(item => 
       { 

        
        return (wheels === 'all' || item.wheels === wheels) &&
        (color === 'all' || item.color[0] === color) &&
        (numberDrawers === 'all' || item.numberDrawers === numberDrawers)}
    )
    
  }, [toolboxList, toolboxFilters]);


  const renderItems = (filterToolboxes) => {

    const items = filterToolboxes.map(item => {

      const sizeContent = (
        <>
        <span className="box-height">{item.size[0]}</span>
        <img src={xIcon} alt="x"/>
        <span className="box-length">{item.size[1]}</span>
        <img src={xIcon} alt="x"/>
        <span className="box-width">{item.size[2]} mm</span>
      </>
  );

      const handleClick = () => {
        dispatch(toolboxChoose(item));
        navigate("/chooseAccessories");
      }

      return (
        <div 
          className="main-boxes__item box-item d-flex flex-column" 
          key={item.id}
          onClick={handleClick}>
          <div className="main-boxes__item_first">
            <div className="box-item__img">
              <img src={item.image} alt="Box"/>
            </div>
            <div className="box-item__content d-flex flex-column">
              <div className="box-item__title">{item.name}</div>
              <div className="box-item__id-box d-flex justify-content-between pb-2">
                <p className="box-item__id-subtitle">Item number:</p>
                <p className="box-item__id">{item.id}</p>
              </div>
              <div className="box-item__drawers-box d-flex justify-content-between pb-2">
                <p className="box-item__drawers-subtitle">Number of drawers:</p>
                <p className="box-item__drawers">{item.drawers.length}</p>
              </div>
              <div className="box-item__color-box d-flex justify-content-between pb-2">
                <p className="box-item__color-subtitle">Color:</p>
                <div className="box-item__color" style={{backgroundColor: item.color[1]}}></div>
              </div>
              <div className="box-item__wheel-box d-flex justify-content-between pb-2">
                <p className="box-item__wheel-subtitle">Wheels:</p>
                <p className="box-item__wheel">
                  {item.wheels ? <img src={checkIcon} alt="wheels true"/> : '—'}
                </p>
              </div>
              <div className="box-item__size-box d-flex justify-content-between pb-4 pb-sm-5">
                <p className="box-item__size">
                  Size H<img src={xIcon} alt="x"/>
                  L<img src={xIcon} alt="x"/>W:</p>
                <p className="box-item__size">
                   {item.size.length ? sizeContent : '—'}
                </p>
              </div>
              <div className="box-item__footer d-flex justify-content-between align-items-center">
                <button 
                  type="button"
                  onClick={handleClick}>Select</button>
                <p className="box-item__price"><span>{item.price}</span>,00 EUR</p>
              </div>
            </div>
          </div>
          <div className="main-boxes__item_second">
          </div>
        </div>
      )
    });

    return (
      <div className="main-boxes__items d-flex flex-wrap justify-content-center">
        {items}
      </div>
    )
  }

  const elements = useMemo(() => {

    const setContent = (process, Component, data) => {
      switch (process) {
          case 'waiting':
              return 'Waiting to load data...';
          case 'loading':
              return 'Data loading...';
          case 'confirmed':
              return <Component data={data}/>
          case 'error':
              return new Error(`Error ${Error.name}`);
          default:
              return new Error('Unexpected process state');
      }
    };

    return setContent(process, () => renderItems(filterToolboxes))
    // eslint-disable-next-line
  }, [process,filterToolboxes])

  return (
      <div className="row">
      <div className="col-12">
        {elements}
      </div>
    </div>
  )
}

export default ToolboxList;