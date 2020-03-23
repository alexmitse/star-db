export default class SwapiService {
  apiBase = 'https://server-star-db.herokuapp.com';

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received ${res.status}`);
    }
    const resJson = await res.json();
    return resJson;
  }

  async getAllPeople(number, filter) {
    let res = {};
    if (filter) res = await this.getResource(`${filter}`);
    else res = await this.getResource(`/people/?page=${number}`);
    return [res.rows.map(this.transformPerson), res.count];
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this.transformPerson(person[0]);
  }

  async getAllPlanets(number, filter) {
    let res = {};
    if (filter) res = await this.getResource(`${filter}`);
    else res = await this.getResource(`/planets/?page=${number}`);
    return [res.rows.map(this.transformPlanet), res.count];
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this.transformPlanet(planet[0]);
  }

  async getAllStarships(number, filter) {
    let res = {};
    if (filter) res = await this.getResource(`${filter}`);
    else res = await this.getResource(`/starships/?page=${number}`);
    return [res.rows.map(this.transformStarship), res.count];
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}`);
    return this.transformStarship(starship[0]);
  }

  async getAllFilms(number, filter) {
    let res = {};
    if (filter) res = await this.getResource(`${filter}`);
    else res = await this.getResource(`/films/?page=${number}`);
    return [res.rows.map(this.transformFilm), res.count];
  }

  async getFilm(id) {
    const film = await this.getResource(`/films/${id}`);
    return this.transformFilm(film[0]);
  }

  async getAllSpecies(number, filter) {
    let res = {};
    if (filter) res = await this.getResource(`${filter}`);
    else res = await this.getResource(`/species/?page=${number}`);
    return [res.rows.map(this.transformSpecies), res.count];
  }

  async getSpecies(id) {
    const species = await this.getResource(`/species/${id}`);
    return this.transformSpecies(species[0]);
  }

  async getAllVehicles(number, filter) {
    let res = {};
    if (filter) res = await this.getResource(`${filter}`);
    else res = await this.getResource(`/vehicles/?page=${number}`);
    return [res.rows.map(this.transformSpecies), res.count];
  }

  async getVehicles(id) {
    const vehicles = await this.getResource(`/vehicles/${id}`);
    return this.transformVehicles(vehicles[0]);
  }

  async getElement(str, page) {
    const res = await this.getResource(`/search?page=${page}&search=${str}`);
    let result = null;
    let count = 0;
    let peopleCount = 0;
    let planetsCount = 0;
    let filmsCount = 0;
    let speciesCount = 0;
    let vehiclesCount = 0;
    let starshipsCount = 0;

    if (str !== '') {
      result = res.map(this.transformSearch);
      res.forEach((item) => {
        switch (item.tablename) {
          case 'people':
            peopleCount = +item.count;
            break;
          case 'films':
            filmsCount = +item.count;
            break;
          case 'planets':
            planetsCount = +item.count;
            break;
          case 'species':
            speciesCount = +item.count;
            break;
          case 'vehicles':
            vehiclesCount = +item.count;
            break;
          case 'starships':
            starshipsCount = +item.count;
            break;
          default:
            break;
        }
      });
    }
    count =
      peopleCount +
      filmsCount +
      planetsCount +
      speciesCount +
      vehiclesCount +
      starshipsCount;
    return [result, count];
  }

  transformSearch = (search) => {
    return {
      lable: search.tablename,
      id: search.id,
      name: search.name,
    };
  };

  transformPlanet = (planet) => {
    return {
      id: planet.id,
      lable: 'planets',
      name: planet.name,
      climate: planet.climate,
      population: planet.population,
      people: planet.people,
      films: planet.films,
    };
  };

  transformStarship = (starship) => {
    return {
      id: starship.id,
      lable: 'starships',
      name: starship.name,
      model: starship.model,
      length: starship.length,
      people: starship.people,
      films: starship.films,
    };
  };

  transformPerson = (person) => {
    return {
      id: person.id,
      lable: 'people',
      name: person.name,
      gender: person.gender,
      planets: person.planet,
      films: person.films,
      species: person.species,
      vehicles: person.vehicles,
      starships: person.starships,
    };
  };

  transformFilm = (film) => {
    return {
      id: film.id,
      lable: 'films',
      name: film.name,
      director: film.director,
      people: film.people,
      species: film.species,
      starships: film.starships,
      vehicles: film.vehicles,
      planets: film.planets,
    };
  };

  transformSpecies = (species) => {
    return {
      id: species.id,
      lable: 'species',
      name: species.name,
      classification: species.classification,
      language: species.language,
      films: species.films,
      people: species.people,
    };
  };

  transformVehicles = (vehicles) => {
    return {
      id: vehicles.id,
      lable: 'vehicles',
      name: vehicles.name,
      model: vehicles.model,
      length: vehicles.length,
      films: vehicles.films,
      people: vehicles.people,
    };
  };
}
