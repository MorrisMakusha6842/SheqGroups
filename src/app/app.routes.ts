import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { MiniProductCardComponent } from './products/mini-product-card/mini-product-card.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { CheckOutComponent } from './shopping/check-out/check-out.component';
import { MiniCheckoutComponent } from './shopping/mini-checkout/mini-checkout.component';
import { MiniShoppingCartComponent } from './shopping/mini-shopping-cart/mini-shopping-cart.component';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './user/login/login.component';
import { MixingComponent } from './production/mixing/mixing.component';
import { AddIngredientsComponent } from './production/mixing/add-ingredients/add-ingredients.component';
import { HomeBComponent } from './home-b/home-b.component';
import { EmployeeBincardComponent } from './employee-bincard/employee-bincard.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';



export const routes: Routes = [
   {
        path: 'home',
        component:HomeComponent
   },
   {
        path: 'mini-product-card',
        component:MiniProductCardComponent
   },
   {
        path: 'product-card',
        component:ProductCardComponent
   },
   {
        path: 'products-list',
        component:ProductListComponent
   },
   {
        path: 'check-out',
        component:CheckOutComponent
   },
   {
        path: 'mini-checkout',
        component:MiniCheckoutComponent
   },
   {
        path: 'mini-shopping-cart',
        component:MiniShoppingCartComponent 
   },
   {
        path: 'shopping-cart',
        component:ShoppingCartComponent
   },
   {
        path: 'settings',
        component:SettingsComponent
   },
   {
     path: 'register-user',
     component:RegisterUserComponent
   },
   {
     path: 'login',
     component:LoginComponent
   },
   {
     path: 'mixing',
     component:MixingComponent
   },
   {
     path: 'home-b',
     component:HomeBComponent
   },
   {
     path: 'employee-bincard',
     component:EmployeeBincardComponent
   },
   {
     path: 'employee-page',
     component:EmployeePageComponent
   },
   
];
