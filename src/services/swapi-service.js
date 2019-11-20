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

  async getAllPeople(number) {
    const res = await this.getResource(`/people/?page=${number}`);
    return [res.results.map(this.transformPerson), res.count];
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this.transformPerson(person);
  }

  async getAllPlanets(number) {
    const res = await this.getResource(`/planets/?page=${number}`);
    return [res.results.map(this.transformPlanet), res.count];
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this.transformPlanet(planet);
  }

  async getAllStarships(number) {
    const res = await this.getResource(`/starships/?page=${number}`);
    return [res.results.map(this.transformStarship), res.count];
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}`);
    return this.transformStarship(starship);
  }

  async getAllFilms(number) {
    const res = await this.getResource(`/films/?page=${number}`);
    return [res.results.map(this.transformFilm), res.count];
  }

  async getFilm(id) {
    const film = await this.getResource(`/films/${id}`);
    return this.transformFilm(film);
  }

  async getAllSpecies(number) {
    const res = await this.getResource(`/species/?page=${number}`);
    return [res.results.map(this.transformSpecies), res.count];
  }

  async getSpecies(id) {
    const species = await this.getResource(`/species/${id}`);
    return this.transformSpecies(species);
  }

  async getAllVehicles(number) {
    const res = await this.getResource(`/vehicles/?page=${number}`);
    return [res.results.map(this.transformSpecies), res.count];
  }

  async getVehicles(id) {
    const vehicles = await this.getResource(`/vehicles/${id}`);
    return this.transformVehicles(vehicles);
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
}
