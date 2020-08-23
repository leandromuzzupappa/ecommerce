import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeLayout = props => {
    return (
        <div>
            <Header />
            <main className="mainFullwidth">
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

export default HomeLayout;