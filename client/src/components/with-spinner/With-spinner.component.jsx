import React from 'react';

import Spinner from '../spinner/Spinner.component';

//HOC 
    //A component that returns a supped up component
    // here the supped up component is Spinner
const WithSpinner = WrappedComponent => ({  isLoading, ...otherProps }) => {
    return isLoading ? (
        <Spinner />  
    ) : (
        <WrappedComponent {...otherProps} />
    );
};

export default WithSpinner;