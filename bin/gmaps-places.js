#! /usr/bin/env node

const argv_vals = require('./gmaps-places/process_argv')
const puppeteer = require('puppeteer')

let browser, page

const initialize = async () => {
  browser = await puppeteer.launch({headless: false})

  page = await browser.newPage()
}

const finalize = () => {
  if (browser && browser.close)
    browser.close()
}

const login = async () => {
  await page.goto('https://accounts.google.com/', {waitUntil: 'networkidle2'})

  const function_args = [
    argv_vals["--username"],
    argv_vals["--password"]
  ]

  await page.evaluate((GOOGLE_ACCOUNT_ID, GOOGLE_ACCOUNT_PASS) => {
    document.getElementById('identifierId').value = GOOGLE_ACCOUNT_ID
    document.getElementById('identifierNext').click()

    window.setTimeout(function(){
      document.querySelector("[name='password'").value = GOOGLE_ACCOUNT_PASS
      document.getElementById('passwordNext').click()
    }, 250)
  }, ...function_args)

  await page.waitFor(4000)
}

const process_maps_urls = async () => {
  const maps_urls = argv_vals["--input"]
  const function_args = [
    argv_vals["--list"]
  ]
  let url

  while(maps_urls.length){
    url = maps_urls.shift()

    await page.goto(url, {waitUntil: 'networkidle2'})

    await page.evaluate((GOOGLE_MAPS_PLACES_LIST_NAME) => {
      if (document.querySelector("button[aria-label='SAVE']") !== null) {
        document.querySelector("button[aria-label='SAVE']").click()
        window.setTimeout(function(){
          document.querySelectorAll("div.action-menu-entry-text").forEach(div => {
            if (div.innerText.toLowerCase() === GOOGLE_MAPS_PLACES_LIST_NAME)
              div.click()
          })
        }, 50)
      }
    }, ...function_args)

    await page.waitFor(200)
  }
}

const import_places = async () => {
  await initialize()
  await login()
  await process_maps_urls()

  console.log(`SUCCESS: All "places" data has been saved to the Google Maps "${argv_vals["--list"]}" list`)
}

import_places()
.catch(error => {
  console.log('ERROR:', error.message)
})
.finally(() => {
  finalize()
})
