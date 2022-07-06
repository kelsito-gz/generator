import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { GeneratorComponent } from "./generator.component";
import { JavascriptComponent } from "./javascript/javascript.component";
import { LinealComponent } from "./lineal/lineal.component";
import { MultiplicativeComponent } from "./multiplicative/multiplicative.component";

const routes: Routes = [
    { path: "", component: GeneratorComponent},
    { path: "lineal", component: LinealComponent },
    { path: "javascript", component: JavascriptComponent },
    { path: "multiplicative", component: MultiplicativeComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }