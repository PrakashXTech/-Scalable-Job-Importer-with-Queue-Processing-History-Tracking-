const axios = require('axios');
const xml2js = require('xml2js');

module.exports = async function fetchJobs() {
  const urls = [process.env.JOB_FEED_URL];
  let allJobs = [];

  for (const url of urls) {
    try {
      const response = await axios.get(url);
      const parsed = await xml2js.parseStringPromise(response.data, { mergeAttrs: true });
      const items = parsed.rss.channel[0].item;

      const jobs = items.map(item => ({
        title: item.title[0],
        company: item['job_listing:company'] ? item['job_listing:company'][0] : '',
        location: item['job_listing:location'] ? item['job_listing:location'][0] : '',
        description: item.description[0],
        url: item.link[0],
        postedAt: new Date(item.pubDate[0]),
      }));

      allJobs.push(...jobs);
    } catch (err) {
      console.error(`Error fetching/parsing ${url}:`, err.message);
    }
  }

  return allJobs;
};
