# ASP.NET Core / TypeScript / React - I.

Bootcamp materials.

| Folder     | Application        | Technology                            | Description                                            |
| ---------- | ------------------ | ------------------------------------- | ------------------------------------------------------ |
| choco      | Chocolatey skripts | [Chocolatey](https://chocolatey.org/) | Installation of development environment                |
| src/webapp | MovieDB UI         | React / TypeScript                    | **Front-end** SPA app for visualization/editing movies |
| src/webapi | MovieDB API        | ASP.NET Core 3                        | **Back-end** REST API for reading/storing movies       |

## Development environment (optional)

Run PowerShell and type

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

## MovieDB API

Go to folder _src/webapi_, open command prompt and type

```shell
dotnet run
```

...or

Open _src/webapi/Bootcamp.WebAPI.sln_ in Visual Studio and run app with Ctrl+F5.

## MovieDB UI

Go to folder _src/webapp_, open command prompt and type

```shell
nvm install 12.16.0

nvm use 12.16.0

yarn install

yarn start
```

URL to webapi is configured in _src/webapp/src/api/constants.ts_.
