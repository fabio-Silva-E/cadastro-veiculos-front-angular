import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imagemUrl: SafeResourceUrl;
  divStyle: any;

  constructor(private sanitizer: DomSanitizer) {
    // Caminho da imagem relativo à pasta assets/images
    const caminhoImagem = 'assets/images/sedan-azul-esporte-estacionado-no-quintal.jpg';

    // Gera uma URL segura para a imagem
    this.imagemUrl = this.sanitizer.bypassSecurityTrustResourceUrl(caminhoImagem);

    // Define o estilo de fundo da div
    this.divStyle = {
      'background-color': 'green'
    };
  }

  ngOnInit(): void {
  }

}
