'use strict';

const appOptionsPath = process.env.NODE_ENV === 'test' ? 'src/config/firebase-private-key-test.json' : 'src/config/firebase-private-key.json';

const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(appOptionsPath)
});

const db = admin.firestore();

const initializeDb = async () => {
    try {
        console.info('Initializing db')

        let data0 = {
            title: "Spider-Man: Far from Home",
            genre: "Action, Adventure, Comedy, Sci-Fi",
            actors: "Tom Holland, Jake Gyllenhaal, Samuel L. Jackson, Marisa Tomei, Zendaya",
            date: "04/07/2019",
            summarizedPlot: "Following the events of Vingadores: Ultimato (2019), Spider-Man must step up to take on new threats in a world that has changed forever.",
            trailer: "https://youtu.be/tcG3Mc4XJpg"
        }
        await db.collection('movies').doc('Spider-Man').set(data0);
        let data1 = {
            title: "Toy Story 4",
            genre: "Animation, Comedy, Family, Fantasy",
            actors: "Annie Potts, Joan Cusack, Tim Allen, Tom Hanks",
            date: "20/06/2019",
            summarizedPlot: "When a new toy called Forky joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.",
            trailer: "https://youtu.be/wmiIUN-7qhE"
        }
        await db.collection('movies').doc('ToyStory').set(data1);
        let data2 = {
            title: "Annabelle Comes Home",
            genre: "Horror, Mystery, Thriller",
            actors: "Vera Farmiga, Patrick Wilson, Mckenna Grace",
            date: " 27/06/2019",
            summarizedPlot: "While babysitting the daughter of Ed and Lorraine Warren, a teenager and her friend unknowingly awaken an evil spirit trapped in a doll.",
            trailer: "https://youtu.be/-OFrNe_FYhc"
        }
        await db.collection('movies').doc('Annabelle').set(data2);

        return db;
    } catch (error) {
        console.error('Error:', error);
    }
}

const clearDb = async () => {
    try {
        console.info('Clear db')

        const documents = await db.collection('movies').listDocuments();

        await Promise.all(documents.map(doc => doc.delete()));
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { initializeDb, clearDb };