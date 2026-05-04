import {createBrowserRouter} from "react-router";
import { Layout } from '~/components';
import { Home } from './Home.tsx';
import { Catalogue } from './Catalogue.tsx';
import { Brand } from './Brand.tsx';
import { Product } from './Product.tsx';
import { Profile } from './Profile.tsx';

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: "catalogue",
                    element: <Catalogue />
                },
                {
                    path: "catalogue/:brand",
                    element: <Brand />
                },
                {
                    path: "catalogue/:brand/:product",
                    element: <Product />
                },
                {
                    path: "profile/:id",
                    element: <Profile />
                },
                {
                    path: "*",
                    element: (
                        <div className='error'>
                            <h1 className='error__h1'>404 Page not found</h1>
                        </div>
                    ),
                },
            ],
        }
    ]
);