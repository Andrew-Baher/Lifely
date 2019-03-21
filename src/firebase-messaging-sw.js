console.log('from fcm');

importScripts('https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.7.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '381743370421'
});

const messaging = firebase.messaging();

self.addEventListener('notificationclick', async ev => {
  console.log(ev, 'caught from notificationclick');
});
