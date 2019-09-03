import {City} from '../interfaces/locations/city';
import {STATES} from './states.mock';

export const CITIES: City[] = [
  {
    id: 1,
    name: 'Rochester',
    state: STATES[0],
    description: 'Rochester is home to the largest and most well renowned hospital in the world. It is also home to FAVR and you\'ll find no shortage of help on tasks here.',
    src: 'http://localhost:8100/assets/img/rochester.jpg'
  },
  {
    id: 2,
    name: 'Minneapolis',
    state: STATES[0],
    description: 'Beautiful Minneapolis is one of America\'s fastest growing cities. Let FAVR help you take part in that growth.',
    src: 'http://localhost:8100/assets/img/minneapolis.jpg'
  },
  {
    id: 3,
    name: 'Winona',
    state: STATES[0],
    description: 'Picturesque Winona on the bank of the Mississippi River is a premiere college town home to Winona State University and St. Mary\'s University. Let FAVR help you find help on tasks here.',
    src: 'http://localhost:8100/assets/img/winona.jpg'
  },
  {
    id: 4,
    name: 'Brookings',
    state: STATES[2],
    description: 'A regular city in middle America home to the popular South Dakota State University. Let FAVR help you find help on tasks here.',
    src: 'http://localhost:8100/assets/img/brookings.jpg'
  },
  {
    id: 5,
    name: 'Mankato',
    state: STATES[0],
    description: 'A bustling small town in Minnesota home to the great Mankato State University. Let FAVR help you find help tasks on tasks here.',
    src: 'http://localhost:8100/assets/img/mankato.jpg'
  },
];