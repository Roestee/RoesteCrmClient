export class MenuModel {
  name: string = '';
  icon: string = '';
  url: string = '';
  isTitle: boolean = false;
  roles: string[] = [];
  subMenus: MenuModel[] = [];
}

export const Menus: MenuModel[] = [
  {
    name: 'Anasayfa',
    icon: '',
    url: '/',
    isTitle: true,
    roles: [],
    subMenus: [],
  },
  {
    name: 'Anasayfa',
    icon: 'far fa-solid fa-home',
    url: '/',
    isTitle: false,
    roles: [],
    subMenus: [],
  },
  {
    name: 'Kullanıcı Yönetimi',
    icon: '',
    url: '',
    isTitle: true,
    roles: ['Admin'],
    subMenus: [],
  },
  {
    name: 'Kullanıcı İşlemleri',
    icon: 'far fa-solid fa-user-pen',
    url: '/users',
    isTitle: false,
    roles: ['Admin', 'Manager'],
    subMenus: [],
  },
  {
    name: 'Rol Yönetimi',
    icon: 'far fa-solid fa-user-shield',
    url: '/roles',
    isTitle: false,
    roles: ['Admin'],
    subMenus: [],
  },
  {
    name: 'Müşteri Yönetimi',
    icon: '',
    url: '',
    isTitle: true,
    roles: ['Admin', 'Manager', 'User'],
    subMenus: [],
  },
  {
    name: 'Müşteri İşlemleri',
    icon: 'far fa-solid fa-user-group',
    url: '/leads',
    isTitle: false,
    roles: ['Admin', 'Manager', 'User'],
    subMenus: [],
  },
  {
    name: 'Hesap İşlemleri',
    icon: 'far fa-solid fa-building',
    url: '/accounts',
    isTitle: false,
    roles: ['Admin', 'Manager', 'User'],
    subMenus: [],
  },
  {
    name: 'İrtibat İşlemleri',
    icon: 'far fa-solid fa-address-book',
    url: '/contacts',
    isTitle: false,
    roles: ['Admin', 'Manager', 'User'],
    subMenus: [],
  },
];
