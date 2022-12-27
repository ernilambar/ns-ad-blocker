'use strict'

const isValidURL = (str) => {
  const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
  if (!regex.test(str)) {
    return false
  } else {
    return true
  }
}

const nsadIsAd = (element) => {
  let status = false

  const image = element.querySelector('img')

  if (image) {
    let src = image.getAttribute('src')

    if (isValidURL(src) === false) {
      src = image.getAttribute('data-pagespeed-lazy-src')
    }

    if (isValidURL(src) === false) {
      src = image.getAttribute('data-src')
    }

    if (nsadHasMatch(src)) {
      status = true
    }
  }

  return status
}

const nsadHasMatch = (url) => {
  let status = false

  if (!url) {
    return status
  }

  const checks = [
    '/advertisement/',
    '/advertise/',
    '/adverts/',
    '/ads/',
    '/adv/',
    '/bigyaapan/',
    '/bannerads/',
    '/upload/headbanner/',
    '/upload/sidead/',
    '/midbanner/'
  ]

  checks.forEach((check) => {
    const matchValue = url.includes(check)
    if (matchValue) {
      status = true
    }
  })

  return status
}

const allLinks = document.querySelectorAll('a')

if (allLinks) {
  for (const link of allLinks) {
    if (nsadIsAd(link)) {
      link.classList.add('hide-me')
    }
  }
}

// Ads.
const adHolders = document.querySelectorAll('.okam-ad-position-wrap, .custom-ad-link')

Array.from(adHolders).map((adItem) => {
  adItem.remove()
})

// Basic.
const allItems = document.querySelectorAll(
  'img[src*=".gif"], a.static-sponsor, a[href*="ncell"], a[href*="esewa"], a[href*="khalti"], a[href*="imepay"], a[href*="bank"], a[href*="dishhome"], a[href*="insurance"], a[href*="college"], img[src*="ad-"], img[src*="-ad"], img[src*="ad."], img[src*="_ad"], img[src*="ad_"], *[id="ad"], *[class="ad"], *[id*="_ad"], *[class*="_ad"], *[id*="ad_"], *[class*="ad_"], *[id*="-ad"], *[class*="-ad"], *[id*="ad-"], *[class*="ad-"], *[id*="bigyapan_"], *[class*="_bigyapan"], *[id*="bigyapan-"], *[class*="-bigyapan"], *[id*="_bigyapan"], *[class*="_bigyapan"], *[id*="-bigyapan"], *[class*="-bigyapan"], *[class*="advertisement"], *[class*=" ad "]'
)

Array.from(allItems).map((ad) => {
  if (ad.querySelector('header') != null) {
    ad.parentNode.prepend(ad.querySelector('header'))
  }
  if (ad.querySelector('footer') != null) {
    ad.parentNode.appendChild(ad.querySelector('footer'))
  }
  if (ad.querySelector('.content') != null) {
    ad.parentNode.prepend(ad.querySelector('.content'))
  }
  ad.remove()
})
