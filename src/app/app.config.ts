import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"danotes-7c766","appId":"1:818049195143:web:47a61716bfafe7af9e6c22","storageBucket":"danotes-7c766.appspot.com","apiKey":"AIzaSyDzKCXj_YyOSMmoaqQcFO09Af9q4flSHsU","authDomain":"danotes-7c766.firebaseapp.com","messagingSenderId":"818049195143","measurementId":"G-PVVDDDPHY8"})), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"danotes-7c766","appId":"1:818049195143:web:47a61716bfafe7af9e6c22","storageBucket":"danotes-7c766.appspot.com","apiKey":"AIzaSyDzKCXj_YyOSMmoaqQcFO09Af9q4flSHsU","authDomain":"danotes-7c766.firebaseapp.com","messagingSenderId":"818049195143","measurementId":"G-PVVDDDPHY8"})), provideFirestore(() => getFirestore())]
};
