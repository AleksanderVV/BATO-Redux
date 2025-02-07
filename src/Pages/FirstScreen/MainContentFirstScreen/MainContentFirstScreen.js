import ToolboxFilters from '../../../components/ToolboxFilters/ToolboxFilters';
import ToolboxList from '../../../components/ToolboxList/ToolboxList';

import useToolboxService from "../../../services/ToolboxService";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { dataFetching, toolboxFetched, dataFetchingError } from '../../../actions';

import './mainContentFirstScreen.scss';

const MainContentFirstScreen = ({isMobile}) => {

    const {toolboxList} = useSelector(state => state.toolbox);
    const dispatch = useDispatch();

    const [filteredToolboxList, setFilteredToolboxList] = useState([]);
    const [filters, setFilters] = useState({
        wheels: 'all',
        color: 'all',
        numberDrawers: 'all'
    });

    const {getAllToolbox} = useToolboxService(); 
  
    useEffect(() => {
        dispatch(dataFetching());
        getAllToolbox()
            .then(data => {
                dispatch(toolboxFetched(data));
                setFilteredToolboxList(data);
            })
            .catch(() => dispatch(dataFetchingError()))
      // eslint-disable-next-line
    }, []);
  
    const filterToolboxes = (filters) => {
        const {wheels, color, numberDrawers} = filters;

        const filteredData = toolboxList.filter(item => {
            return (
                (wheels === 'all' || item.wheels === wheels) &&
                (color === 'all' || item.color[0] === color) &&
                (numberDrawers === 'all' || item.numberDrawers === numberDrawers)
            );
        });
        

        setFilteredToolboxList(filteredData);
    }

     // Update filters when a filter value changes
    const updateFilter = (filterType, value) => {
        setFilters(prevFilters => {
            const updatedFilters = {...prevFilters, [filterType]: value};
            filterToolboxes(updatedFilters);
            return updatedFilters;
        });
    }
    

    return (
        <section className="main-boxes">
            <div className="container">
                <ToolboxFilters 
                    // data={toolboxList} 
                    filters={filters} 
                    updateFilter={updateFilter}
                    isMobile={isMobile} />
                <ToolboxList data={filteredToolboxList}/>
            </div>
        </section>
    )
}

export default MainContentFirstScreen;