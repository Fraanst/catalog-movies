
class Service {
    constructor(context) {
        this.base = context;
    }
    async getall() {
        try {
            const movie = await this.base.getall();
            return movie;
        } catch (error) {
            return error;
        }
    }

    async get(id) {
        try {
            const movie = await this.base.get(id);
            return movie;
        } catch (error) {
            return error;
        }
    }

    async create(movie) {
        try {
            const dbMovie = await this.base.get(movie.id);
            if (dbMovie !== null)
                return null;
            await this.base.create(movie);
            return movie;
        } catch (error) {
            return error;
        }
    }

    async update(id, newmovie) {
        try {
            await this.base.update(id, newmovie);
            return true;
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            const movie = await this.base.get(id);
            if (movie === null)
                return false;
            await this.base.delete(id);
            return true;
        } catch (error) {
            return error;
        }
    }
}

module.exports = Service;