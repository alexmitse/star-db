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

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results;
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this.transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource(`/starship/`);
    return res.results.map(this.transformStarship);
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}`);
    return this.transformStarship(starship);
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
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity,
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
}
