import { Routes } from '@angular/router';
import path from 'path';

export const routes: Routes = [
    {
        path:'home',
        loadComponent:()=>import('./Page/home/home.component'),
    children:[ 
        {
            path:'home-view',
            loadComponent:()=>import('./Page/home-view/home-view.component')
        },
        {
            path:'mascotas-create',
            loadComponent:()=>import('./Page/mascotas-create/mascotas-create.component')
        },
        {
            path:'mascotas-list',
            loadComponent:()=>import('./Page/mascotas-list/mascotas-list.component')
        },
        {
            path:'mascotas-edit/:id',
            loadComponent:()=>import('./Page/mascotas-edit/mascotas-edit.component')
        },
        {
            path: '',
                redirectTo:'home-view',
                 pathMatch: 'full',
        }
    ]
    
},
{
    path:'login',
    loadComponent:()=>import('./Page/login/login.component')
},
{
    path: '',
    redirectTo:'/login',
    pathMatch: 'full'
}
];
