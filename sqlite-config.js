import sqlite from "sqlite3";

const db = new sqlite.Database("./movie.db");



export function get(query = {}) {
  try {
    return new Promise((resolve, reject) => {
      const queryElements = [];
      //   console.log('working till here');
      if (query) {
        for (let key in query) {
          queryElements.push(`${key}=?`);
        }
      }

      const queryString = `SELECT * FROM Users WHERE ${queryElements.join(
        " AND "
      )}`;
      db.get(queryString, Object.values(query), (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}



export default db;
