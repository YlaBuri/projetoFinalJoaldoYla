import { Usuario } from './../../model/usuario';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  perfis = [
    {value: 0, viewValue: "Professor"},
    {value: 1, viewValue: "Aluno"},
    {value: 2, viewValue: "Administrador"},
  ]

  usuarios = new MatTableDataSource<Usuario>();
  displayedColumns = [
    'nome',
    'login',
    'data ultimo acesso',
    'data cadastro',
    'perfil',
    'ativo',
    'Acoes'
  ];

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService ) { }

  ngOnInit(): void {
    this.buscarUsuarios();
    this.storage.set("usuario", null)
  }

  ngAfterViewInit() {
    this.usuarios.paginator = this.paginator;
    this.usuarios.sort = this.sort;
  }

  buscarUsuarios(){
    this.usuarioService.findAll().subscribe((data: any[]) => {
      this.usuarios.data = data;
      console.log(this.usuarios);
    });
  }

  editarUsuario(usuario: Usuario){
    this.storage.set("usuario", usuario)
    this.router.navigate(["cadastrarUsuario"])
  }

  cadastrarUsuario(){
    this.router.navigate(["cadastrarUsuario"])
  }

  atualizarSituacao(usuario:Usuario){
    usuario.flagAtivo = usuario.flagAtivo == false ? true : false;
    this.usuarioService.update(usuario).subscribe(data =>{
      console.log("alterado com sucesso", data);
    }, (error) =>{
      console.log(error.error);
    })
  }

  retornarPerfil(value: number){

  }
}
