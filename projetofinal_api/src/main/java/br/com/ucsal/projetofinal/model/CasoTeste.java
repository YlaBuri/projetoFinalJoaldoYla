package br.com.ucsal.projetofinal.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class CasoTeste {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nomeTeste;

    private String entrada;

    private String saida;

    @NotNull
    private Integer comparacao;

    public CasoTeste() {
    }

    public CasoTeste(Long id, String nomeTeste, String entrada, String saida, Integer comparacao) {
        this.id = id;
        this.nomeTeste = nomeTeste;
        this.entrada = entrada;
        this.saida = saida;
        this.comparacao = comparacao;
    }
}