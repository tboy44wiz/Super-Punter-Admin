import React from 'react';
import {Link} from "react-router-dom";

//  Import _AppLayout_HOC scss.
import './_AppFooter_Comp.scss';

const AppFooterComp = () => {
    const year = new Date().getFullYear();

    return (
        <div className="AppFooterComp">
            <p className="copy-right">
                Copy &#169; {year}
                <Link to="/" rel="noreferrer">
                    Super Punter.
                </Link>
            </p>
        </div>
    );
};

export default AppFooterComp;
