from index import db, bcrypt


class Movie(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String())
    origin = db.Column(db.String())
    director = db.Column(db.String())
    cast = db.Column(db.String())
    genre = db.Column(db.String())
    wiki = db.Column(db.String())
    plot = db.Column(db.String())
    releaseYear = db.Column(db.Integer())

    def __init__(self, title, origin, director, cast, genre, plot, wiki, releaseYear):
        self.title = title
        self.origin = origin
        self.director = director
        self.cast = cast
        self.genre = genre
        self.wiki = wiki
        self.plot = plot
        self.releaseYear = releaseYear

    def __getitem__(self, item):
        return getattr(self, item)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'id': self.id,
            'title': self.title,
            'origin': self.origin,
            'director': self.director,
            'genre': self.genre,
            'wiki': self.wiki,
            'plot': self.plot,
            'cast': self.cast,
            'releaseYear': self.releaseYear

        }

    @staticmethod
    def get_movie_by_id(id):
        return Movie.query.filter_by(id=id).first()

    @staticmethod
    def delete_movie_by_id(id):
        obj = db.session.query(Movie).filter(Movie.id == id).first()
        db.session.delete(obj)
        db.session.commit()

    @staticmethod
    def get_movies(skip, limit):
        movies=Movie.query.limit(limit).offset(skip).all()
        return [movie.serialize for movie in movies]

    @staticmethod
    def search_movies(name, skip, limit):
        search = "%{}%".format(name)
        movies=Movie.query.filter(Movie.title.like(search)).limit(limit).offset(skip).all()
        return [movie.serialize for movie in movies]
