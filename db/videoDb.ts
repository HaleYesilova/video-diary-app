import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('videos.db');

export function setupDatabase() {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uri TEXT NOT NULL,
        name TEXT NOT NULL,
        desc TEXT
      );`
    );
  });
}

export function insertVideo(uri: string, name: string, desc: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO videos (uri, name, desc) VALUES (?, ?, ?);`,
        [uri, name, desc],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function getAllVideos(): Promise<{ id: number; uri: string; name: string; desc: string }[]> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM videos;`,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function updateVideo(id: number, name: string, desc: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE videos SET name = ?, desc = ? WHERE id = ?;`,
        [name, desc, id],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}
