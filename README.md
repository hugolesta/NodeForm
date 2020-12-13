# NodeForm

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3ad60a63738b42da90c82c5cbd8feb13)](https://app.codacy.com/gh/hugolesta/NodeForm?utm_source=github.com&utm_medium=referral&utm_content=hugolesta/NodeForm&utm_campaign=Badge_Grade)
[![CircleCI](https://circleci.com/gh/hugolesta/NodeForm.svg?style=svg&circle-token=7f8c34093c3f6216505ded4e3bdf73272f85405b)](https://circleci.com/gh/hugolesta/workflows/NodeForm)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hugolesta/NodeForm/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/hugolesta/NodeForm?style=plastic)](https://github.com/hugolesta/NodeForm/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) 
[![codecov](https://codecov.io/gh/hugolesta/NodeForm/branch/master/graph/badge.svg)](https://codecov.io/gh/hugolesta/NodeForm)
---
This project was created to help everybody who want to manage terraform easy, reliable way. 

This implementation will be developed using languages like Javascript and HCL. In this fist case we focus in  terraform for managing infrastructure in AWS (Amazon web services) but you shouln't have issues running this solution with another cloud providers like Google Cloud or Azure.

This project was fully tested in Linux and MacOS S.O, we don't know if it work properly in S.O like Windows.

# Requirements

- [Nodejs](https://nodejs.org/en/) should be installed
- [tfenv](https://github.com/tfutils/tfenv) should be installed, we have a task called `jake install-tfenv` check extra information below


# Usage

At the beginning of the usage, you should start running the following commands.

**Install jake.js**

```
$ sudo npm install -g jake
```

In this project, you should run the command below for installing the proyect dependencies.

```
$ npm install
```

You can list all tasks running the following command

```
$ jake -T
```
The following tasks listed below you shall run in this proyect at this moment.


| Name | Description |
|------|-------------|
| jake install-tfenv | Install tfenv in this S.O if isnt exists. |
| jake get | Create your environment folder and resolve terrafile. |
| jake init |  Use init after run the get task, this task will prepare all environment. |
| jake plan | Only use when you need to check terraform resources status. |
| jake apply | Only use when you need deploy terraform resources. |
| jake destroy | Only use when you need destroy terraform resources. |
| jake add-module | Add new modules in terrafile.json, you shall use it in your projects.  |
| jake manage-credentials | Manage your aws credentials, select some profile and use it.  |
| jake show-selected-credentials | Check what profile you have selected at this moment.  |


After install node dependencies, you should select Aws profiles using Jake as your main tool.

```
$ jake manage-credentials
```

Select the profile you want and press ENTER. This profile will be saves in a new file called `.env`, and a variable called `AWS_PROFILE` will be populated.

If you need to know an example of how to implement .env file you must to check `.env.example`.

```
$ jake show-selected-credentials
```

It will show you what profile you have selected at this moment, if none of them are selected, it'll give you some advice for reaching some profile.

After select some profile you should run the following command in order to check if you have `tfenv` installed in your S.O.

```
$ jake install-tfenv
```

This task will install `tfenv` in your S.O, after that, make sure to install some terraform version running the following command.

```
$ tfenv install 0.12.18
```
In this case, it'll install terraform version 0.12.18

```
$ tfenv use 0.12.18
```
It'll use terraform version 0.12.18 previously installed.

```
$ jake add-module
```
You should add some modules for allow use it.

This option will ask you some information like the following.

  +  Terraform module name
  +  Repo url, it allow https and ssh git links.
  +  Release version for the module previously added.

```
$ jake get
```
It'll create a new folder called dev with common files inside, it also create the terraform modules added in `terrafile.json` in a new folder called `modules`

```
$ jake init
```

It'll share common terraform files between different environment folders, after that, It'll init your project downloading all the terraform providers and plugins.

```
$ jake plan
```

It'll list all your terraform infrastructure changes.

```
$ jake apply
```
It'll deploy all your terraform infrastructure using the previous profile setted.

```
$ jake destroy
```

It'll destroy all your terraform infrastructure using the previous profile setted.

Contributors

[hugo_lesta]: https://avatars2.githubusercontent.com/u/6575715?s=400&u=f582c5ac8c63d2957e6b94842d4c533eb46100c1&v=4

[![hugo_lesta][hugo_lesta]][hugo_lesta]<br/>[Hugo Lesta][hugo_lesta]
