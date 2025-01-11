Run with:
```
./build.sh -jJdemo
```

Then visit the ZAC micro-controller at either:
```
http://localhost:8080/foam3/src/foam/nanos/zac/index.html
```

In deployment/demo/journals/services.jrl it has the following services (among others):

```
p({
  "class": "foam.nanos.boot.NSpec",
  "name": "helloWorld",
  "authenticate": false,
  "lazyClient": false,
  "serve": true,
  "client":"""{"class":"foamdev.demo.zac.HelloWorld"}"""
})
```

Which causes the HelloWorld agent to be created which adds itself to the controller.

If you add this record:

```
p({
  "class":"foam.nanos.boot.NSpec",
  "name":"http",
  "service":{
    "class":"foam.nanos.jetty.HttpServer",
    "welcomeFiles":["foam3/src/foam/nanos/zac/index.html"]
  }
})
```

to a services.jrl file it will cause the ZAC index page
to be the default and the it will also appear at

```
http://localhost:8080/
```

