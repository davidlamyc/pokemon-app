import React from 'react';

const SecondaryHeader = ({type}) => {
    return (
        <div class="ui top attached tabular menu">
            <h1 class="item">{`Popular ${type}`}</h1>
        </div>
    )
}

export default SecondaryHeader;