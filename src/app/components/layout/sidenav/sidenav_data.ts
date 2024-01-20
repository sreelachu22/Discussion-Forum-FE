import {
  faBell,
  faBook,
  faClock,
  faHome,
  faSearch,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';

export const navigationData = [
  { label: 'Home', link: '/home', icon: faHome },
  { label: 'Search', link: '/search', icon: faBook },
  { label: 'Latest', link: '/latest', icon: faClock },
  { label: 'Notifications', link: '/notifications', icon: faBell },
  { label: 'Leaderboards', link: '/leaderboards', icon: faTrophy },
  { label: 'Guidelines', link: '/guidelines', icon: faBook },
];
