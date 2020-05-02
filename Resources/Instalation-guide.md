## Instalation Guide

#### Node instalation

For the IMS, node v12.16.1 is used and you can find it [here](https://nodejs.org/en/download/).

#### Upgrade node pacakge manager

```
npm install -g npm-windows-upgrade
npm i  npm
```

#### Angular instalation

```
npm install  @angular/cli@latest.
ng update @angular/cli @angular/core

// Install and uninstall devkit.
npm uninstall @angular-devkit/build-angular
npm install @angular-devkit/build-angular
```

#### Installed required dependencies

```
// Install bootstrap.
npm install bootstrap --save

// Install JQuery.
npm install jquery --save

// Install ng-boostarap
npm install @ng-bootstrap/ng-bootstrap --save

// Install other dependencies
npm install @angular/localize --save
npm install ngx-toastr --save
npm install chart.js --save
npm install cors --save
```

#### Generate a module

```
ng generate module admin-layout --module app --flat --routing
```
