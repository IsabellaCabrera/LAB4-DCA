import Card, { Attribute } from './components/Character/character';
import { getRickandMorty } from '../src/services/dataFetch';

class AppContainer extends HTMLElement {
  cards: Card[] = [];
  dataApi: any[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    this.render();
  }

  async fetchCharacters(count: number) {
    this.dataApi = await getRickandMorty(count);  // Traemos los personajes según el número ingresado
    this.cards = [];  // Limpiamos las tarjetas anteriores
    this.createCardsRickandMorty();  // Creamos nuevas tarjetas
    this.render();  // Renderizamos nuevamente
}

  

  createCardsRickandMorty() {
    this.dataApi.forEach((e) => {
      const card = this.ownerDocument.createElement('characters-card') as Card;
      card.setAttribute(Attribute.image, e.image);
      card.setAttribute(Attribute.name, e.name);
      card.setAttribute(Attribute.status, e.status);
      card.setAttribute(Attribute.species, e.species);
      card.setAttribute(Attribute.type, e.type);
      card.setAttribute(Attribute.origin, e.origin.name);
      card.setAttribute(Attribute.nameoffirstepisode, e.episode[0]);
      this.cards.push(card);
    });
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
       
        <section id="main-container">
                    <h1>Rick and Morty Characters</h1>

                    <section id="input-container">
                        <input type="number" id="characterCount" placeholder="Enter number of characters" />
                        <button id="fetchButton">Fetch Characters</button>
                    </section>

                    <section id="cardsContainer"></section>
                </section>

                <style>
                    #main-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                    }

                    #input-container {
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    #cardsContainer {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 20px;
                        width: 100%;
                    }

                    h1 {
                        color: brown;
                        text-align: center;
                        width: 100%;
                    }
        </style>
      `;
      const fetchButton = this.shadowRoot?.querySelector('#fetchButton');
      fetchButton?.addEventListener('click', () => {
          const input = this.shadowRoot?.querySelector('#characterCount') as HTMLInputElement;
          const count = parseInt(input.value);
          if (count && count > 0) {
              this.fetchCharacters(count); 
          }
      });

      const cardsContainer = this.shadowRoot?.querySelector('#cardsContainer');
      this.cards.forEach((card) => {
          cardsContainer?.appendChild(card);
    
    });
  }
}}

customElements.define('app-container', AppContainer);
