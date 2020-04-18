import React, { Component } from 'react';
import api from '../../services/api'
import './styles.css'

export default class Main extends Component {
  // No React as variáveis devem ser criadas dentro do state
  state = {
    products: []
  }


  // Chamada a Api

  // Sempre que quisermos executar uma ação assim que o componente é exibido em tela, usamos o componentDidMount
  componentDidMount(){
    this.loadProducts()
  }
  // Carregando os Produtos
  loadProducts = async () => {
    const response = await api.get('/products')

    // Para preencher as variáveis utiliza-se o setState
    this.setState({ products: response.data.docs })
    
  }

  render() {
    // Desestruturação para buscar a variavel product la do this.state
    const { products } = this.state

    // Para renderizar uma variavel utiliza-se { this.variavel }
    // O render fica escutando o state, e sempre que uma variavel é alterada ele atualiza automaticamente com o novo valor
    return (
      <div className="product-list">
        { products.map( product => (
          // Toda vez que usamos o map no react ele pede que o primeiro elemento que venha logo depois tenha uma propriedade chamada key{} que receba um valor unico.
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <a href="#">Acessar</a>
          </article>
        ))}
      </div>
    )
  }
}