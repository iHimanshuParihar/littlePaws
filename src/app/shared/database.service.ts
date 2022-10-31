import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { getAuth } from 'firebase/auth';

import {
  collection,
  documentId,
  Firestore,
  updateDoc,
  arrayUnion,
  getDoc,
  query,
  addDoc,
  doc,
  where,
  getDocs,
  onSnapshot,
  orderBy,
} from '@angular/fire/firestore';
import { BehaviorSubject, empty, Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { petsInfo } from '../model/commonInterfaces';
import { InterestedInfoComponent } from '../components/interested-info/interested-info.component';

export interface interestedInfo {
  city: '';
  landmark: '';
  name: '';
  petsOwnerID: '';
  phoneNumber: '';
  query: '';
}
@Injectable({
  providedIn: 'root',
})
export class DatabaseService implements OnInit {
  seenNotificationsCount: Subject<Number> = new BehaviorSubject<Number>(0);
  notificationsChangeSubject: Subject<String> = new BehaviorSubject<String>('');
  allNotificationsSubject: Subject<Object[]> = new BehaviorSubject<Object[]>(
    []
  );
  allPutForAdoptionPetsData: Subject<petsInfo[]> = new BehaviorSubject<
    petsInfo[]
  >([]);
  allPetsDataSubject: Subject<Object[]> = new BehaviorSubject<Object[]>([]);
  currentUserEmail: Subject<String> = new BehaviorSubject<String>('');
  userID: any;
  allNotifications: any[] = [];
  constructor(
    private authService: AuthService,
    private fStore: AngularFirestore,
    private fAuth: AngularFireAuth,
    private fStore_: Firestore,
    private _snackBar: MatSnackBar
  ) {
    localStorage.setItem('prevNotificationCount', '0');
  }

  ngOnInit() { }

  openSnackBar(message: any) {
    this._snackBar.open(message, 'Cancel', {
      duration: 3000,
      panelClass: ['green-snack-bar'],
    });
  }

  openSnackBarCustom(message: any, color: any) {
    this._snackBar.open(message, 'Cancel', {
      duration: 3000,
      panelClass: [color],
    });
  }

  async getAllData(tags: string[], catOrDogFilter: string) {
    let allQ = query(collection(this.fStore_, 'petsForAdoption'));
    let docsSnap;
    let q;
    if (tags.length > 0) {
      q = query(
        collection(this.fStore_, 'petsForAdoption'),
        where('searchTags', 'array-contains-any', tags),
        where('catOrDog', '==', catOrDogFilter),
        where('adopted', '==', 'false')
      );
    } else {
      console.log('calling here');
      q = query(
        collection(this.fStore_, 'petsForAdoption'),
        where('catOrDog', '==', catOrDogFilter),
        where('adopted', '==', 'false')
      );
    }
    onSnapshot(q, (querySnapshot) => {
      const allData: any = [];
      if (querySnapshot.empty) {
        this.openSnackBarCustom(
          'No data found for the search',
          'red-snack-bar'
        );
        this.allPetsDataSubject.next([]);
      }
      querySnapshot.forEach((doc) => {
        console.log('am here');
        let obj = doc.data();
        console.log('empty', doc.data());
        Object.assign(obj, { documentID: doc.id });
        allData.push(obj);
        // if (allData == []) {
        //   this.allPetsDataSubject.next([])
        // }
        this.allPetsDataSubject.next(allData);
      });
    });
    // docsSnap = await getDocs(q);
    // const allData: any = [];
    // docsSnap.forEach((doc) => {
    //   let obj = doc.data();
    //   Object.assign(obj, { documentID: doc.id });
    //   allData.push(obj);
    //   return obj;
    // });
    // return allData;
  }

  async addPetForAdoption(petInfo: any) {
    const docRef = await addDoc(collection(this.fStore_, 'petsForAdoption'), {
      ownerName: petInfo.ownerName,
      phoneNumber: petInfo.phoneNumber,
      ageInMonth: petInfo.ageInMonth,
      ageInYear: petInfo.ageInYear,
      date: petInfo.date,
      petPictureURL: petInfo.petPictureURL,
      searchTags: petInfo.searchTags,
      catOrDog: petInfo.catOrDog,
      adopted: 'false',
      uid: petInfo.uid,
    });
    if (docRef.id != '') {
      this.openSnackBar('Added Successfully');
      return true;
    }
    return false;
  }

  async fetchAllPetsForUser() {
    let fetchedPetsInfo: petsInfo[] = [];
    const q = query(
      collection(this.fStore_, 'petsForAdoption'),
      orderBy('adopted'),
      orderBy('date'),
      where('uid', '==', localStorage.getItem('uid'))
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      fetchedPetsInfo = [];
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        Object.assign(obj, { documentID: doc.id });
        fetchedPetsInfo.push(Object(obj));
      });
      console.log('issue', fetchedPetsInfo);
      this.allPutForAdoptionPetsData.next(fetchedPetsInfo);
    });
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   let obj = doc.data();
    //   Object.assign(obj, { documentID: doc.id });
    //   fetchedPetsInfo.push(Object(obj));
    // });
    if (fetchedPetsInfo.length > 0) {
      return fetchedPetsInfo;
    }
    return [];
  }

  async addContactUsInfo(data: any) {
    const docRef = await addDoc(
      collection(this.fStore_, 'contactFormInfo'),
      data
    )
      .then((docRef) => {
        this.openSnackBar('Query submitted successfully');
        return true;
      })
      .catch((error) => {
        this.openSnackBar(error.message);
        console.log(error);
        return false;
      });
  }

  async updateAdoptionStatus(id: string, status: string) {
    const docRef = doc(this.fStore_, 'petsForAdoption', id);
    await updateDoc(docRef, {
      adopted: status,
    })
      .then((value) => {
        this.openSnackBar('status changed successfully');
        this.fetchAllPetsForUser();
        return true;
      })
      .catch((e) => {
        this.openSnackBar(e.message);
        return false;
      });
  }

  async updatePetsInfo(data: any, id: string) {
    console.log('ippp', data);
    const docRef = doc(this.fStore_, 'petsForAdoption', id);
    await updateDoc(docRef, {
      ownerName: data.ownerName,
      searchTags: data.searchTags,
      phoneNumber: data.phoneNumber,
      ageInYear: data.ageInYear,
      ageInMonth: data.ageInMonth,
      petPictureURL: data.petPictureURL,
      documentID: data.documentID,
      date: data.date,
    })
      .then((value) => {
        this.openSnackBar('Updated successfully');
        // this.fetchAllPetsForUser();
        return true;
      })
      .catch((e) => {
        this.openSnackBar(e.message);
        return false;
      });
  }

  async fetchSpecificPetsData(id: string) {
    const docRef = doc(this.fStore_, 'petsForAdoption', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return {};
  }

  async fetchInterestedUsers() {
    let allNotifications: any = [];
    let allData: any;
    const q = query(
      collection(this.fStore_, 'interestedUsersInfo'),
      orderBy('date'),
      where('petsOwnerID', '==', localStorage.getItem('uid'))
    );
    onSnapshot(q, (querySnapshot) => {
      allNotifications = [];
      querySnapshot.forEach((doc) => {
        allData = doc.data()
        // this.fetchSpecificPetsData(doc.data()['petsInfoID']).then((value) => {
        //   allData = doc.data();
        //   console.log("returnnn", value)
        //   if (value['adopted'] == 'false') {
        //     console.log("all", allNotifications)
        //   }
        // });
        Object.assign(allData, { interestedUserID: doc.id });
        allNotifications.push(allData);
      });
      this.checkForNotificationChange(allNotifications.length);
      this.allNotificationsSubject.next(allNotifications);
    });
    return allNotifications.length;
  }

  checkForNotificationChange(currCount: any) {
    let prev;
    let curr;
    this.seenNotificationsCount.subscribe((value) => {
      prev = value;
      curr = Math.abs(Number(currCount) - Number(prev));
      if (curr === 0) {
        console.log('curr', curr);
        this.notificationsChangeSubject.next('');
      } else {
        console.log('curr', curr);
        this.notificationsChangeSubject.next(String(curr));
      }
      localStorage.setItem('prevNotificationCount', String(currCount));
    });
    return currCount;
  }

  async updateNotification(id: string, interestedUserID: string) {
    const docRef = doc(this.fStore_, 'petsForAdoption', id);
    await updateDoc(docRef, {
      // notificationID: arrayUnion(interestedUserID),
    });
  }
  async addInterestedUserInfo(data: any) {
    const docRef = await addDoc(
      collection(this.fStore_, 'interestedUsersInfo'),
      data
    )
      .then((docRef) => {
        // this.updateNotification(data.petsInfoID, docRef.id);
        this.openSnackBar('Submitted successfully');
        return true;
      })
      .catch((error) => {
        this.openSnackBar(error.message);
        console.log(error);
        return false;
      });
  }
  getEmail() {
    getAuth().onAuthStateChanged((user) => {
      this.currentUserEmail.next(String(user?.email));
      return user?.email;
    });
  }
}
