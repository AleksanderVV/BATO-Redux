import ToolboxFilters from '../../../components/ToolboxFilters/ToolboxFilters';
import ToolboxList from '../../../components/ToolboxList/ToolboxList';

import useToolboxService from "../../../services/ToolboxService";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

import { toolboxFetched } from '../../../reducers/toolbox';
import { dataFetching,dataFetched, dataFetchingError } from '../../../reducers/conditions';

import './mainContentFirstScreen.scss';

const MainContentFirstScreen = () => {

    const dispatch = useDispatch();

    const {getAllToolbox} = useToolboxService(); 
  
    useEffect(() => {
        dispatch(dataFetching());
        getAllToolbox()
            .then(data => {
                dispatch(toolboxFetched(data));
                dispatch(dataFetched());
            })
            .catch(() => dispatch(dataFetchingError()))
    }, [dispatch, getAllToolbox]);

    return (
        <section className="main-boxes">
            <div className="container">
                <ToolboxFilters />
                <ToolboxList />
            </div>
        </section>
    )
}

export default MainContentFirstScreen;