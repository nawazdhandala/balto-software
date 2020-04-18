from flask import request, render_template, send_from_directory, jsonify, url_for, redirect, g
from .models import Movie
from index import app, db
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_token, requires_auth, verify_token
import pandas as pd
import sys

@app.route('/', methods=['GET'])
def index():
    return render_template('build/index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return send_from_directory('static/build', path)


@app.route("/api/movie/import", methods=["POST"])
def import_movies():
    file = request.files['file']
    data = pd.read_csv(file)
    movieDictionary = data.to_dict('records')

    for item in movieDictionary: 
        movie = Movie(
            title=item["Title"],
            origin=item["Origin/Ethnicity"],
            director =item["Director"],
            cast =item["Cast"],
            genre =item["Genre"],
            wiki =item["Wiki Page"],
            plot =item["Plot"],
            releaseYear=item["Release Year"]
        )
        db.session.add(movie)

    try:
        db.session.commit()
    except:
        return jsonify(message="Server Error"), 500

    return jsonify(status="Success")


@app.route("/api/movie", methods=["POST"])
def add_movie():
    incoming = request.get_json()
    movie = Movie(
        title=incoming["title"],
        origin=incoming["origin"],
        director =incoming["director"],
        cast =incoming["cast"],
        genre =incoming["genre"],
        wiki =incoming["wiki"],
        plot =incoming["plot"],
        releaseYear=incoming["releaseYear"]
    )
    db.session.add(movie)

    try:
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify(message="Server Error"), 500

    return jsonify(
        id=movie.id,
        origin=movie["origin"],
        director =movie["director"],
        cast =movie["cast"],
        genre =movie["genre"],
        wiki =movie["wiki"],
        plot =movie["plot"],
        releaseYear=movie["releaseYear"]
    )


@app.route("/api/movie/<id>", methods=["GET"])
def get_movie_by_id(id):
    movie = Movie.get_movie_by_id(id)
    if movie:
        return jsonify(
            id=movie.id,
            origin=movie["origin"],
            director =movie["director"],
            cast =movie["cast"],
            genre =movie["genre"],
            wiki =movie["wiki"],
            plot =movie["plot"],
            releaseYear=movie["releaseYear"],
            title=movie["title"]
        )

    return jsonify(status="Movie not found"), 400

@app.route("/api/movie", methods=["GET"])
def get_movies():
    movies = Movie.get_movies(request.args.get('skip'), request.args.get('limit'))
    return jsonify(movies), 200

@app.route("/api/movie/<id>", methods=["DELETE"])
def delete_movie(id):
    incoming = request.get_json()
    Movie.delete_movie_by_id(id)
    return jsonify(status="Success"), 200

@app.route("/api/movie/<id>", methods=["PUT"])
def edit_movie(id):
    incoming = request.get_json()

    movie = Movie.get_movie_by_id(id)
    if movie:
        movie.origin=incoming["origin"],
        movie.director =incoming["director"],
        movie.cast =incoming["cast"],       
        movie.genre =incoming["genre"],
        movie.wiki =incoming["wiki"],
        movie.plot =incoming["plot"],
        movie.releaseYear=incoming["releaseYear"]
        db.session.commit()
        return jsonify(
            id=movie.id,
            origin=movie["origin"],
            director =movie["director"],
            cast =movie["cast"],
            genre =movie["genre"],
            wiki =movie["wiki"],
            plot =movie["plot"],
            releaseYear=movie["releaseYear"]
        )
        
    return jsonify(status="Movie not found"), 400

@app.route("/api/movie/search", methods=["GET"])
def search_movies():
    movies = Movie.search_movies(request.args.get('name'), request.args.get('skip'), request.args.get('limit'))
    return jsonify(movies), 200
