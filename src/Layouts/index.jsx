import React from 'react';

import { HeaderComponents } from './Components/Header';
import { SidebarComponents } from './Components/Sidebar';
import { FooterComponents } from './Components/Footer';

import { HeaderPageComponent } from './Components/HeaderPageComponent';

import { ButtonContextProvider } from "../Context/ButtonContext";

export const LayoutDefault = ({ children, pageName, path }) => (
    <>
        <HeaderComponents />
            <SidebarComponents path={path} />
            <div className="content-wrapper">
                <ButtonContextProvider>
                    <HeaderPageComponent pageName={pageName} />
                    <section className="content">
                        <div className="container-fluid">{children}</div>
                    </section>
                </ButtonContextProvider>
            </div>
        <FooterComponents />
    </>
);