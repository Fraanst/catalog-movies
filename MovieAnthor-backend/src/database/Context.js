

class Context {
  constructor(db) {
    this.base = db;
  }

  async create(movie) {
    try {
      if (!movie) {
        return false;
      }
      await this.base.collection('movies').add(movie);
      return true;
    } catch (error) {
      throw "error.create: " + error;
    }
  }
  async  getall() {
    try {
      let movies = [];
      let movieCollection = await this.base.collection('movies').get();
      movieCollection.forEach(doc => {
        movies.push({ id: doc.id, ...doc.data() });
      });

      return movies;
    } catch (error) {
      console.log(error)
      throw "error.getall: " + error;
    }
  }

  async get(id) {
    try {
      let movies = null;
      let movieCollection = await this.base.collection('movies').get();
      movieCollection.forEach(doc => {
        if (doc.id === id) {
          movies = doc.data();
        }
      });
      return movies;
    } catch (error) {
      throw "error.get: " + error;
    }
  }

  async update(id, item) {
    try {
      await this.base.collection('movies').doc(id).update(item);
      return true;
    } catch (error) {
      throw "update.error: " + error;
    }
  }
  async delete(id) {
    try {
      let deleteDoc = await this.base.collection('movies').doc(id).delete();
      return true;
    } catch (error) {
      throw "delete.error: " + error;
    }
  }
}
module.exports = Context;