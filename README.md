# ångstromCTF

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.2.0.

To build it, first install the `@angular/cli` package, and then install the local dependencies:

```bash
npm install -g @angular/cli
npm install
```

## Development

To see a live version of the site during development, simply use the `ng serve` command.

## Deployment

A production version of ångstromCTF, ready for deployment, can be built with `ng build --prod --aot --env=prod`. `upload.sh` automagically build this site and uploads it to the production server!

## Code Layout

The Angular source code is laid out in `src/app` in the following way:

* `api` is autogenerated code that interacts with the djangoCTF API, running on `https://angstromctf.com/api`. This is generated by `rebuild_api.sh`; usually, you shouldn't edit it.
* `content` is static pages with normal website content (e.g. the index page).
* `lib` is miscellaneous Angular objects used throughout the code.
* `problems` is pages that deal with the contest problems.
* `styles` is Sass code detailing the website's main styles.
* `teams` is pages that deal with displaying information about teams in the competition.
* `users` is pages that deal with user authentication and team formation.
* `utils` is Angular services that form part of the website's GUI.

In general, website pages correspond to Angular components. Each component has a `.component.ts` file, which is the dynamic JavaScript piece of the page, and a `.component.html` file, which is the static HTML template. Additionally, some components have specific Sass stylings, which are located in `.component.scss` files.
