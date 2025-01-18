import { Brand } from '@/entities/brand/types.ts';
import { IDBPDatabase, openDB } from 'idb';

const DB_NAME = 'carBrandsDB';
const STORE_NAME = 'carBrands';
const DB_VERSION = 3;

let dbInstance: IDBPDatabase | null = null;

export const getDB = async (): Promise<IDBPDatabase> => {
  if (!dbInstance) {
    dbInstance = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          console.log(`IndexedDB store "${STORE_NAME}" created.`);
        }
      },
    });
  }
  return dbInstance;
};

export const cacheBrands = async (brands: Brand[]) => {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    await store.clear();

    await Promise.all(brands.map((brand) => store.put(brand)));

    await tx.commit;
    console.log(`Cached ${brands.length} brands to IndexedDB.`);
  } catch (error) {
    console.error('Error caching brands in IndexedDB:', error);
  }
};

export const getCachedBrands = async (): Promise<Brand[]> => {
  try {
    const db = await getDB();
    const cachedBrands = await db.getAll(STORE_NAME);

    if (cachedBrands.length > 0) {
      console.log(`Retrieved ${cachedBrands.length} brands from IndexedDB.`);
    } else {
      console.warn('No brands found in IndexedDB.');
    }

    return cachedBrands;
  } catch (error) {
    console.error('Error retrieving brands from IndexedDB:', error);
    return [];
  }
};
