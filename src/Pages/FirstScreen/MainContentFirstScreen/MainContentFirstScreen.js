import ToolboxFilters from '../../../components/ToolboxFilters/ToolboxFilters';
import ToolboxList from '../../../components/ToolboxList/ToolboxList';

import useToolboxService from "../../../services/ToolboxService";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

import { dataFetching, toolboxFetched, dataFetchingError } from '../../../actions';

import './mainContentFirstScreen.scss';

const MainContentFirstScreen = () => {

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