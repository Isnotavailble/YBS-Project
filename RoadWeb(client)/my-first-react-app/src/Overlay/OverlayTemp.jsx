function OverLay() {
    return (<div className="overlay"><div className="overlay-container">
        <span style={{ fontSize: "24px", fontWeight: "600" }}>Something was wrong!</span>
        <span style={{ fontSize: "13px" }}>Please Try again</span>
        <button onClick={() => window.location.reload()}>Try Again</button>
    
        <span className="loaderError" style={{textAlign: "center"}}></span>
    
        </div></div>)
}
export default OverLay;