import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AllItemsComponent } from './pages/all-items/all-items.component';
import { LoginComponent } from './pages/login/login.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { TableComponent } from './components/table/table.component';

import { AuthGuard } from './guard/auth-guard.guard';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { TranslationService } from './services/translation.service';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AllItemsComponent,
    LoginComponent,
    DynamicFormComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    ApiService,
    AuthService,
    HttpService,
    TranslationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
