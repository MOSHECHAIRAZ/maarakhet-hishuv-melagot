const fs = require('fs').promises;
const path = require('path');

class ScholarshipService {
  #dataDir;
  #filename = 'scholarships';
  #lock = Promise.resolve();

  constructor() {
    this.#dataDir = path.join(__dirname, '..', process.env.DATA_DIR || 'data');
  }

  async #_runExclusive(task) {
    this.#lock = this.#lock.then(() => task()).catch(() => {});
    return this.#lock;
  }

  async initialize() {
    try {
      await fs.mkdir(this.#dataDir, { recursive: true });
    } catch (error) {
      console.error("Error creating data directory:", error);
    }
  }

  async #_saveData(data) {
    const filePath = path.join(this.#dataDir, `${this.#filename}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  async #_loadData() {
    const filePath = path.join(this.#dataDir, `${this.#filename}.json`);
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      return JSON.parse(fileContent);
    } catch (error) {
      if (error.code === 'ENOENT') {
        const dataToSave = { scholarships: [] };
        await this.#_saveData(dataToSave);
        return dataToSave;
      }
      console.error(`Error loading data for ${this.#filename}:`, error);
      throw error;
    }
  }

  async getAll() {
    const data = await this.#_loadData();
    return data.scholarships;
  }

  async getById(id) {
    const data = await this.#_loadData();
    return data.scholarships.find(s => s.id === id) || null;
  }

  async create(data) {
    return this.#_runExclusive(async () => {
      const fullData = await this.#_loadData();
      const newScholarship = {
        id: 'sch_' + Date.now(),
        ...data,
        timestamp: new Date().toISOString()
      };
      fullData.scholarships.push(newScholarship);
      await this.#_saveData(fullData);
      return newScholarship;
    });
  }

  async saveBatch(scholarships) {
    if (!Array.isArray(scholarships)) {
      throw new Error('scholarships must be an array');
    }
    return this.#_runExclusive(async () => {
      const data = { scholarships };
      await this.#_saveData(data);
    });
  }
}

module.exports = new ScholarshipService();