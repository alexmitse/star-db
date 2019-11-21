/* eslint-disable class-methods-use-this */
export default class SwapiService {
  apiBase = 'https://swapi.co/api';

  async getRequest(url) {
    const res = await fetch(`${url}`);
    const resJson = await res.json();
    return resJson;
  }

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received ${res.status}`);
    }
    const resJson = await res.json();
    return resJson;
  }

  async getAllPeople(number, str) {
    let search = '';
    if (str !== null && str !== 'null' && str !== 'dont show') {
      search = `&search=${str}`;
    }
    const res = await this.getResource(`/people/?page=${number}${search}`);
    return [res.results.map(this.transformPerson), res.count];
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this.transformPerson(person);
  }

  async getAllPlanets(number, str) {
    let search = '';
    if (str !== null && str !== 'null' && str !== 'dont show') {
      search = `&search=${str}`;
    }
    const res = await this.getResource(`/planets/?page=${number}${search}`);
    return [res.results.map(this.transformPlanet), res.count];
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this.transformPlanet(planet);
  }

  async getAllStarships(number, str) {
    let search = '';
    if (str !== null && str !== 'null' && str !== 'dont show') {
      search = `&search=${str}`;
    }
    const res = await this.getResource(`/starships/?page=${number}${search}`);
    return [res.results.map(this.transformStarship), res.count];
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}`);
    return this.transformStarship(starship);
  }

  async getAllFilms(number, str) {
    let search = '';
    if (str !== null && str !== 'null' && str !== 'dont show') {
      search = `&search=${str}`;
    }
    const res = await this.getResource(`/films/?page=${number}${search}`);
    return [res.results.map(this.transformFilm), res.count];
  }

  async getFilm(id) {
    const film = await this.getResource(`/films/${id}`);
    return this.transformFilm(film);
  }

  async getAllSpecies(number, str) {
    let search = '';
    if (str !== null && str !== 'null' && str !== 'dont show') {
      search = `&search=${str}`;
    }
    const res = await this.getResource(`/species/?page=${number}${search}`);
    return [res.results.map(this.transformSpecies), res.count];
  }

  async getSpecies(id) {
    const species = await this.getResource(`/species/${id}`);
    return this.transformSpecies(species);
  }

  async getAllVehicles(number, str) {
    let search = '';
    if (str !== null && str !== 'null' && str !== 'dont show') {
      search = `&search=${str}`;
    }
    const res = await this.getResource(`/vehicles/?page=${number}${search}`);
    return [res.results.map(this.transformSpecies), res.count];
  }

  async getVehicles(id) {
    const vehicles = await this.getResource(`/vehicles/${id}`);
    return this.transformVehicles(vehicles);
  }

  async getElement(category, str) {
    const res = await this.getResource(`/${category}/?search=${str}`);
    switch (category) {
      case 'people':
        return [res.results.map(this.transformElement), res.count];
      case 'starships':
        return [res.results.map(this.transformStarship), res.count];
      case 'planets':
        return [res.results.map(this.transformPlanet), res.count];
      case 'films':
        return [res.results.map(this.transformFilm), res.count];
      case 'species':
        return [res.results.map(this.transformSpecies), res.count];
      case 'vehicles':
        return [res.results.map(this.transformVehicles), res.count];
      default:
        throw new Error(`Could not fetch url, received ${res.status}`);
    }
  }

  extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  transformPlanet = (planet) => {
    return {
      id: this.extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  };

  transformStarship = (starship) => {
    return {
      id: this.extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
    };
  };

  transformPerson = (person) => {
    return {
      id: this.extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    };
  };

  transformFilm = (film) => {
    return {
      id: this.extractId(film),
      name: film.title,
      episodeId: film.episode_id,
      openingCrawl: film.opening_crawl,
      director: film.director,
    };
  };

  transformSpecies = (species) => {
    return {
      id: this.extractId(species),
      name: species.name,
      classification: species.classification,
      designation: species.designation,
      averageHeight: species.average_height,
    };
  };

  transformVehicles = (vehicles) => {
    return {
      id: this.extractId(vehicles),
      name: vehicles.name,
      model: vehicles.model,
      manufacturer: vehicles.manufacturer,
      costInCredits: vehicles.cost_in_credits,
    };
  };

  transformElement = (element) => {
    return {
      id: this.extractId(element),
      name: element.name,
      gender: element.gender,
      birthYear: element.birth_year,
      eyeColor: element.eye_color,
    };
  };
}
