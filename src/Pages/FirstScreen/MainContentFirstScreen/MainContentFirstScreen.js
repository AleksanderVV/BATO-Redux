import ToolboxFilters from '../../../components/ToolboxFilters/ToolboxFilters';
import ToolboxList from '../../../components/ToolboxList/ToolboxList';

import useToolboxService from "../../../services/ToolboxService";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { dataFetching, toolboxFetched, dataFetchingError } from '../../../actions';

import './mainContentFirstScreen.scss';

const MainContentFirstScreen = () => {

    const {toolboxList, toolboxFilters} = useSelector(state => state.toolbox);
    const dispatch = useDispatch();

    const {getAllToolbox} = useToolboxService(); 
  
    useEffect(() => {
        dispatch(dataFetching());
        getAllToolbox()
            .then(data => {
                dispatch(toolboxFetched(data));
            })
            .catch(() => dispatch(dataFetchingError()))
    }, [dispatch, getAllToolbox]);
  
    const filterToolboxes = useMemo(() => {
        const {wheels, color, numberDrawers} = toolboxFilters;

        return toolboxList.filter(item => 
            (wheels === 'all' || item.wheels === wheels) &&
            (color === 'all' || item.color[0] === color) &&
            (numberDrawers === 'all' || item.numberDrawers === numberDrawers)
        )
        
    }, [toolboxList, toolboxFilters])

    return (
        <section className="main-boxes">
            <div className="container">
                <ToolboxFilters />
                <ToolboxList data={filterToolboxes}/>
            </div>
        </section>
    )
}

export default MainContentFirstScreen;