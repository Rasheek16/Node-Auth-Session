import db from "../sqlite-config.js";

export async function getAll(options) {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM Movies WHERE user=? OR public = 1 ";
    if (options.sort && ["asc", "desc"].includes(options.sort.toLowerCase())) {
      query = query + "ORDER BY title " + options.sort;
    }
    db.all(query, [options.userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export async function remove(id, userId) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Movies WHERE id=? AND (user=? OR public=1)";
    db.run(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export async function get(id, userId) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Movies WHERE id=? AND (user=? OR public=1)";
    db.get(query, [id, userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export function insertMovie(movie, userId) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Movies (title, year, public, user) VALUES (?, ?, ?, ?)";
    db.run(
      query,
      [movie.title, movie.year, movie.public, userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
}

export async function updateMovie(movie, userId) {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE Movies SET title=?, year=?, public=?, user=? WHERE id=?";
    db.run(
      query,
      [movie.title, movie.year, movie.public, userId, movie.id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
}

export async function save(movie, userId) {
  if (!movie.id) {
    await insertMovie(movie, userId);
    return movie;
  } else {
    await updateMovie(movie, userId);
    return movie;
  }
}
