import React, { Component } from 'react';
import api from '../../services/api'

export default class Main extends Component {
  // Chamada a Api
  // Sempre que quisermos executar uma ação assim que o componente é exibido em tela, usamos o componentDidMount
  componentDidMount(){
    this.loadProducts()
  }
  // Carregando os Produtos
  loadProducts = async () => {
    const response = await api.get('/products')

    console.log(response);
    
  }

  render() {
    return <h1>Hello Rocketseat</h1>
  }
}