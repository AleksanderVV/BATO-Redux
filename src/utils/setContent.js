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
}

export default setContent;