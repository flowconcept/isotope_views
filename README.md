# Isotope Views
Views display plugin with [isotope](https://github.com/metafizzy/isotope) integration (drupal 8)

### Install required libraries
Use Bower or Composer to install the required libraries.

#### Using Bower
Use bower in project root to install and isotope.
```
bower install isotope-layout --save
```

#### Using Composer
Add npm as a respoitory in composer.json:
```
{
  "repositories": {
    "npm": {
        "type": "composer",
        "url": "https://asset-packagist.org"
    }
  }
}
```

Require the isotope-layout library:
```
composer require npm-asset/isotope-layout:^3.0
```
