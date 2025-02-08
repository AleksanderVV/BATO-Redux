import ColorFilterToolbox from '../ColorFilterToolbox/ColorFilterToolbox';
import DrawerFilterToolbox from '../DrawersFilterToolbox/DrawerFilterToolbox';
import WheelsFilterToolbox from '../WheelsFilterToolbox/WheelsFilterToolbox';

import './toolboxFilters.scss';

const ToolboxFilters = ({ filters, updateFilter }) => {

    return (
        <div className="row">
        <div className="col-12">
          <div className="main-boxes__filter filter-boxes d-flex justify-content-end">
            <DrawerFilterToolbox 
              updateFilter={value => updateFilter('numberDrawers', value)}/>
            <ColorFilterToolbox 
              selected={filters.color}
              updateFilter={value => updateFilter('color', value)}/>
            <WheelsFilterToolbox 
              selected={filters.wheels}
              updateFilter={value => updateFilter('wheels', value)}/>
          </div>
        </div>
      </div>
    )
}

export default ToolboxFilters;