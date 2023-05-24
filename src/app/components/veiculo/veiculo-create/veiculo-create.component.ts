import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Veiculo } from 'src/app/models/veiculo.model';
import { VeiculoService } from 'src/app/services/veiculo/veiculo.service';

@Component({
  selector: 'app-veiculo-create',
  templateUrl: './veiculo-create.component.html',
  styleUrls: ['./veiculo-create.component.css']
})
export class VeiculoCreateComponent implements OnInit {

  veiculo: Veiculo;

  constructor(private router:Router, 
              private veiculoService: VeiculoService) { 
      this.veiculo = new Veiculo();
  }

  ngOnInit(): void {
  }

  post(): void {
    this.veiculoService.post(this.veiculo)
      .pipe(take(1))
      .subscribe({
          next: veiculo => this.handleResponse(veiculo),
          error: erro => this.handleResponseError(erro.status)
       });    
  }

  handleResponse(veiculo: Veiculo):void{
    this.veiculo = veiculo;
    this.exibirMensagemSucesso();
    this.goToIndex();
  }

  exibirMensagemSucesso():void{
    alert('veiculo cadastrado com sucesso');
  }

  handleResponseError(erro: number):void{
    this.exibirMensagemErro(erro);
  }

  exibirMensagemErro(erro: number){
    let mensagemCompleta:string = '';
    if (erro === 404 || erro === 400)
        mensagemCompleta = "Preencha os campos obrigatórios.";
    else    
        mensagemCompleta = 'Ocorreu um erro! Entre em contato com suporte.';
    alert(mensagemCompleta);
  }

  back(): void{
    this.goToIndex();
  }

  goToIndex(): void {
    this.router.navigate(['veiculo/veiculo-index']);
  }

}
