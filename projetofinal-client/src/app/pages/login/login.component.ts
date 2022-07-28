import { LoginDTO } from './../../model/DTO/loginDTO';

import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/_service/account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioDTO } from 'src/app/model/DTO/usuarioDTO';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router:Router,
    private accountService: AccountService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }


  usuario = new  LoginDTO();


  mensagemErro: string= ""
  formLogin: any
  ngOnInit(): void {
    this.accountService.clearAuthentication();
    this.formLogin =  new FormGroup({
      login: new FormControl([Validators.required]),
      senha: new FormControl([Validators.required]),
    });

  }

  login(){

    let validado: boolean = false
    if(this.validarCampos()){
      this.accountService.login(this.usuario).subscribe(data =>{
        if(data.ok){
          console.log('login efetuado: ', data)
          this.mensagemErro = "";
          validado = true
        }
      }, (error)=>{
        console.error("Erro ao fazer login", error);
        this.mensagemErro = "Login ou Senha Inválidos";

      }
      )
    }else{
      this.mensagemErro = "Preencha todos os campos";
    }
    setTimeout(() =>{
      console.log("I am the third log after 5 seconds");
      this.router.navigate(['tarefas']);
    },1000);

  }

  validarCampos(): boolean{
    const formulario = this.formLogin.value;
    if(formulario.login == null || formulario.login === ''){
      return false;
    }

    if(formulario.senha == null || formulario.senha === ''){
      return false;
    }

    return true;

  }
}