# Hawk Desktop

Cross-platform desktop app powered by Electron.

## How to start application

### Install dependencies

```
yarn
```

### Set up Garage

For the first run you need to do these steps separately.
For the other runs you will find a single command below.

Check the state of submodules and initialize them.

```
yarn garage:init
```

Pull the latest updates from master branch

```
yarn garage:update
```

Create a `.env` file for a Garage app.

Copy `hawk.garage/.env.example` file to `hawk.garage/.env` and fill required vars.

Install node deps and build.

```
yarn garage:build
```

Inject custom script to Garage's index.html file.

```
yarn garage:inject-script
```

Here you go.

Command `yarn garage` runs the following steps automatically:

- `yarn garage:init` — check the state of submodules and init them;
- `yarn garage:update` — pull the latest updates from master branch;
- `yarn garage:build` — install node deps and build;
- `yarn garage:inject-script` — inject custom script to Garage's index.html file from.

Use it when you already have actual `.env` file to update Garage.

### Run the app locally

```
yarn start
```

### Build a distro for the app if you need

```
yarn build
```
