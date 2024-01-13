import { GoHomeFill } from 'react-icons/go';
import { FaCode } from 'react-icons/fa';

export const APP_NAME = 'MOT';
export const APP_LOGO_IMAGE_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/MOT_Test_-_Logo.svg/1190px-MOT_Test_-_Logo.svg.png';

export const navigation_items = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'Login',
    to: '/auth/login',
  },
  {
    name: 'Components',
    to: '/components',
  },
].filter(Boolean) as {
  name: string;
  to: string;
  customUrl?: boolean;
}[];

export const dashboard_navigation = [
  { name: 'Dashboard', to: '.', icon: GoHomeFill },
  { name: 'Testing', to: 'testing', icon: FaCode },
].filter(Boolean) as DashboardNavigationProps[];

export const DEVELOPMENT_SERVER_URL = 'http://localhost:4000/api/v1';
export const DEVELOPMENT_CLIENT_PORT = '3000';
