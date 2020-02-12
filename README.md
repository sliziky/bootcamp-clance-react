# Materials for bootcamp "ASP.NET Core / TypeScript / React - I."

| Folder     | Application        | Technology                            | Description                                            |
| ---------- | ------------------ | ------------------------------------- | ------------------------------------------------------ |
| choco      | Chocolatey skripty | [Chocolatey](https://chocolatey.org/) | Installation of development environment                |
| src/webapp | MovieDB UI         | React / TypeScript                    | **Front-end** SPA app for visualization/editing movies |
| src/webapi | MovieDB API        | ASP.NET Core 3                        | **Back-end** REST API for reading/storing movies       |

## MovieDB API

Go to folder _src/webapi_, open command prompt and type **dotnet run**.

...or

Open _src/webapi/Bootcamp.WebAPI.sln_ in Visual Studio and run app with Ctrl+F5.

## MovieDB UI

Go to folder _src/webapp_, open command prompt and type **yarn start**.

URL to webapi is configured in _src/webapp/src/api/constants.ts_.
