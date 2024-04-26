import firebase_app from '../app/config';
import { WhereFilterOp, collection, getDocs, getFirestore, query, where } from "firebase/firestore";

export type TqueryFunction = [string, WhereFilterOp, string|boolean ];

export const CollectionFac = (collectionName: string, qFunc: TqueryFunction[]) => async () => {
  return ((await getDocs(await QueryFac(collectionName, qFunc)())).docs);
};

export const QueryFac = (collectionName: string, qFunc: TqueryFunction[] ) => async () => {
  const db = getFirestore(firebase_app);
  const ref = collection(db, collectionName);
  const q1 = query(ref, ...qFunc.map(_q => where(..._q)) );

  return q1;
};


export default CollectionFac 