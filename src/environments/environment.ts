// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://184.73.21.79/api',
  MENU_ADMIN: [
    {
      name: 'Productos',
      url_router: '/admin/dashboard/products',
    },
    {
      name: 'Usuarios',
      url_router: '/admin/dashboard/users',
    },
    {
      name: 'Roles',
      url_router: '/admin/dashboard/roles',
    },
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
