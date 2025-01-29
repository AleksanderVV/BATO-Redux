import './mainTitleFirstScreen.scss';

const MainTitleFirstScreen = ({isSticky}) => {
    return (
        <section 
            className={`main-header ${!isSticky ? '' : 'margin-top'}`}>
            <h1>BATO trolley product builder</h1>
            <p className="text">
            Here you now have the opportunity to combine your own trolley – of course 100% non-binding. Build the trolley you have dreamed of, and only with the tool you need.
            </p>
        </section>
    )
}

export default MainTitleFirstScreen;