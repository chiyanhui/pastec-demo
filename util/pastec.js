const fs = require('fs');
const axios = require('axios');

class PastecError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PastecError';
  }
}

function checkResult(data, type) {
  if (data.type !== type) {
    throw new PastecError(data.type);
  }
}
function Pastec(server) {
  const url = `http://${ server || 'localhost:4212' }/index`;
  return {
    async add(filePath, id) {
      const stream = fs.createReadStream(filePath);
      const res = await axios.put(`${url}/images/${id}`, stream);
      checkResult(res.data, 'IMAGE_ADDED');
      return res.data;
    },

    async search(filePath) {
      const stream = fs.createReadStream(filePath);
      const res = await axios.post(`${url}/searcher`, stream);
      checkResult(res.data, 'SEARCH_RESULTS');
      return res.data;
    },

    async delete(id) {
      const res = await axios.delete(`${url}/images/${id}`);
      checkResult(res.data, 'IMAGE_REMOVED');
      return res.data;
    },

    async list() {
      const res = await axios.get(`${url}/imageIds`);
      checkResult(res.data, 'INDEX_IMAGE_IDS');
      return res.data;
    },

    async clear() {
      const res = await axios.post(`${url}/io`, {type: "CLEAR"});
      checkResult(res.data, 'INDEX_CLEARED');
      return res.data;
    }
  };
}

module.exports = Pastec;
