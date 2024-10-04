import styles from './Character.css'; // Importamos el CSS como string

export enum Attribute {
  "image" = "image",
  "name" = "name",
  "status" = "status",
  "species" = "species",
  "type" = "type",
  "origin" = "origin",
  "nameoffirstepisode" = "nameoffirstepisode",
}

class Card extends HTMLElement {
  image?: string;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  origin?: string;
  nameoffirstepisode?: string;

  static get observedAttributes() {
    return Object.keys(Attribute);
  }

  attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
    if (propName !== oldValue) {
      this[propName] = newValue;
      this.render();
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>  
        <section id="main-card">
          <div class="image-container">
            <img class="image" src="${this.image}" alt="image">
          </div>
          <div class="info-container">
            <h1>${this.name || 'No name'}</h1>
            <p>${this.status || 'No status'}</p>
            <p>${this.species || "No specie"}</p>
            <p>${this.type || "No type"}</p>
            <p>${this.origin || "No origin"}</p>
            <p>${this.nameoffirstepisode || "No episode"}</p>
          </div>
        </section>
      `;
    }
  }
}

customElements.define('characters-card', Card);
export default Card;
