export const ROLE_LIST = {
    ADMIN: 'admin',
    sales: 'sales',
};

export const MENU_LIST_ADMIN = [
    {
        id: 1,
        menuName: 'Dashboard',
        path: '/',
        icon: 'nav-icon fas fa-tachometer-alt',
    },
    {
        id: 2,
        menuName: 'Package List',
        path: '/package-list',
        icon: 'nav-icon fas fa-archive',
    },
    {
        id: 3,
        menuName: 'Data Sales List',
        path: '/customer-list',
        icon: 'nav-icon fas fa-table',
    },
    {
        id: 4,
        menuName: 'Users',
        path: '/users',
        icon: 'nav-icon fas fa-users',
    },
];

export const MENU_LIST_SALES = [
    {
        id: 1,
        menuName: 'Dashboard',
        path: '/',
        icon: 'nav-icon fas fa-tachometer-alt',
    },
    {
        id: 2,
        menuName: 'Data Sales List',
        path: '/data-list',
        icon: 'nav-icon fas fa-table',
    },
]
