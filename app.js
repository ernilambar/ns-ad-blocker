'use strict';

const nsadIsAd = ( element ) => {
  let status = false;

  const image = element.querySelector('img');

  if ( image ) {
    const src = image.getAttribute('src');
    if ( nsadHasMatch( src ) ) {
      status = true;
    }
  }

  return status;
}

const nsadHasMatch = ( url ) => {
  let status = false;

  if ( ! url ) {
    return status;
  }

  const checks = [
    "/advertisement/",
    "/upload/headbanner/",
    "/upload/sidead/",
    "/upload/midbanner/",
    "/upload/advertise/",
    "/uploads/bigyaapan/",
    "/uploads/bannerads/",
    "/uploads/source/ads/"
  ];

  checks.forEach((check) => {
    const matchValue = url.includes( check );
    if ( matchValue ) {
      status = true;
      return;
    }
  });

  return status;
}

const allLinks = document.querySelectorAll('a');

if ( allLinks ) {
  for ( let link of allLinks ) {
    if ( nsadIsAd( link ) ) {
      link.classList.add('hide-me');
    }
  }
}

