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
    argv_vals["--list"],
    argv_vals["--distinct"]
  ]
  let url

  while(maps_urls.length){
    url = maps_urls.shift()

    await page.goto(url, {waitUntil: 'networkidle2'})

    await page.evaluate((GOOGLE_MAPS_PLACES_LIST_NAME, RESTRICT_TO_DISTINCT_LIST) => {
      let button, button_label, places_list_containers, places_list_name, places_list_saved

      button = document.querySelector('#pane button[aria-label][jsaction="pane.placeActions.save"]')
      if (button === null) return

      button_label = button.getAttribute('aria-label').trim().toLowerCase()
      if (RESTRICT_TO_DISTINCT_LIST && (button_label !== 'save')) return
      if (button_label.indexOf('save') !== 0) return
      button.click()

      window.setTimeout(function(){
        places_list_containers = document.querySelectorAll('#hovercard div[data-index][jsaction]')

        places_list_containers.forEach(container => {
          places_list_name = container.querySelector("div.action-menu-entry-text")
          if (places_list_name === null) return
          places_list_name = places_list_name.innerText.toLowerCase()
          if (places_list_name !== GOOGLE_MAPS_PLACES_LIST_NAME) return

          // correct list..
          // now make sure that it isn't already saved (since clicking the list name toggles add/remove)

          places_list_saved = container.querySelector("div.badge-icon.maps-sprite-pane-action-ic-check-small")
          places_list_saved = (places_list_saved !== null)
          if (!places_list_saved) {
            container.click()
          }
        })
      }, 50)
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
