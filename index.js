const PORT = 8080;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req,res) => {
  res.json("Welcome to my API");
})

app.get('/st', async function(req,res){
  let games = [];

  await axios.get("https://store.steampowered.com/search/?filter=topsellers")
  .then((res)=>{
    const html = res.data;
    const $ = cheerio.load(html);
  
    let games_search = $("#search_resultsRows a");

    games_search.each(function(idx,el) {
      let name = $(el).find(".responsive_search_name_combined .col .title").text()
      let imgurl = $(el).find(".col img").attr('src')

      games.push({name,imgurl});
    })
  })

  res.json(games);
})

app.listen(PORT, ()=>{
  console.log(`Server is up on PORT: ${PORT}`)
})