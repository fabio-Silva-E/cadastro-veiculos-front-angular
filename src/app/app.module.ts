import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { MensagemErro404Component } from './components/mensagem/mensagem-erro404/mensagem-erro404.component';
import { HttpClientModule } from '@angular/common/http';
//import { VeiculoModule } from './components/veiculo/veiculo.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    MensagemErro404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
