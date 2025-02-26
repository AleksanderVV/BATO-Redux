import { useSelector, useDispatch } from 'react-redux';
import { updateToolboxFilter } from '../../reducers/toolbox';

import ColorFilterToolbox from '../ColorFilterToolbox/ColorFilterToolbox';
import DrawerFilterToolbox from '../DrawersFilterToolbox/DrawerFilterToolbox';
import WheelsFilterToolbox from '../WheelsFilterToolbox/WheelsFilterToolbox';

import './toolboxFilters.scss';

const ToolboxFilters = () => {
  const filters = useSelector(state => state.toolbox.toolboxFilters);
  const dispatch = useDispatch();

  const handleFilterChange = (filterType, value) => {
    dispatch(updateToolboxFilter({filterType, value}));
  };

    return (
        <div className="row">
        <div className="col-12">
          <div className="main-boxes__filter filter-boxes d-flex justify-content-end">
            <DrawerFilterToolbox 
              updateFilter={value => handleFilterChange('numberDrawers', value)}/>
            <ColorFilterToolbox 
              selected={filters.color}
              updateFilter={value => handleFilterChange('color', value)}/>
            <WheelsFilterToolbox 
              selected={filters.wheels}
              updateFilter={value => handleFilterChange('wheels', value)}/>
          </div>
        </div>
      </div>
    )
}

export default ToolboxFilters;