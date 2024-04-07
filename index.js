class Pessoa{
    constructor(apelido, nome, nascimento, stack){
        this.apelido = apelido;
        this.nome = nome;
        this.nascimento = nascimento;
        this.stack = stack;
    }
    escreve(){
        console.log("apelido: " + this.apelido+ "\nnome: "+
         this.nome + "\nnascimento: " +
          this.nascimento + "\nstack: "+ this.stack)
    }
}

let pessoa = new Pessoa("neves", "Bruno", "14/01/2004", ["JavaScript", "Java", "Rust"]); 
pessoa.escreve();
