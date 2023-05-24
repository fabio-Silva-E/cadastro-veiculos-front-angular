import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Veiculo } from 'src/app/models/veiculo.model';
import { VeiculoService } from 'src/app/services/veiculo/veiculo.service';

@Component({
  selector: 'app-veiculo-index',
  templateUrl: './veiculo-index.component.html',
  styleUrls: ['./veiculo-index.component.css']
})
export class VeiculoIndexComponent implements OnInit {

  codigoPesquisa: string;
  veiculos: Veiculo[];
  
  constructor(private router:Router, 
              private veiculoService:VeiculoService) //Injeção de Dependência => router, medicoService
  { 
    this.codigoPesquisa = "";
    this.veiculos = new Array<Veiculo>();
  } 

  ngOnInit(): void {
  }

  get():void{
    this.veiculos = [];
    if (this.codigoPesquisa === "")
      this.getAll(); 
    else
      this.getById(Number(this.codigoPesquisa));
  }

  getAll(): void{
    this.veiculoService.getAll()
    .pipe(take(1))
    .subscribe({
      next: veiculos => this.handleResponseVeiculos(veiculos),
      error: erro => this.handleResponseError(erro.status)
    });   
  }

  getById(id:number): void{
    this.veiculoService.getById(id)
    .pipe(take(1))
    .subscribe({
      next: veiculo => this.handleResponseVeiculo(veiculo),
      error: erro => this.handleResponseError(erro.status)
    }); 
  }

  handleResponseVeiculos(veiculos: Veiculo[]):void{
    this.veiculos = veiculos;
  }

  handleResponseVeiculo(veiculo: Veiculo):void{    
    this.veiculos.push(veiculo);
  }

  handleResponseError(erro:number):void{
    this.exibirMensagemErro(erro);
  }

  exibirMensagemErro(erro: number):void{
    let mensagemCompleta:string = '';
    if (erro === 404 || erro === 400)
        mensagemCompleta = "veiculo não foi encontrado.";
    else    
        mensagemCompleta = 'Ocorreu um erro! Entre em contato com suporte.';
    alert(mensagemCompleta);
  }

  create():void{
    this.router.navigate(['veiculo/veiculo-create']);
  }

  editar(id:number):void{
    this.router.navigate(['veiculo/veiculo-edit',id]);
  }

  desejaExcluir(id:number):void{
    if (confirm("Deseja excluir?"))
      this.excluir(id);
  }

  excluir(id:number):void{
    this.veiculoService.delete(id)
    .pipe(take(1))
    .subscribe({
      next: () => this.get(),
      //next: response => {console.log(response); this.get()}, //response == null => Para produção, retirar console.log
      error: erro => this.handleResponseError(erro.status)
    });
  }  
}
