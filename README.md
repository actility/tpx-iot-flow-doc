To install vuepress:

```bash
sudo yarn global add vuepress
# Hack to make it work with current vuepress version
sudo mkdir -p /usr/local/share/.config/yarn/global/node_modules/vuepress/lib/app/.temp
sudo chmod 777 /usr/local/share/.config/yarn/global/node_modules/vuepress/lib/app/.temp
```

To build dependencies

```bash
yarn docs:build
```


To run server, into the project folder:

```bash
yarn docs:dev
```


You can see the website on the following link: http://localhost:8080
