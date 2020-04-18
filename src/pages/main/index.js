import React, { Component } from 'react';
import api from '../../services/api'
import { Link } from 'react-router-dom';
import './styles.css'

export default class Main extends Component {
  // No React as variáveis devem ser criadas dentro do state
  state = {
    products: [],
    productInfo: {},
    page: 1,
  }


  // Chamada a Api

  // Sempre que quisermos executar uma ação assim que o componente é exibido em tela, usamos o componentDidMount
  componentDidMount(){
    this.loadProducts()
  }
  // Carregando os Produtos
  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`)

    const { docs, ...productInfo } = response.data

    // Para preencher as variáveis utiliza-se o setState
    this.setState({ products: docs, productInfo, page })    
  }

  // Botões Anterior e Próximo

  prevPage = () => {
    const { page } = this.state

    if ( page === 1 ) return

    const pagNumber = page - 1

    this.loadProducts(pagNumber)
  }

  nextPage = () => {
    const { page, productInfo } = this.state

    if ( page === productInfo.pages ) return

    const pageNumber = page + 1

    this.loadProducts(pageNumber)
  }

  render() {
    // Desestruturação para buscar a variavel product la do this.state
    const { products, page, productInfo } = this.state

    // Para renderizar uma variavel utiliza-se { this.variavel }
    // O render fica escutando o state, e sempre que uma variavel é alterada ele atualiza automaticamente com o novo valor
    return (
      <div className="product-list">
        { products.map( product => (
          // Toda vez que usamos o map no react ele pede que o primeiro elemento que venha logo depois tenha uma propriedade chamada key{} que receba um valor unico.
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
        </div>
      </div>
    )
  }
}