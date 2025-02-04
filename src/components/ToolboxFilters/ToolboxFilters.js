import ColorFilterToolbox from '../ColorFilterToolbox/ColorFilterToolbox';
import DrawerFilterToolbox from '../DrawersFilterToolbox/DrawerFilterToolbox';
import WheelsFilterToolbox from '../WheelsFilterToolbox/WheelsFilterToolbox';

import './toolboxFilters.scss';

const ToolboxFilters = ({data, filters, updateFilter, isMobile}) => {

    return (
        <div className="row">
        <div className="col-12">
          <div className="main-boxes__filter filter-boxes d-flex justify-content-end">
            <DrawerFilterToolbox 
              data={data} 
              isMobile={isMobile}
              selected={filters.numberDrawers}
              updateFilter={value => updateFilter('numberDrawers', value)}/>
            <ColorFilterToolbox 
              data={data} 
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