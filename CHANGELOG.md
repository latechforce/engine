## [0.66.1](https://github.com/latechforce/engine/compare/v0.66.0...v0.66.1) (2025-07-17)


### Bug Fixes

* **table:** fix postgres view schema ([311193a](https://github.com/latechforce/engine/commit/311193ab797a60f368b9aa0fe291cc3af742819e)) — Thomas JEANNEAU

# [0.66.0](https://github.com/latechforce/engine/compare/v0.65.0...v0.66.0) (2025-07-17)


### Bug Fixes

* **Run:** fix replaying error ([489dcfb](https://github.com/latechforce/engine/commit/489dcfbb4cde9046f84372ab59c1a59e8ccf7018)) — Thomas JEANNEAU


### Features

* **Run:** can filter run by status ([8328ff9](https://github.com/latechforce/engine/commit/8328ff9e57eae1055f4b2fa51dd70cc1dbddfc03)) — Thomas JEANNEAU

# [0.65.0](https://github.com/latechforce/engine/compare/v0.64.0...v0.65.0) (2025-07-17)


### Bug Fixes

* **Connection:** add email alert when a connection status is disconnected ([728dd8c](https://github.com/latechforce/engine/commit/728dd8c5b116da3daeebc89d9b3c6b051da6baa8)) — Thomas JEANNEAU
* **Google:** should not throw an error if a refresh token is not valid ([66cbd6e](https://github.com/latechforce/engine/commit/66cbd6e514f52974c5dfed0467e59bc951aa8e70)) — Thomas JEANNEAU
* **Runs:** reset pagination when navigate between automation runs pages ([6c877e0](https://github.com/latechforce/engine/commit/6c877e04da09f49ac6457765bb2c02f02bd0526c)) — Thomas JEANNEAU


### Features

* **Automation:** add email alert if an automation run failed ([24870e1](https://github.com/latechforce/engine/commit/24870e166a930bf418b024e09b7ce4a813e6792a)) — Thomas JEANNEAU
* **Run:** add pagination for display runs ([2c0af6a](https://github.com/latechforce/engine/commit/2c0af6adac663dc5a98bf73df5c9be60425a52e9)) — Thomas JEANNEAU
* **Runs:** can replay failed runs ([bb20c30](https://github.com/latechforce/engine/commit/bb20c30d79d213f7aad301821e4fa98a8fe720f5)) — Thomas JEANNEAU

# [0.64.0](https://github.com/latechforce/engine/compare/v0.63.0...v0.64.0) (2025-06-27)


### Bug Fixes

* **app:** should throw an error if a action account is not found ([3d036d2](https://github.com/latechforce/engine/commit/3d036d20111d3ff8bfea1458a067f1fd5b3950e7)) — Thomas JEANNEAU


### Features

* **action:** should run a TypeScript code with actions ([78525c9](https://github.com/latechforce/engine/commit/78525c993c11b31a953fb238d15f0251cffa37f1)) — Thomas JEANNEAU

# [0.63.0](https://github.com/latechforce/engine/compare/v0.62.2...v0.63.0) (2025-06-27)


### Features

* **airtable:** should run a airtable list webhook payloads action ([56199c4](https://github.com/latechforce/engine/commit/56199c4be3b0c7bd37505f3fcb12b2e9ae32b500)) — Thomas JEANNEAU

## [0.62.2](https://github.com/latechforce/engine/compare/v0.62.1...v0.62.2) (2025-06-26)


### Bug Fixes

* **airtable:** fix createWebhook ([5e47eca](https://github.com/latechforce/engine/commit/5e47eca0c5646bb9ec59cf1357a1fdac26a109cd)) — Thomas JEANNEAU

## [0.62.1](https://github.com/latechforce/engine/compare/v0.62.0...v0.62.1) (2025-06-26)


### Bug Fixes

* **table:** fix sqlite schema ([144030d](https://github.com/latechforce/engine/commit/144030d2f610a479de9b32496fad244ec8504f98)) — Thomas JEANNEAU

# [0.62.0](https://github.com/latechforce/engine/compare/v0.61.5...v0.62.0) (2025-06-26)


### Features

* **airtable:** should connect to airtable ([79903af](https://github.com/latechforce/engine/commit/79903af1eed75980dae0db872dd5058f9ee4b7ab)) — Thomas JEANNEAU
* **airtable:** should trigger an automation when a airtable record is created ([6cea525](https://github.com/latechforce/engine/commit/6cea525cb73ced216ec5036f7de5da3a1b1bae2b)) — Thomas JEANNEAU

## [0.61.5](https://github.com/latechforce/engine/compare/v0.61.4...v0.61.5) (2025-06-26)


### Bug Fixes

* **action:** allow email in variables in gmail config ([3e73307](https://github.com/latechforce/engine/commit/3e7330737f7d13c35a7e3cc76a8dd0408f269187)) — Thomas JEANNEAU

## [0.61.4](https://github.com/latechforce/engine/compare/v0.61.3...v0.61.4) (2025-06-26)


### Bug Fixes

* **action:** should filter a JavaScript code that return an empty array ([c64dab5](https://github.com/latechforce/engine/commit/c64dab58bf4c35cbec7e26e163bebbb2172cff7f)) — Thomas JEANNEAU
* **gmail:** can add name, cc and bcc in email ([1c584f7](https://github.com/latechforce/engine/commit/1c584f73e77ec4eaf988f8d3c0f0ef28fe5b7ae0)) — Thomas JEANNEAU

## [0.61.3](https://github.com/latechforce/engine/compare/v0.61.2...v0.61.3) (2025-06-26)


### Bug Fixes

* **run:** should return a list of runs filtered by search on automation name ([205be47](https://github.com/latechforce/engine/commit/205be477def15eb94e94ef575f2d23583e941684)) — Thomas JEANNEAU
* **run:** should return a list of runs filtered by search on steps content ([34ec71b](https://github.com/latechforce/engine/commit/34ec71b6ecfc27a960c00cf52f279e792de770ab)) — Thomas JEANNEAU

## [0.61.2](https://github.com/latechforce/engine/compare/v0.61.1...v0.61.2) (2025-06-25)


### Bug Fixes

* **gmail:** send email with html body ([ff2f2c2](https://github.com/latechforce/engine/commit/ff2f2c2018b00878eff1310857753b8ee754052c)) — Thomas JEANNEAU

## [0.61.1](https://github.com/latechforce/engine/compare/v0.61.0...v0.61.1) (2025-06-25)


### Bug Fixes

* **bucket:** should throw an error if there are duplicate bucket ids ([5190baa](https://github.com/latechforce/engine/commit/5190baae18242b54be2721aa50dedbb6fe4b5056)) — Thomas JEANNEAU
* **template:** should fill a template with the current local date in ISO format ([84e6756](https://github.com/latechforce/engine/commit/84e67561cc5dd985815d4b66f406a2c948952844)) — Thomas JEANNEAU

# [0.61.0](https://github.com/latechforce/engine/compare/v0.60.0...v0.61.0) (2025-06-24)


### Bug Fixes

* open forms in a new page ([18ef5de](https://github.com/latechforce/engine/commit/18ef5debc660ca92f24d1e8e8f1468b0172663f8)) — Thomas JEANNEAU
* run number step ui ([97af4a4](https://github.com/latechforce/engine/commit/97af4a42b2842f63ae002dfa4cef39366a6f9532)) — Thomas JEANNEAU


### Features

* **form:** should display an error when the form is submitted ([d9366a1](https://github.com/latechforce/engine/commit/d9366a18ebb856c71991d70e02afd45d432b9ae8)) — Thomas JEANNEAU

# [0.60.0](https://github.com/latechforce/engine/compare/v0.59.4...v0.60.0) (2025-06-24)


### Features

* **action:** should create a record from an automation ([4032c43](https://github.com/latechforce/engine/commit/4032c43d173a35b2708a71b2e50ea35de6701cf8)) — Thomas JEANNEAU
* **automation:** should run parallel automations with same integration actions in a queue with 2 seconds apart ([f9f0e1c](https://github.com/latechforce/engine/commit/f9f0e1c1184b047c2349f65ba26c3c4265cb6e7a)) — Thomas JEANNEAU
* **template:** should fill a template with the current date in ISO format ([92ddb8b](https://github.com/latechforce/engine/commit/92ddb8b17d76600dbe5e2343fc29b71e64886acd)) — Thomas JEANNEAU

## [0.59.4](https://github.com/latechforce/engine/compare/v0.59.3...v0.59.4) (2025-06-23)


### Bug Fixes

* **template:** should fill a complex template object ([ad733f4](https://github.com/latechforce/engine/commit/ad733f4c8c4c7b56cae00d0c07f3fdb3f94d5afd)) — Thomas JEANNEAU

## [0.59.3](https://github.com/latechforce/engine/compare/v0.59.2...v0.59.3) (2025-06-23)


### Bug Fixes

* ui ([c63e4e0](https://github.com/latechforce/engine/commit/c63e4e00acd8f5e9743976d768827ba64f37c71f)) — Thomas JEANNEAU

## [0.59.2](https://github.com/latechforce/engine/compare/v0.59.1...v0.59.2) (2025-06-23)


### Bug Fixes

* breaking ([1fef302](https://github.com/latechforce/engine/commit/1fef3027ceeae6e870183e72f58614747ca5d54d)) — Thomas JEANNEAU

## [0.59.1](https://github.com/latechforce/engine/compare/v0.59.0...v0.59.1) (2025-06-23)


### Bug Fixes

* default favicon path ([5f69b38](https://github.com/latechforce/engine/commit/5f69b38c6bcb06da4a5f530d4c4d88a21368dee6)) — Thomas JEANNEAU

# [0.59.0](https://github.com/latechforce/engine/compare/v0.58.4...v0.59.0) (2025-06-23)


### Features

* add default favicon ([c19608e](https://github.com/latechforce/engine/commit/c19608e84a5c488f79945728e8e2103f61d58689)) — Thomas JEANNEAU
* **server:** should serve static files ([ab2652b](https://github.com/latechforce/engine/commit/ab2652b73318e04684f6428b89e1d23e39ab2e5d)) — Thomas JEANNEAU
* **trigger:** should trigger an automation with a valid array body and respond immediately ([e57f54e](https://github.com/latechforce/engine/commit/e57f54e75f5464a47f757a4eb1077e5842659193)) — Thomas JEANNEAU

## [0.58.4](https://github.com/latechforce/engine/compare/v0.58.3...v0.58.4) (2025-06-22)


### Bug Fixes

* **action:** should run a calendly get event type action on invite created ([26fed45](https://github.com/latechforce/engine/commit/26fed4541cc18ef781026bb6f7e3103af9405af9)) — Thomas JEANNEAU

## [0.58.3](https://github.com/latechforce/engine/compare/v0.58.2...v0.58.3) (2025-06-22)


### Bug Fixes

* **action:** fix bad template filling in setup ([c3a6d3b](https://github.com/latechforce/engine/commit/c3a6d3b1fe57bbd308de08c1f9a8edc2f6563e8f)) — Thomas JEANNEAU

## [0.58.2](https://github.com/latechforce/engine/compare/v0.58.1...v0.58.2) (2025-06-22)


### Bug Fixes

* **trigger:** should trigger an automation with form data ([bd2ddda](https://github.com/latechforce/engine/commit/bd2dddada06cae50838e73be570b06cde329cdc1)) — Thomas JEANNEAU

## [0.58.1](https://github.com/latechforce/engine/compare/v0.58.0...v0.58.1) (2025-06-22)


### Bug Fixes

* **temaplte:** should fill a template with a regex helper and extract the first match ([35f6d18](https://github.com/latechforce/engine/commit/35f6d1886b8e080ab71b28660c2046b9ca8940f0)) — Thomas JEANNEAU

# [0.58.0](https://github.com/latechforce/engine/compare/v0.57.4...v0.58.0) (2025-06-22)


### Features

* **calendly:** should run a calendly get event type action ([9432f68](https://github.com/latechforce/engine/commit/9432f68f6add9e5d1aa7275689a92dcc680c4602)) — Thomas JEANNEAU

## [0.57.4](https://github.com/latechforce/engine/compare/v0.57.3...v0.57.4) (2025-06-22)


### Bug Fixes

* **run:** should search and filter automation runs based on steps data ([507dc56](https://github.com/latechforce/engine/commit/507dc56490c471a6eb4a0e3e1bc9a2e827867135)) — Thomas JEANNEAU

## [0.57.3](https://github.com/latechforce/engine/compare/v0.57.2...v0.57.3) (2025-06-22)


### Bug Fixes

* **connection:** created_at calendly value ([0b00dba](https://github.com/latechforce/engine/commit/0b00dba707e9f41d02ce691b5bc0c0158b9c8eee)) — Thomas JEANNEAU
* **connection:** refresh google token on restart ([05549eb](https://github.com/latechforce/engine/commit/05549eb24fdb9df877d39ea831ca1cbf5f3793d8)) — Thomas JEANNEAU
* **user:** add auth required for api endpoints ([8981131](https://github.com/latechforce/engine/commit/8981131b22ea0394fe2a6b3370fbc5e095184a58)) — Thomas JEANNEAU

## [0.57.2](https://github.com/latechforce/engine/compare/v0.57.1...v0.57.2) (2025-06-20)


### Bug Fixes

* **connection:** fix state in redirect uri ([2facd8e](https://github.com/latechforce/engine/commit/2facd8e840b64fc2c4178e27ca0aed4b3606331e)) — Thomas JEANNEAU

## [0.57.1](https://github.com/latechforce/engine/compare/v0.57.0...v0.57.1) (2025-06-20)


### Bug Fixes

* **action:** add error display ([836b21c](https://github.com/latechforce/engine/commit/836b21c68d24894c70278003c542c73fb5c325b3)) — Thomas JEANNEAU
* **action:** should run an is-true filter action that returns true ([4571097](https://github.com/latechforce/engine/commit/45710975cf6831beb558b7ad5cf45fd43ca086db)) — Thomas JEANNEAU
* **form:** should display a form with a path with no slash ([d32015e](https://github.com/latechforce/engine/commit/d32015eb3edf4b5cb93fc361183585fda97b7e28)) — Thomas JEANNEAU

# [0.57.0](https://github.com/latechforce/engine/compare/v0.56.1...v0.57.0) (2025-06-20)


### Bug Fixes

* **table:** should create a table record with required fields ([e257567](https://github.com/latechforce/engine/commit/e257567db6251a504f078f2fe8eda55ae6566818)) — Thomas JEANNEAU


### Features

* **run:** display runs steps ([72c8f25](https://github.com/latechforce/engine/commit/72c8f25620134059af2033363301860dbeff340b)) — Thomas JEANNEAU

## [0.56.1](https://github.com/latechforce/engine/compare/v0.56.0...v0.56.1) (2025-06-18)


### Bug Fixes

* event memory leak ([ac2ab00](https://github.com/latechforce/engine/commit/ac2ab00af820b219e13edf8ae3971453ac44bdec)) — Thomas JEANNEAU

# [0.56.0](https://github.com/latechforce/engine/compare/v0.55.0...v0.56.0) (2025-06-17)


### Features

* **action:** add green test: should run a google gmail send email action ([045a243](https://github.com/latechforce/engine/commit/045a2438c6ea023c4fd81fc5d3a052703fb93302)) — Thomas JEANNEAU
* **action:** add green test: should run a google sheets append values action ([496b4fd](https://github.com/latechforce/engine/commit/496b4fdd47114316bdb65f96dc04e894f792c9b5)) — Thomas JEANNEAU
* **action:** add green test: should trigger the automation with a cron time ([171670d](https://github.com/latechforce/engine/commit/171670d43a724fe8dfde8694677f2ff61d07c8dc)) — Thomas JEANNEAU

# [0.55.0](https://github.com/latechforce/engine/compare/v0.54.1...v0.55.0) (2025-06-09)


### Features

* **action:** can list table records with filter ([33fd4c9](https://github.com/latechforce/engine/commit/33fd4c9716f0fb3e14e548b84a49d0ed6bfbf4d0)) — Thomas JEANNEAU
* **connection:** should connect to Gmail ([a689a7f](https://github.com/latechforce/engine/commit/a689a7f1a1a36d11bca2c0a46111110ce16e6a7c)) — Thomas JEANNEAU
* **connection:** should connect to Google Sheets ([fe8a7f3](https://github.com/latechforce/engine/commit/fe8a7f3178d55cbb0012c4b587bf46f95619ae19)) — Thomas JEANNEAU
* **table:** should delete a table record ([61c1ef9](https://github.com/latechforce/engine/commit/61c1ef9548f4c373407781a4186611bd511f6bd3)) — Thomas JEANNEAU
* **table:** should open and display a table record ([9205cea](https://github.com/latechforce/engine/commit/9205ceaea68f1bf91a3c71cf2602c6af1f99310b)) — Thomas JEANNEAU
* **table:** should update a table record ([c23b027](https://github.com/latechforce/engine/commit/c23b02752d80a607a4224501c85d9ffd014ef2d8)) — Thomas JEANNEAU

## [0.54.1](https://github.com/latechforce/engine/compare/v0.54.0...v0.54.1) (2025-06-06)


### Bug Fixes

* **automation:** add log function in code action ([0e610ac](https://github.com/latechforce/engine/commit/0e610ac51641aa9714e504666da94b7a77917043)) — Thomas JEANNEAU

# [0.54.0](https://github.com/latechforce/engine/compare/v0.53.1...v0.54.0) (2025-06-06)


### Features

* **automation:** should run an automation when a record is created ([91a7f0f](https://github.com/latechforce/engine/commit/91a7f0f0a939d3661e17144eddc1d5fdbc67eb70)) — Thomas JEANNEAU

## [0.53.1](https://github.com/latechforce/engine/compare/v0.53.0...v0.53.1) (2025-06-05)


### Bug Fixes

* remove broken import ([701a971](https://github.com/latechforce/engine/commit/701a971aa26ecf239545db5832f18186842a6665)) — Thomas JEANNEAU

# [0.53.0](https://github.com/latechforce/engine/compare/v0.52.0...v0.53.0) (2025-06-05)


### Features

* **automation:** should disable an automation ([cadaca4](https://github.com/latechforce/engine/commit/cadaca4fd9c1205570861218f633c95632c7a4c3)) — Thomas JEANNEAU
* **automation:** should list automations on admin page ([253c870](https://github.com/latechforce/engine/commit/253c870042d9ee2007d580b1d2533381e40a4fef)) — Thomas JEANNEAU
* **automation:** should open and display an automation run ([fa44771](https://github.com/latechforce/engine/commit/fa44771d8b1e238035b8a43e96b9346bd07e4c91)) — Thomas JEANNEAU
* **automation:** should open the edit url ([b613295](https://github.com/latechforce/engine/commit/b61329576376bde7153bdb27c0c8ef95d3cad4c7)) — Thomas JEANNEAU
* **automation:** should search and filter automation runs ([7aaecc4](https://github.com/latechforce/engine/commit/7aaecc45618e59edc1d4d391da407a76a96204d4)) — Thomas JEANNEAU

# [0.52.0](https://github.com/latechforce/engine/compare/v0.51.0...v0.52.0) (2025-06-04)


### Features

* **action:** should run a TypeScript code that return an array ([56475d8](https://github.com/latechforce/engine/commit/56475d86b2c1b0fb9cdb9a4703f933a8eb7dcd50)) — Thomas JEANNEAU
* **action:** should run a TypeScript code with buckets ([5f35dc9](https://github.com/latechforce/engine/commit/5f35dc9363481a221f184b84e06ccfad0572ac29)) — Thomas JEANNEAU

# [0.51.0](https://github.com/latechforce/engine/compare/v0.50.1...v0.51.0) (2025-06-04)


### Features

* **action:** should run action with env variables in inputData ([77cae6e](https://github.com/latechforce/engine/commit/77cae6e6c0f02719d9eb557a90518978dab87968)) — Thomas JEANNEAU
* **action:** should run action with inputData parsed in JSON ([70e53ed](https://github.com/latechforce/engine/commit/70e53ed66591e509b541a77db98056289c6b5b22)) — Thomas JEANNEAU
* **mocks:** export mocks for app testing ([969e33e](https://github.com/latechforce/engine/commit/969e33ec7b4c5460ac7dead3d8250eca07ed9270)) — Thomas JEANNEAU

## [0.50.1](https://github.com/latechforce/engine/compare/v0.50.0...v0.50.1) (2025-06-04)


### Bug Fixes

* export types from src/index.ts file ([f8167bd](https://github.com/latechforce/engine/commit/f8167bdf543f889d078f5c1edb6e9c38bde7004a)) — Thomas JEANNEAU

# [0.50.0](https://github.com/latechforce/engine/compare/v0.49.0...v0.50.0) (2025-06-04)


### Features

* **action:** should run a split into paths paths action ([e3958a8](https://github.com/latechforce/engine/commit/e3958a8bad8e000eed0b74b98d6198f9a8a6714d)) — Thomas JEANNEAU
* **action:** should run a split into paths paths action with multiple paths ([4cfc080](https://github.com/latechforce/engine/commit/4cfc0804351e9234821d31333d705cb081b3d4ca)) — Thomas JEANNEAU
* **action:** should run an does-not-exist filter action that returns true ([1b9570a](https://github.com/latechforce/engine/commit/1b9570a6af18ea67780f26f08ad13e1ed95f0905)) — Thomas JEANNEAU
* **action:** should run an exists filter action that returns true ([9b9996d](https://github.com/latechforce/engine/commit/9b9996d25d23ea5d5ebed874e174afc63fa90f7d)) — Thomas JEANNEAU
* **action:** should run an or filter action that returns false ([b87a945](https://github.com/latechforce/engine/commit/b87a945b63967a296debeb5dd23bc7371fedf009)) — Thomas JEANNEAU

# [0.49.0](https://github.com/latechforce/engine/compare/v0.48.0...v0.49.0) (2025-06-01)


### Features

* **admin:** should list table records ([d1ea1e7](https://github.com/latechforce/engine/commit/d1ea1e7f06de53f7a0bbc6a84ad1a19ec8e17177)) — Thomas JEANNEAU
* **admin:** should search table records ([2eba2fe](https://github.com/latechforce/engine/commit/2eba2fe6415f900b2e7cba85b153613472dc5862)) — Thomas JEANNEAU
* **bucket:** should upload a file ([6e99fe2](https://github.com/latechforce/engine/commit/6e99fe266d124b8d7b2bf1826b2ae566ea90cbac)) — Thomas JEANNEAU
* **code:** should run a TypeScript code with tables ([efa764d](https://github.com/latechforce/engine/commit/efa764df146d1a402308fb800a1db0d15d032583)) — Thomas JEANNEAU
* **form:** should create a record with a checkbox input ([5b76a70](https://github.com/latechforce/engine/commit/5b76a705bdcb22ebefea40de119427d2e6e63a08)) — Thomas JEANNEAU
* **form:** should create a record with a email input ([ba99f9a](https://github.com/latechforce/engine/commit/ba99f9aab39e85200a3cf0f079401928ebd4d6fa)) — Thomas JEANNEAU
* **form:** should create a record with a long text input ([bee2f27](https://github.com/latechforce/engine/commit/bee2f276134641e282320463ae80dd3293874b11)) — Thomas JEANNEAU
* **form:** should create a record with a phone number input ([3e36630](https://github.com/latechforce/engine/commit/3e3663015e0af73088a656e58f3aebd99bf0a36f)) — Thomas JEANNEAU
* **form:** should create a record with a single attachment input ([8e83b38](https://github.com/latechforce/engine/commit/8e83b38b9d330d7292a76e7099111113b8c633e9)) — Thomas JEANNEAU
* **form:** should create a record with a single line text input ([7547fc8](https://github.com/latechforce/engine/commit/7547fc8a513cd5adc6e1a2dcf09bc61f18509ec9)) — Thomas JEANNEAU
* **form:** should create a record with a single select input ([9bf9426](https://github.com/latechforce/engine/commit/9bf942659890c5301d16b9bcc3c5978f2136ed07)) — Thomas JEANNEAU
* **form:** should create a record with a url input ([025b89b](https://github.com/latechforce/engine/commit/025b89b88a96ebb4e94bb0fd2e7f0bd8116c75bf)) — Thomas JEANNEAU
* **form:** should display a form with a checkbox input ([e921609](https://github.com/latechforce/engine/commit/e921609b1b5d14f0438c355402029518d980511d)) — Thomas JEANNEAU
* **form:** should display a form with a single attachment input ([cf2fd78](https://github.com/latechforce/engine/commit/cf2fd78f32feff24aa28c953da8dd14b27236830)) — Thomas JEANNEAU
* **form:** should display a form with a single-select input ([9c1ccc3](https://github.com/latechforce/engine/commit/9c1ccc3f8e36c46bdbf55c38b6fb38a54a804237)) — Thomas JEANNEAU
* **form:** should display a form with inputs ([8b01e1c](https://github.com/latechforce/engine/commit/8b01e1ccb6caec984f18213b9d4a509ddfe76c83)) — Thomas JEANNEAU
* **form:** should display email, single-line-text, long-text, url and phone inputs ([c1034d4](https://github.com/latechforce/engine/commit/c1034d44922fc7c3eecf5631f44d2fab34efeec9)) — Thomas JEANNEAU
* **form:** should list forms ([1e8486e](https://github.com/latechforce/engine/commit/1e8486e9f9c66a37901dfaf74315940237d14463)) — Thomas JEANNEAU
* **form:** should open a form in a new page ([1ac6bca](https://github.com/latechforce/engine/commit/1ac6bca3ddd71e04071c388e6a1ca706db1171de)) — Thomas JEANNEAU
* **form:** should return a list of forms ([40ae851](https://github.com/latechforce/engine/commit/40ae851382430f9b7d1e86d8999d47275148f0b2)) — Thomas JEANNEAU
* **form:** should run an automation when a form with a single line text input is submitted ([9f7c532](https://github.com/latechforce/engine/commit/9f7c53280058a1f0fcb15b17a9b98c201933d8c3)) — Thomas JEANNEAU
* should run a calendly list webhook subscriptions action ([906f850](https://github.com/latechforce/engine/commit/906f8503de8f9373b1e9a615adee89bfe06ec243)) — Thomas JEANNEAU
* **table:** should create a record from API ([2d36c98](https://github.com/latechforce/engine/commit/2d36c989c8ba9f2fdaf5d62eb25754b632399e42)) — Thomas JEANNEAU
* **table:** should create multiple records from a POST request ([3a0e33f](https://github.com/latechforce/engine/commit/3a0e33ff52ce0dea5733f470380e6aff596ed527)) — Thomas JEANNEAU
* **table:** should delete multiple records from a DELETE request ([be6edb5](https://github.com/latechforce/engine/commit/be6edb596558a4655691c769e015297657215b39)) — Thomas JEANNEAU
* **table:** should list records from a GET request ([629137a](https://github.com/latechforce/engine/commit/629137ae78ad314b3e35c960309553bc57750337)) — Thomas JEANNEAU
* **table:** should read a record from a GET request ([74812a3](https://github.com/latechforce/engine/commit/74812a3e3ee846752b75757f8346468cd6366d8c)) — Thomas JEANNEAU
* **table:** should update a record from a PATCH request ([4179ed6](https://github.com/latechforce/engine/commit/4179ed68335d029a3b2dc272844c60afeeb9d6b4)) — Thomas JEANNEAU
* **table:** should update multiple records from a PATCH request ([7836185](https://github.com/latechforce/engine/commit/78361852e792be50679d3d84839ba1eb8a4a0074)) — Thomas JEANNEAU

# [0.48.0](https://github.com/latechforce/engine/compare/v0.47.0...v0.48.0) (2025-05-26)

### Features

- should connect to calendly ([fbcae13](https://github.com/latechforce/engine/commit/fbcae13fa460deb960b664b902afd0d6312ff451)) — Thomas JEANNEAU
- should run a get http action ([5182921](https://github.com/latechforce/engine/commit/518292118f4fd38316bc61db83884ece0f8ad043)) — Thomas JEANNEAU
- should run a get http action with headers ([fefe944](https://github.com/latechforce/engine/commit/fefe9448d7a572ba7e16c0881bd9ac5e2fa3499d)) — Thomas JEANNEAU
- should run a post http action ([5701725](https://github.com/latechforce/engine/commit/5701725ccf883a2e421d648c8a21498aac06e579)) — Thomas JEANNEAU
- should run a post http action with body ([63c4f93](https://github.com/latechforce/engine/commit/63c4f93c8c5cd6c6542086426c647f9a383f9d0d)) — Thomas JEANNEAU
- should run a post http action with default env headers ([72e8708](https://github.com/latechforce/engine/commit/72e8708da6a5317a7adebd422699578b2c93440d)) — Thomas JEANNEAU
- should run a post http action with env headers ([95c3795](https://github.com/latechforce/engine/commit/95c3795bdeba1f94e49778808241f9b5ea3303f5)) — Thomas JEANNEAU
- should run a post http action with headers ([b5353dd](https://github.com/latechforce/engine/commit/b5353dd18d8d7528a15e54a951f059847855bf0e)) — Thomas JEANNEAU
- should trigger an automation when a calendly invite is created ([55420a3](https://github.com/latechforce/engine/commit/55420a3987596f79c39fe4fd936a3b41cea1ab83)) — Thomas JEANNEAU

# [0.47.0](https://github.com/latechforce/engine/compare/v0.46.6...v0.47.0) (2025-05-22)

### Features

- **package:** publish new architecture ([8866011](https://github.com/latechforce/engine/commit/8866011aa1b768cbfd36f7ba4a41ba8587b7bc03)) — Thomas JEANNEAU
