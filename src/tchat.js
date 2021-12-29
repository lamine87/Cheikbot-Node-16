import Bot from './bot';

const Tchat = class {
  constructor(bots) {
    this.el = document.querySelector('#app');
    this.bots = this.createBots(bots);
  }

  renderHeader() {
    return `
      <header>
          <nav class="navbar navbar-dark bg-dark">
          <div class="container-fluid">
              <span class="navbar-brand mb-0 h1">Chatbot.IO</span>
          </div>
          </nav>
      </header>
      `;
  }

  renderContainer() {
    return `
      <main class="container-fluid">
          <div class="row">
          ${this.renderBotsList()}
          ${this.renderContentMessages()}
          </div>
      </main>
      `;
  }

  renderMessageSended(message) {
    const date = new Date();
    return `
      <div class="row mt-3">
       <div class="col-6"></div>
        <div class="col-6">
          <div class="card">
          <div class="card-header">
          <img
            src="https://topvisages.net/wp-content/uploads/2021/05/Fally-001.jpg"
            alt="Cyril"
            class="img-fluid rounded-circle border border-dark col-2 border-2"
            />
            <span class="ms-3 h4">Cyril</span>
          </div>
  
          <div class="card-body">
          <h5 class="card-title">${date.toLocaleString()}</h5>
          <p class="card-text">
              ${message}
          </p>
          </div>
       </div>
      </div>
    </div>
          `;
  }

  renderMessageReceived(bot) {
    const {
      name,
      avatar,
      message
    } = bot;
    const date = new Date();
    return `
      <div class="row mt-3">
        <div class="col-6">
          <div class="card">
              <div class="card-header ">
              <img
                  src="${avatar}"
                  alt="Kitty"
                  class="img-fluid rounded-circle border border-dark col-2 border-2"
                  />
                  <span class="ms-3 h4">${name}</span>
              </div>
              <div class="card-body">
              <h5 class="card-title">${date.toLocaleString()}</h5>
              <p class="card-text">
                  ${message}
              </p>
              </div>
          </div>
          </div>
          <div class="col-6"></div>
      </div> 
      `;
  }

  renderContentMessages() {
    return `
      <section id="content-messages" class="col-9">
        <div id="messages" class="row"></div>
          ${this.renderInputMessage()}
      </section>
      `;
  }

  renderInputMessage() {
    return `
    <div id="input-message" class="row mt-3">
      <div class="col-12">
        <form class="row g-2">
          <div class="col-10 p-0">
              <input
              type="text"
              class="form-control"
              placeholder="Your Message"
              />
          </div>
          <div class="col-2">
              <div class="d-grid">
              <button type="submit" class="btn btn-primary mb-3">
                  Send 
              </button>
              </div>
          </div>
        </form>
      </div>
    </div>
        `;
  }

  renderBotsList() {
    return `
        <section id="bot-list" class="col-3 pt-3 bg-dark text-light">
        ${this.bots.map((bot) => this.renderBot(bot.entity)).join('')}
        </section>
        `;
  }

  renderBot(data) {
    const {
      id,
      name,
      avatar,
      countMessage,
      status
    } = data;

    return `
      <div data-id="${id}" class="row">
      <div class="col-3">
        <img
          src="${avatar}"
          alt="${name}"
          class="img-fluid rounded-circle border border-dark border-2"
        />
      </div>
      <div class="col-7 pt-4">
          <h4 class="h5">${name}</h4>
          <h6 class="text-success">${status}</h6>
      </div>
      <div class="col-2 pt-4">
        <span class="badge bg-primary rounded-pill">${countMessage}</span>
      </div>
    </div>
    <hr />
          `;
  }

  addCountMessage(el) {
    const badge = el.querySelector('.badge');
    badge.textContent = parseInt(badge.textContent, 10) + 1;
  }

  sendMessage() {
    const messagesEl = document.querySelector('#messages');
    const inputEl = document.querySelector('#input-message input');
    const buttonEl = document.querySelector('#input-message button');

    buttonEl.addEventListener('click', (e) => {
      e.preventDefault();
      const { value } = inputEl;
      messagesEl.innerHTML += this.renderMessageSended(value);
      this.searchActionByBot(value);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      inputEl.value = '';
    });
  }

  createBots(bots) {
    return bots.map((bot) => new Bot(bot));
  }

  searchActionByBot(value) {
    const messagesEl = document.querySelector('#messages');
    const bots = [];
    for (let i = 0; i < this.bots.length; i += 1) {
      const bot = this.bots[i];
      const message = bot.findActionByValue(value);
      const { id, name, avatar } = bot.entity;
      if (!message) {
        return message;
      }
      bots.push({
        id,
        name,
        avatar,
        message
      });
    }
    for (let j = 0; j < bots.length; j += 1) {
      const item = bots[j];
      if (item.message) {
        messagesEl.innerHTML += this.renderMessageReceived(item);
      }
    }
    return true;
  }

  run() {
    this.el.innerHTML += this.renderHeader();
    this.el.innerHTML += this.renderContainer();

    this.sendMessage();
  }
};
export default Tchat;
