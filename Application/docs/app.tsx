// Libraries
import React from 'react';
// import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import DesignTemplate from './../components/design-template';
// Components
// import Testing from './testing';
// import Document from './document';
import '@antscorp/components/main.css';

const App = () => {
    // const routes = [
    //     {
    //         state: 'testing',
    //         path: '/testing',
    //         exact: true,
    //         name: 'Testing'
    //         // component: Testing
    //     },
    //     {
    //         state: 'document',
    //         path: '/document',
    //         exact: true,
    //         name: 'Document'
    //         // component: Document
    //     }
    // ];

    return (
    // <Suspense fallback={<div>Loading...</div>}>
    //     <Router>
    //         <Switch>
    //             {routes.map((route, idx) => {
    //                 return route.component ? (
    //                     <Route key={idx} path={route.path} exact={route.exact}  component={route.component} /* name={route.name} */ />) : null;
    //             }
    //             )}

        //             <Redirect to="/document" />
        //         </Switch>
        //     </Router>
        // </Suspense>
        <>
            <DesignTemplate />
        </>
    );
};

export default App;
