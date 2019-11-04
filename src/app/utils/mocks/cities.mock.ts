import {City} from '../interfaces/locations/city';
import {STATES} from './states.mock';

// tslint:disable
export const CITIES: City[] = [
  {
    id: 1,
    name: 'Rochester',
    state: STATES[0],
    description: 'Rochester is home to the largest and most well renowned hospital in the world. It is also home to FAVR and you\'ll find no shortage of help on tasks here.',
    src: 'assets/img/rochester.jpg'
  },
  {
    id: 2,
    name: 'Minneapolis',
    state: STATES[0],
    description: 'Beautiful Minneapolis is one of America\'s fastest growing cities. Let FAVR help you find help on tasks here.',
    src: 'assets/img/minneapolis.jpg'
  },
  {
    id: 3,
    name: 'Winona',
    state: STATES[0],
    description: 'Picturesque Winona on the bank of the Mississippi River is a premiere college town home to Winona State University and St. Mary\'s University. Let FAVR help you find help on tasks here.',
    src: 'assets/img/winona.jpg'
  },
  {
    id: 4,
    name: 'Brookings',
    state: STATES[2],
    description: 'A regular city in middle America home to the popular South Dakota State University. Let FAVR help you find help on tasks here.',
    src: 'assets/img/brookings.jpg'
  },
  {
    id: 5,
    name: 'Mankato',
    state: STATES[0],
    description: 'A bustling small town in Minnesota home to the great Mankato State University. Let FAVR help you find help on tasks here.',
    src: 'assets/img/mankato.jpg'
  },
  {
    id: 6,
    name: 'Fargo',
    state: STATES[0],
    description: 'Fargo is a cultural and industrial center for North Dakota. The city is also home to North Dakota State University. Let FAVR help you find help on tasks here.',
    src: 'assets/img/fargo.jpg'
  }
];
