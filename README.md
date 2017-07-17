See [GVLTonight](https://github.com/GVLTonight/GVLTonight)
## requires keys file to be present in project root folder
``` json
{
    "mlab": "mlab_URI",
    "fb": "fb_key"
}
```

## configuration
See [GVLTonight-scrubber/dossier.js](https://github.com/GVLTonight/GVLTonight-scrubber/blob/master/dossier.js)

The only easily configurable system at this time is the facebook events scraper. The facebook system uses the page name of a venue, which can be found in the URL.

(example: "facebook.com/wpbrradioroom/events/")

``` javascript
const gvl  = fbBatch( ["page names"] );
const cola = fbBatch( ["page names"] );
const avl  = fbBatch( ["page names"] );
```

## scripts
``` bash
npm start     # node index.js
```

## notes

FACEBOOK: A facebook page can only be scraped if it has an EVENTS tab. If facebook.com/venuename/events does not exist, then the scrubber will err out. If an event has not been created correctly, or does not list a location, it will be skipped.  It is up to the maintainer of the event calendar to do a good job.

PHANTOM: An item on the todo list is to create a configurable headless system. Scraping websites is easy, but is very hard to scale. It would be nice to just `request.js` or `curl` a site, but due to the popularity of javascript rendered websites, spinning up a headless browser is the only way to ensure the entire DOM has been loaded.

DOSSIER: The headless system pulls the raw html of a website, then parses that html. I think it may be possible to add a section to the `dossier.js` file for venues that need to be scraped this way, but it will require writing manual transformations of each individual source. No two websites are alike, and an unordered list of events will always be presented differently.