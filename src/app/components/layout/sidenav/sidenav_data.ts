import {
  faBell,
  faBook,
  faClock,
  faHome,
  faSearch,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';

export const navbarData = [
  { label: 'Home', routeLink: '/home', icon: faHome },
  { label: 'Search', routeLink: '/search', icon: faSearch },
  { label: 'Latest', routeLink: '/latest', icon: faClock },
  { label: 'Notifications', routeLink: '/notifications', icon: faBell },
  { label: 'Leaderboards', routeLink: '/leaderboards', icon: faTrophy },
  { label: 'Guidelines', routeLink: '/guidelines', icon: faBook },
];
