import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL7tqTi60gNbWxSFTs1aOUrzVZ-1QZ7sA",
  authDomain: "caravans-2f2f4.firebaseapp.com",
  projectId: "caravans-2f2f4",
  storageBucket: "caravans-2f2f4.appspot.com",
  messagingSenderId: "284142698880",
  appId: "1:284142698880:web:923a5a7db21ee6b32e8165"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "caravans")
const storage = getStorage(app);

export async function getVans() {
  try {
    const snapshot = await getDocs(vansCollectionRef);
    const vans = snapshot.docs.map(async (doc) => {
      const data = doc.data();
      const imageUrl = data.imagePath; // Use the GCS URL

      // Convert GCS URL to publicly accessible URL
      const imageRef = ref(storage, imageUrl);
      const publicUrl = await getDownloadURL(imageRef);

      return {
        ...data,
        id: doc.id,
        imageUrl: publicUrl, // Updated imageUrl with publicly accessible URL
      };
    });

    const resolvedVans = await Promise.all(vans);
    console.log("Vans Data:", resolvedVans);

    return resolvedVans;
  } catch (error) {
    console.error("Error fetching vans:", error);
    throw error;
  }
}