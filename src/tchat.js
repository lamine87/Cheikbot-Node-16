import Bot from "./bot";
const Tchat = class {
  constructor(bots) {
    this.el = document.querySelector('#app');
    this.bots = bots;
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

  renderMessageReceived() {
    return `
      <div class="row mt-3">
        <div class="col-6">
          <div class="card">
              <div class="card-header ">
              <img
                  src="https://www.chesterfieldobserver.com/wp-content/uploads/images/2021-04-14/12p1.jpg"
                  alt="Kitty"
                  class="img-fluid rounded-circle border border-dark col-2 border-2"
                  />
                  <span class="ms-3 h4"> Kitty Bot </span>
              </div>
              <div class="card-body">
              <h5 class="card-title">15 Déc 14:20</h5>
              <p class="card-text">
                  Response Dural lead-in to additional content. Dural
                  lead-in to additional content.
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
      countMessage
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
          <span class="h5">${name}</span>
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

      messagesEl.scrollTop = messagesEl.scrollHeight;
      messagesEl.innerHTML += this.renderMessageSended(inputEl.value);
    });
  }

  createBots(){
    return this.bots.map((bot) => new Bot(bot));
  }
  run() {
    this.el.innerHTML += this.renderHeader();
    this.el.innerHTML += this.renderContainer();

    this.sendMessage();
  }
};
export default Tchat;
