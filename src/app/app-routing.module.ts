import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { RegisterComponent } from './register/register.component';
import { ListallempComponent } from './listallemp//listallemp.component';
const routes: Routes = [
                          {
                            path:"",component:HomeComponent
                          },
                          {
                            path:"about",component:AboutComponent
                          },
                          {
                            path:"services",component:ServicesComponent
                          },
                          {
                            path:"contact",component:ContactComponent
                          },
                          {
                            path:"product-details",component:ProductdetailsComponent
                          },
                          {
                            path:"register",component:RegisterComponent
                          },
                          {
                            path:"listall",component:ListallempComponent
                          }
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
