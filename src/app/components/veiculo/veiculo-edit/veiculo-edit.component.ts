import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Veiculo } from 'src/app/models/veiculo.model';
import { VeiculoService } from 'src/app/services/veiculo/veiculo.service';

@Component({
  selector: 'app-veiculo-edit',
  templateUrl: './veiculo-edit.component.html',
  styleUrls: ['./veiculo-edit.component.css']
})
export class VeiculoEditComponent implements OnInit {

  veiculo: Veiculo;

  constructor(private router:Router, 
                private activatedRoute: ActivatedRoute,
                private veiculoService: VeiculoService) {     
    
    this.getById(this.getId());
    this.veiculo = new Veiculo();
  }

  getId():number{
    return Number(this.activatedRoute.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {    
  }

  getById(id:number): void{
    this.veiculoService.getById(id)
    .pipe(take(1))
    .subscribe({
      next: veiculo => this.handleResponseVeiculo(veiculo),
      error: erro => this.handleResponseError(erro.status)
    }); 
  }

  handleResponseVeiculo(veiculo: Veiculo):void{
    if (veiculo.DataFabricacao != null)
      veiculo.DataFabricacao = veiculo.DataFabricacao.split('T')[0];      
    this.veiculo = veiculo;
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

  back(): void{
    this.router.navigate(['veiculo/veiculo-index']);
  }

  desejaAlterar(id:number){
    if (confirm(`Deseja alterar veiculo ${id}?`))
      this.put(id);
  }

  put(id:number): void{
    this.veiculoService.put(id, this.veiculo)
    .pipe(take(1))
    .subscribe({
        next: veiculo => this.handleResponseVeiculoPut(veiculo),
        error: erro => this.handleResponseError(erro.status)
     }); 
  }

  handleResponseVeiculoPut(veiculo: Veiculo):void{
    alert(`Veiculo ${veiculo.Nome} alterado com sucesso!`);
    this.back();
  }
}
