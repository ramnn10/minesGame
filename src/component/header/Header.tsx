import React from "react";
interface IPROPS {
    name: string
}
let Header: React.FC<IPROPS> = (props) => {
    let {name} = props
    return (
        <div>
            <h1>Header Comopnet {name}</h1>
        </div>
    )
}

export default Header;