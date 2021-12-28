import Tchat from './tchat';
import Bot from './bot';
import './index.scss';

const bots = [
  {
    id: '1',
    name: 'Boby Lannister',
    avatar: 'https://images.rtl.fr/~c/2000v2000/rtl/www/1335862-michael-jackson-en-juin-2005.jpg',
    countMessage: 0,
    actions: [{
      name: 'hello',
      keywords: ['hello', 'Bonjour'],
      action: () => 'bonjour Cyril'
    }]
  },
  {
    id: '2',
    name: 'Jean Stack',
    avatar: 'https://topvisages.net/wp-content/uploads/2021/05/Fally-001.jpg',
    countMessage: 0,
    actions: [{
      name: 'hello',
      keywords: ['hello', 'Bonjour'],
      action: () => 'bonjour Cyril'
    }]
  }
];
const tchat = new Tchat(bots);
tchat.run();

const boby = new Bot(bots[0]);
const jean = new Bot(bots[1]);
