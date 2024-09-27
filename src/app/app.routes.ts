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
import { EmployeeIdComponent } from './employee-id/employee-id.component';
import { MyTrainingHeaderComponent } from './my-training-header/my-training-header.component';
import { TrainingSliderComponent } from './training-slider/training-slider.component';
import { ProgressRatingComponent } from './my-training-header/progress-rating/progress-rating.component';
import { TrainingWelcomeComponent } from './my-training-header/training-welcome/training-welcome.component';
import { CourseCardComponent } from './my-training-header/course-card/course-card.component';
import { SectionComponent } from './my-training-header/section/section.component';
import { ChapterComponent } from './my-training-header/chapter/chapter.component';
import { AnimationComponent } from './home-b/animation/animation.component';
import { SupaCleanComponent } from './supa-clean/supa-clean.component';
import { FlipcardsComponent } from './flipcards/flipcards.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-list/user-card/user-card.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { BioComponent } from './profile-card/bio/bio.component';
import { ViewsComponent } from './profile-card/views/views.component';
import { PositionComponent } from './profile-card/position/position.component';
import { BuyPageComponent } from './savealot/buy-page/buy-page.component';
import { FsqsSliderComponent } from './fsqs-slider/fsqs-slider.component';
import { EmailFormComponent } from './email-form/email-form.component';



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
   {
     path: 'employee-id',
     component:EmployeeIdComponent
   },
   {
     path: 'my-training-header',
     component:MyTrainingHeaderComponent
   },
   {
     path: 'training-slider',
     component:TrainingSliderComponent
   },
   {
     path: 'progress-rating',
     component:ProgressRatingComponent
   },
   {
     path: 'training-welcome',
     component:TrainingWelcomeComponent
   },
   {
     path: 'course-card',
     component:CourseCardComponent
   },
   {
     path: 'section',
     component:SectionComponent
   },
   {
     path: 'chapter',
     component:ChapterComponent
   },  
   {
     path: 'animation',
     component:AnimationComponent
   },  
   {
     path: 'supa-clean',
     component:SupaCleanComponent
   },  
   {
     path: 'flipcards',
     component:FlipcardsComponent
   },  
   {
     path: 'user-list',
     component:UserListComponent
   },  
   {
     path: 'user-card',
     component:UserCardComponent
   },  
   {
     path: 'task-list',
     component:TaskListComponent
   },  
   {
     path: 'profile-card',
     component:ProfileCardComponent
   },  
   {
     path: 'bio',
     component:BioComponent
   },  
   {
     path: 'views',
     component:ViewsComponent
   },  
   {
     path: 'position',
     component:PositionComponent
   },  
   {
     path: 'buy-page',
     component:BuyPageComponent
   },  
   {
     path: 'fsqs-slider',
     component:FsqsSliderComponent
   },  
   {
     path: 'email-form',
     component:EmailFormComponent
   },  
];
